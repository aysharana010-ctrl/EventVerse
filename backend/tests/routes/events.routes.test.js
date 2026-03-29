const request = require('supertest');
const express = require('express');

const eventsController = {
  listEvents: jest.fn((req, res) => res.json({ ok: true })),
  getEvent: jest.fn((req, res) => res.json({ ok: true })),
  createEvent: jest.fn((req, res) => res.status(201).json({ ok: true })),
  updateEvent: jest.fn((req, res) => res.json({ ok: true })),
  deleteEvent: jest.fn((req, res) => res.json({ ok: true })),
  registerForEvent: jest.fn((req, res) => res.status(201).json({ ok: true })),
  unregisterFromEvent: jest.fn((req, res) => res.json({ ok: true })),
  getRegistrations: jest.fn((req, res) => res.json({ ok: true })),
  updateAttendance: jest.fn((req, res) => res.json({ ok: true })),
  getAttendance: jest.fn((req, res) => res.json({ ok: true })),
  uploadCertificate: jest.fn((req, res) => res.status(201).json({ ok: true })),
  getEventCertificates: jest.fn((req, res) => res.json({ ok: true })),
};

jest.mock('../../src/controllers/events.controller', () => eventsController);
jest.mock('../../src/middleware/authenticate', () => (req, res, next) => {
  req.user = { userId: 'user1', role: 'club_head' };
  next();
});
jest.mock('../../src/middleware/requireRole', () => jest.fn(() => (req, res, next) => next()));

const eventsRoutes = require('../../src/routes/events.routes');

describe('events.routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/events', eventsRoutes);

  it('routes list and get event paths', async () => {
    await request(app).get('/events').expect(200);
    await request(app).get('/events/1').expect(200);
    expect(eventsController.listEvents).toHaveBeenCalled();
    expect(eventsController.getEvent).toHaveBeenCalled();
  });

  it('routes event CRUD and registration paths', async () => {
    await request(app).post('/events').send({}).expect(201);
    await request(app).put('/events/1').send({}).expect(200);
    await request(app).delete('/events/1').expect(200);
    await request(app).post('/events/1/register').send({}).expect(201);
    await request(app).delete('/events/1/register').expect(200);
    await request(app).get('/events/1/registrations').expect(200);
    await request(app).put('/events/1/attendance').send({ attendees: [] }).expect(200);
    await request(app).get('/events/1/attendance').expect(200);
    await request(app).get('/events/1/certificates').expect(200);
  });
});
