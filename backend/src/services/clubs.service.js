const pool = require('../db/pool');
const AppError = require('../utils/AppError');

const listClubs = async () => {
  const { rows } = await pool.query(
    `SELECT
       c.id,
       c.name,
       c.description,
       c.logo_url,
       c.max_participants,
       c.created_at,
       u.name AS club_head_name,
       COUNT(cm.id)::int AS member_count
     FROM clubs c
     LEFT JOIN users u ON u.id = c.club_head_id
     LEFT JOIN club_memberships cm ON cm.club_id = c.id
     GROUP BY c.id, u.name
     ORDER BY c.name`
  );
  return rows;
};

const getClub = async (clubId) => {
  const { rows: clubRows } = await pool.query(
    `SELECT
       c.id,
       c.name,
       c.description,
       c.logo_url,
       c.max_participants,
       c.created_at,
       u.name AS club_head_name
     FROM clubs c
     LEFT JOIN users u ON u.id = c.club_head_id
     WHERE c.id = $1`,
    [clubId]
  );

  if (clubRows.length === 0) {
    throw new AppError('Club not found', 404);
  }

  const { rows: members } = await pool.query(
    `SELECT u.id AS user_id, u.name, u.department, cm.joined_at
     FROM club_memberships cm
     JOIN users u ON u.id = cm.user_id
     WHERE cm.club_id = $1
     ORDER BY cm.joined_at`,
    [clubId]
  );

  const { rows: events } = await pool.query(
    `SELECT id, name, description, venue, starts_at, max_participants, organiser_name
     FROM events
     WHERE club_id = $1 AND starts_at > NOW()
     ORDER BY starts_at`,
    [clubId]
  );

  return { ...clubRows[0], members, upcoming_events: events };
};

const joinClub = async (userId, clubId) => {
  const { rows: clubRows } = await pool.query(
    'SELECT id FROM clubs WHERE id = $1',
    [clubId]
  );
  if (clubRows.length === 0) {
    throw new AppError('Club not found', 404);
  }

  try {
    await pool.query(
      'INSERT INTO club_memberships (user_id, club_id) VALUES ($1, $2)',
      [userId, clubId]
    );
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError('Already a member of this club', 409);
    }
    throw err;
  }
};

const leaveClub = async (userId, clubId) => {
  const { rowCount } = await pool.query(
    'DELETE FROM club_memberships WHERE user_id = $1 AND club_id = $2',
    [userId, clubId]
  );

  if (rowCount === 0) {
    throw new AppError('Membership not found', 404);
  }
};

const getClubEvents = async (clubId) => {
  const { rows: clubRows } = await pool.query(
    'SELECT id FROM clubs WHERE id = $1',
    [clubId]
  );
  if (clubRows.length === 0) {
    throw new AppError('Club not found', 404);
  }

  const { rows } = await pool.query(
    `SELECT id, name, description, venue, starts_at, max_participants, organiser_name, created_at
     FROM events
     WHERE club_id = $1
     ORDER BY starts_at`,
    [clubId]
  );

  return rows;
};

module.exports = { listClubs, getClub, joinClub, leaveClub, getClubEvents };