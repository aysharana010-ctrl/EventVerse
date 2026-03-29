const { pool } = require('../db');

async function createUser({ name, email, role, department, year, phone, password }) {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, role, department, year, phone, password)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, name, email, role, department, year, phone`,
    [name, email, role, department ?? null, year ?? null, phone ?? null, password]
  );
  return rows[0];
}

async function updateUser(id, password) {
  const { rows } = await pool.query(
    `UPDATE users SET password = $1 WHERE id = $2
     RETURNING id, name, email, role, department, year, phone`,
    [password, id]
  );
  return rows[0] ?? null;
}

module.exports = { createUser, updateUser };
