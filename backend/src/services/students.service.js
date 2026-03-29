const pool = require('../db/pool');
const AppError = require('../utils/AppError');

const getProfile = async (studentId) => {
  const { rows } = await pool.query(
    `SELECT id, name, email, department, year, phone, profile_photo
     FROM users
     WHERE id = $1`,
    [studentId]
  );

  if (rows.length === 0) {
    throw new AppError('Student not found', 404);
  }

  return rows[0];
};

const updateProfile = async (studentId, requestingUserId, data) => {
  if (studentId !== requestingUserId) {
    throw new AppError('Forbidden: you can only update your own profile', 403);
  }

  const ALLOWED = ['name', 'department', 'phone', 'profile_photo'];
  const fields = Object.keys(data).filter((k) => ALLOWED.includes(k));

  if (fields.length === 0) {
    throw new AppError('No valid fields provided for update', 400);
  }

  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  const values = fields.map((f) => data[f]);
  values.push(studentId);

  const { rows } = await pool.query(
    `UPDATE users SET ${setClauses}
     WHERE id = $${values.length}
     RETURNING id, name, email, department, year, phone, profile_photo`,
    values
  );

  return rows[0];
};

const getStudentEvents = async (studentId) => {
  const { rows: userRows } = await pool.query('SELECT id FROM users WHERE id = $1', [studentId]);
  if (userRows.length === 0) {
    throw new AppError('Student not found', 404);
  }

  const { rows } = await pool.query(
    `SELECT
       e.id,
       e.name,
       e.description,
       e.venue,
       e.starts_at,
       e.organiser_name,
       c.name AS club_name,
       er.attended,
       er.registered_at
     FROM event_registrations er
     JOIN events e ON e.id = er.event_id
     LEFT JOIN clubs c ON c.id = e.club_id
     WHERE er.user_id = $1
     ORDER BY e.starts_at DESC`,
    [studentId]
  );

  return rows;
};

const getStudentClubs = async (studentId) => {
  const { rows: userRows } = await pool.query('SELECT id FROM users WHERE id = $1', [studentId]);
  if (userRows.length === 0) {
    throw new AppError('Student not found', 404);
  }

  const { rows } = await pool.query(
    `SELECT
       c.id,
       c.name,
       c.description,
       c.logo_url,
       cm.joined_at
     FROM club_memberships cm
     JOIN clubs c ON c.id = cm.club_id
     WHERE cm.user_id = $1
     ORDER BY cm.joined_at DESC`,
    [studentId]
  );

  return rows;
};

const getStudentCertificates = async (studentId, requestingUser) => {
  if (requestingUser.role === 'student' && requestingUser.userId !== studentId) {
    throw new AppError('Forbidden: you can only view your own certificates', 403);
  }

  const { rows: userRows } = await pool.query('SELECT id FROM users WHERE id = $1', [studentId]);
  if (userRows.length === 0) {
    throw new AppError('Student not found', 404);
  }

  const { rows } = await pool.query(
    `SELECT
       cert.id,
       cert.title,
       cert.file_url,
       cert.issue_date,
       cert.created_at,
       e.name AS event_name,
       c.name AS club_name
     FROM certificates cert
     LEFT JOIN events e ON e.id = cert.event_id
     LEFT JOIN clubs c ON c.id = cert.club_id
     WHERE cert.user_id = $1
     ORDER BY cert.issue_date DESC`,
    [studentId]
  );

  return rows;
};

module.exports = { getProfile, updateProfile, getStudentEvents, getStudentClubs, getStudentCertificates };