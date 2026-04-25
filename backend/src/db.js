const { Pool } = require('pg');

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.POSTGRES_DB}`;

const pool = new Pool({
  connectionString
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
