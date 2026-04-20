require('dotenv').config();
const express = require('express');
const AppError = require('./utils/AppError');

const authRoutes = require('./routes/auth.routes');
const eventsRoutes = require('./routes/events.routes');
const clubsRoutes = require('./routes/clubs.routes');
const studentsRoutes = require('./routes/students.routes');
const notificationsRoutes = require('./routes/notifications.routes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);
app.use('/clubs', clubsRoutes);
app.use('/students', studentsRoutes);
app.use('/notifications', notificationsRoutes);

// 404 handler for unmatched routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.path} not found`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server error';

  if (!err.statusCode) {
    console.error('[Unhandled Error]', err);
  }

  res.status(statusCode).json({ error: message });
});

module.exports = app;