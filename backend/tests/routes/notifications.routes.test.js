const request = require('supertest');
const express = require('express');

const notificationsController = {
  getNotifications: jest.fn((req, res) => res.json({ ok: true })),
  markRead: jest.fn((req, res) => res.json({ ok: true })),
  markAllRead: jest.fn((req, res) => res.json({ ok: true })),
};

jest.mock('../../src/controllers/notifications.controller', () => notificationsController);
jest.mock('../../src/middleware/authenticate', () => (req, res, next) => {
  req.user = { userId: 'user1', role: 'student' };
  next();
});

const notificationsRoutes = require('../../src/routes/notifications.routes');

describe('notifications.routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/notifications', notificationsRoutes);

  it('routes notification read and list endpoints', async () => {
    await request(app).get('/notifications').expect(200);
    await request(app).put('/notifications/1/read').expect(200);
    await request(app).put('/notifications/read-all').expect(200);

    expect(notificationsController.getNotifications).toHaveBeenCalled();
    expect(notificationsController.markRead).toHaveBeenCalled();
    expect(notificationsController.markAllRead).toHaveBeenCalled();
  });
});
