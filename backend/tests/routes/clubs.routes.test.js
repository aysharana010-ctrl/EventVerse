const request = require('supertest');
const express = require('express');

const clubsController = {
  listClubs: jest.fn((req, res) => res.json({ ok: true })),
  getClub: jest.fn((req, res) => res.json({ ok: true })),
  joinClub: jest.fn((req, res) => res.status(201).json({ ok: true })),
  leaveClub: jest.fn((req, res) => res.json({ ok: true })),
  getClubEvents: jest.fn((req, res) => res.json({ ok: true })),
};

jest.mock('../../src/controllers/clubs.controller', () => clubsController);
jest.mock('../../src/middleware/authenticate', () => (req, res, next) => {
  req.user = { userId: 'user1', role: 'club_head' };
  next();
});

const clubsRoutes = require('../../src/routes/clubs.routes');

describe('clubs.routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/clubs', clubsRoutes);

  it('routes club list and detail paths', async () => {
    await request(app).get('/clubs').expect(200);
    await request(app).get('/clubs/1').expect(200);
    expect(clubsController.listClubs).toHaveBeenCalled();
    expect(clubsController.getClub).toHaveBeenCalled();
  });

  it('routes club membership and event listing paths', async () => {
    await request(app).post('/clubs/1/join').expect(201);
    await request(app).delete('/clubs/1/leave').expect(200);
    await request(app).get('/clubs/1/events').expect(200);
    expect(clubsController.joinClub).toHaveBeenCalled();
    expect(clubsController.leaveClub).toHaveBeenCalled();
    expect(clubsController.getClubEvents).toHaveBeenCalled();
  });
});
