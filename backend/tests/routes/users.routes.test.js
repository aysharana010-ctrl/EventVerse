const request = require('supertest');
const express = require('express');

const userController = {
  createUser: jest.fn((req, res) => res.status(201).json({ ok: true })),
  updateUser: jest.fn((req, res) => res.json({ ok: true })),
};

jest.mock('../../src/controllers/user.controller', () => userController);
jest.mock('../../src/middleware/authenticate', () => (req, res, next) => {
  req.user = { userId: 'user1', role: 'student' };
  next();
});

const usersRoutes = require('../../src/routes/users.routes');

describe('users.routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/users', usersRoutes);

  it('routes user creation and update paths', async () => {
    await request(app).post('/users').send({ name: 'Test', email: 'test@example.com', role: 'student', password: 'pass' }).expect(201);
    await request(app).put('/users/1').send({ password: 'newpass' }).expect(200);

    expect(userController.createUser).toHaveBeenCalled();
    expect(userController.updateUser).toHaveBeenCalled();
  });
});
