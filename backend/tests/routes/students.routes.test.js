const request = require('supertest');
const express = require('express');

const studentsController = {
  getProfile: jest.fn((req, res) => res.json({ ok: true })),
  updateProfile: jest.fn((req, res) => res.json({ ok: true })),
  getStudentEvents: jest.fn((req, res) => res.json({ ok: true })),
  getStudentClubs: jest.fn((req, res) => res.json({ ok: true })),
  getStudentCertificates: jest.fn((req, res) => res.json({ ok: true })),
};

jest.mock('../../src/controllers/students.controller', () => studentsController);
jest.mock('../../src/middleware/authenticate', () => (req, res, next) => {
  req.user = { userId: 'user1', role: 'student' };
  next();
});

const studentsRoutes = require('../../src/routes/students.routes');

describe('students.routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/students', studentsRoutes);

  it('routes student profile and list endpoints', async () => {
    await request(app).get('/students/1/profile').expect(200);
    await request(app).put('/students/1/profile').send({ name: 'Updated' }).expect(200);
    await request(app).get('/students/1/events').expect(200);
    await request(app).get('/students/1/clubs').expect(200);
    await request(app).get('/students/1/certificates').expect(200);

    expect(studentsController.getProfile).toHaveBeenCalled();
    expect(studentsController.updateProfile).toHaveBeenCalled();
    expect(studentsController.getStudentEvents).toHaveBeenCalled();
    expect(studentsController.getStudentClubs).toHaveBeenCalled();
    expect(studentsController.getStudentCertificates).toHaveBeenCalled();
  });
});
