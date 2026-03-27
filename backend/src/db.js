const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'yourpassword',
  database: process.env.POSTGRES_DB || 'event_verse',
});

async function connectDB() {
  const client = await pool.connect();
  console.log('Connected to Eventverse PostgreSQL database....');
  client.release();
}

async function disconnectDB() {
  await pool.end();
  console.log('PostgreSQL connection closed...');
}

module.exports = { pool, connectDB, disconnectDB };
