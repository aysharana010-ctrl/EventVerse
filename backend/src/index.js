const express = require('express');
const { connectDB, disconnectDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Eventverse backend application up and running!!!...' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

async function start() {
  await connectDB();
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
  await disconnectDB();
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
