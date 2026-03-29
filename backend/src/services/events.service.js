const pool = require('../db/pool');
const AppError = require('../utils/AppError');
const uploadFile = require('../utils/uploadFile');
const { insertNotification } = require('./notifications.service');

// Returns the club owned by the given club head, throws if none
const getOwnedClub = async (userId, client = pool) => {
  const { rows } = await client.query(
    'SELECT id FROM clubs WHERE club_head_id = $1',
    [userId]
  );
  if (rows.length === 0) {
    throw new AppError('You do not own a club', 403);
  }
  return rows[0];
};

// Verifies an event belongs to the club head's club
const assertEventOwnership = async (eventId, userId, client = pool) => {
  const club = await getOwnedClub(userId, client);
  const { rows } = await client.query(
    'SELECT id FROM events WHERE id = $1 AND club_id = $2',
    [eventId, club.id]
  );
  if (rows.length === 0) {
    throw new AppError('Event not found or you do not own this event', 404);
  }
  return club;
};

const listEvents = async ({ club, date, page = 1, limit = 20 }) => {
  const conditions = ['e.starts_at > NOW()'];
  const values = [];

  if (club) {
    values.push(club);
    conditions.push(`e.club_id = $${values.length}`);
  }

  if (date) {
    values.push(date);
    conditions.push(`DATE(e.starts_at) = $${values.length}::date`);
  }

  const where = conditions.join(' AND ');
  const offset = (parseInt(page) - 1) * parseInt(limit);
  values.push(parseInt(limit));
  values.push(offset);

  const { rows } = await pool.query(
    `SELECT
       e.id,
       e.name,
       e.description,
       e.venue,
       e.starts_at,
       e.max_participants,
       e.organiser_name,
       e.created_at,
       c.name AS club_name
     FROM events e
     LEFT JOIN clubs c ON c.id = e.club_id
     WHERE ${where}
     ORDER BY e.starts_at ASC
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );

  // Total count for pagination metadata
  const countValues = values.slice(0, -2);
  const { rows: countRows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM events e WHERE ${where}`,
    countValues
  );

  return { events: rows, total: countRows[0].total, page: parseInt(page), limit: parseInt(limit) };
};

const getEvent = async (eventId) => {
  const { rows } = await pool.query(
    `SELECT
       e.id,
       e.name,
       e.description,
       e.venue,
       e.starts_at,
       e.max_participants,
       e.organiser_name,
       e.created_at,
       c.name AS club_name,
       COUNT(er.id)::int AS registered_count
     FROM events e
     LEFT JOIN clubs c ON c.id = e.club_id
     LEFT JOIN event_registrations er ON er.event_id = e.id
     WHERE e.id = $1
     GROUP BY e.id, c.name`,
    [eventId]
  );

  if (rows.length === 0) {
    throw new AppError('Event not found', 404);
  }

  return rows[0];
};

const createEvent = async (userId, data) => {
  const club = await getOwnedClub(userId);
  const { name, description, venue, starts_at, max_participants, organiser_name } = data;

  const { rows } = await pool.query(
    `INSERT INTO events (name, description, venue, starts_at, max_participants, organiser_name, club_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, description ?? null, venue ?? null, starts_at, max_participants ?? null, organiser_name ?? null, club.id]
  );

  return rows[0];
};

const updateEvent = async (eventId, userId, data) => {
  await assertEventOwnership(eventId, userId);

  const ALLOWED = ['name', 'description', 'venue', 'starts_at', 'max_participants', 'organiser_name'];
  const fields = Object.keys(data).filter((k) => ALLOWED.includes(k));

  if (fields.length === 0) {
    throw new AppError('No valid fields provided for update', 400);
  }

  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  const values = fields.map((f) => data[f]);
  values.push(eventId);

  const { rows } = await pool.query(
    `UPDATE events SET ${setClauses}
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return rows[0];
};

const deleteEvent = async (eventId, userId) => {
  await assertEventOwnership(eventId, userId);
  await pool.query('DELETE FROM events WHERE id = $1', [eventId]);
};

const registerForEvent = async (userId, eventId) => {
  const { rows: eventRows } = await pool.query(
    'SELECT id, max_participants FROM events WHERE id = $1',
    [eventId]
  );

  if (eventRows.length === 0) {
    throw new AppError('Event not found', 404);
  }

  const event = eventRows[0];

  if (event.max_participants !== null) {
    const { rows: countRows } = await pool.query(
      'SELECT COUNT(*)::int AS cnt FROM event_registrations WHERE event_id = $1',
      [eventId]
    );
    if (countRows[0].cnt >= event.max_participants) {
      throw new AppError('Event is at full capacity', 400);
    }
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO event_registrations (user_id, event_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, eventId]
    );
    return rows[0];
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError('Already registered for this event', 409);
    }
    throw err;
  }
};

