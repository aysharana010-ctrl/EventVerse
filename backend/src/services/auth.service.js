const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 12;

const signToken = (userId, role) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const register = async ({ name, email, password, department, year, phone }) => {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rowCount > 0) {
    throw new AppError('Email already registered', 409);
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password, role, department, year, phone)
     VALUES ($1, $2, $3, 'student', $4, $5, $6)
     RETURNING id, name, email, role`,
    [name, email, hashed, department ?? null, year ?? null, phone ?? null]
  );

  const user = rows[0];
  const token = signToken(user.id, user.role);
  return { token, user };
};

const login = async ({ email, password }) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, password FROM users WHERE email = $1',
    [email]
  );

  if (rows.length === 0) {
    throw new AppError('Invalid email or password', 401);
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken(user.id, user.role);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

const forgotPassword = async ({ email }) => {
  const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (rows.length === 0) {
    // Return silently to prevent email enumeration
    return;
  }

  const userId = rows[0].id;
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await pool.query(
    `INSERT INTO password_reset_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );

  console.log(`[PASSWORD RESET] Token for ${email}: ${token}`);
};

const resetPassword = async ({ token, newPassword }) => {
  const { rows } = await pool.query(
    `SELECT id, user_id FROM password_reset_tokens
     WHERE token = $1 AND used = FALSE AND expires_at > NOW()`,
    [token]
  );

  if (rows.length === 0) {
    throw new AppError('Reset token is invalid or has expired', 400);
  }

  const { id: tokenId, user_id: userId } = rows[0];
  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userId]);
    await client.query(
      'UPDATE password_reset_tokens SET used = TRUE WHERE id = $1',
      [tokenId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const getMe = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, name, email, role, department, year, phone, profile_photo, created_at
     FROM users WHERE id = $1`,
    [userId]
  );

  if (rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return rows[0];
};

module.exports = { register, login, forgotPassword, resetPassword, getMe };