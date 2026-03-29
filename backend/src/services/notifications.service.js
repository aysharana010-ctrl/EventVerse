const pool = require('../db/pool');
const AppError = require('../utils/AppError');

const getNotifications = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, message, is_read, created_at
     FROM notifications
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
};

const markRead = async (notifId, userId) => {
  const { rows } = await pool.query(
    'SELECT id FROM notifications WHERE id = $1 AND user_id = $2',
    [notifId, userId]
  );

  if (rows.length === 0) {
    throw new AppError('Notification not found', 404);
  }

  const { rows: updated } = await pool.query(
    `UPDATE notifications SET is_read = TRUE
     WHERE id = $1
     RETURNING id, message, is_read, created_at`,
    [notifId]
  );

  return updated[0];
};

const markAllRead = async (userId) => {
  await pool.query(
    'UPDATE notifications SET is_read = TRUE WHERE user_id = $1',
    [userId]
  );
};

const insertNotification = async (userId, message, client = pool) => {
  await client.query(
    'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
    [userId, message]
  );
};

module.exports = { getNotifications, markRead, markAllRead, insertNotification };