const unregisterFromEvent = async (userId, eventId) => {
  const { rowCount } = await pool.query(
    'DELETE FROM event_registrations WHERE user_id = $1 AND event_id = $2',
    [userId, eventId]
  );

  if (rowCount === 0) {
    throw new AppError('Registration not found', 404);
  }
};

const getRegistrations = async (eventId, userId) => {
  await assertEventOwnership(eventId, userId);

  const { rows } = await pool.query(
    `SELECT
       u.id AS user_id,
       u.name,
       u.email,
       er.attended,
       er.registered_at
     FROM event_registrations er
     JOIN users u ON u.id = er.user_id
     WHERE er.event_id = $1
     ORDER BY er.registered_at`,
    [eventId]
  );

  return rows;
};

const updateAttendance = async (eventId, userId, attendees) => {
  if (!Array.isArray(attendees) || attendees.length === 0) {
    throw new AppError('attendees must be a non-empty array', 400);
  }

  await assertEventOwnership(eventId, userId);

  const studentIds = attendees.map((a) => a.studentId);
  const attendedFlags = attendees.map((a) => Boolean(a.attended));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `UPDATE event_registrations er
       SET attended = updates.attended
       FROM (
         SELECT UNNEST($1::uuid[]) AS student_id,
                UNNEST($2::boolean[]) AS attended
       ) AS updates
       WHERE er.event_id = $3
         AND er.user_id = updates.student_id`,
      [studentIds, attendedFlags, eventId]
    );

    // Fetch event name for notification message
    const { rows: eventRows } = await client.query(
      'SELECT name FROM events WHERE id = $1',
      [eventId]
    );
    const eventName = eventRows[0]?.name ?? 'an event';

    // Insert notifications for students marked attended = true
    const markedAttended = attendees.filter((a) => a.attended === true);
    for (const { studentId } of markedAttended) {
      await insertNotification(
        studentId,
        `Your attendance for "${eventName}" has been recorded.`,
        client
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const getAttendance = async (eventId, userId) => {
  await assertEventOwnership(eventId, userId);

  const { rows } = await pool.query(
    `SELECT
       u.id AS user_id,
       u.name,
       u.email,
       er.attended,
       er.registered_at
     FROM event_registrations er
     JOIN users u ON u.id = er.user_id
     WHERE er.event_id = $1
     ORDER BY u.name`,
    [eventId]
  );

  return rows;
};

const uploadCertificate = async (eventId, studentId, userId, file) => {
  const club = await assertEventOwnership(eventId, userId);

  const { rows: studentRows } = await pool.query(
    'SELECT id, name FROM users WHERE id = $1',
    [studentId]
  );
  if (studentRows.length === 0) {
    throw new AppError('Student not found', 404);
  }

  const { rows: eventRows } = await pool.query(
    'SELECT name, club_id FROM events WHERE id = $1',
    [eventId]
  );
  const eventName = eventRows[0]?.name ?? 'event';
  const clubId = eventRows[0]?.club_id ?? null;

  const fileUrl = await uploadFile(file.buffer, file.mimetype);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `INSERT INTO certificates (title, file_url, user_id, event_id, club_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [`Certificate of Participation – ${eventName}`, fileUrl, studentId, eventId, clubId]
    );

    await insertNotification(
      studentId,
      `Your certificate for "${eventName}" is now available.`,
      client
    );

    await client.query('COMMIT');
    return rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const getEventCertificates = async (eventId, userId) => {
  await assertEventOwnership(eventId, userId);

  const { rows } = await pool.query(
    `SELECT
       cert.id,
       cert.title,
       cert.file_url,
       cert.issue_date,
       cert.created_at,
       u.id AS user_id,
       u.name AS student_name,
       u.email AS student_email
     FROM certificates cert
     JOIN users u ON u.id = cert.user_id
     WHERE cert.event_id = $1
     ORDER BY cert.created_at`,
    [eventId]
  );

  return rows;
};

module.exports = {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getRegistrations,
  updateAttendance,
  getAttendance,
  uploadCertificate,
  getEventCertificates,
};