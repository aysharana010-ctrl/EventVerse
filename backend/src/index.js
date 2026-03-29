require('dotenv').config();
const app = require('./app');
const pool = require('./db/pool');

const PORT = process.env.PORT || 3000;

async function start() {
  // Verify DB connectivity before accepting traffic
  await pool.query('SELECT 1');
  console.log('PostgreSQL connected');

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return server;
}

async function shutdown(server) {
  console.log('Shutting down...');
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
  await pool.end();
  process.exit(0);
}

start()
  .then((server) => {
    process.on('SIGTERM', () => shutdown(server));
    process.on('SIGINT', () => shutdown(server));
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
