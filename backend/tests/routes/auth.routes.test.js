const request = require('supertest');
const express = require('express');

const registerMock = jest.fn((req, res) => res.status(201).json({ ok: true }));
const loginMock = jest.fn((req, res) => res.json({ ok: true }));
const forgotPasswordMock = jest.fn((req, res) => res.json({ ok: true }));
const resetPasswordMock = jest.fn((req, res) => res.json({ ok: true }));
const getMeMock = jest.fn((req, res) => res.json({ ok: true }));

jest.mock('../../src/controllers/auth.controller', () => ({
  register: registerMock,
  login: loginMock,
  forgotPassword: forgotPasswordMock,
  resetPassword: resetPasswordMock,
  getMe: getMeMock,
}));

jest.mock('../../src/middleware/authenticate', () => (req, res, next) => {
  req.user = { userId: 'user1', role: 'student' };
  next();
});

const authRoutes = require('../../src/routes/auth.routes');

describe('auth.routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/auth', authRoutes);

  it('routes register requests', async () => {
    await request(app).post('/auth/register').send({ email: 'test@example.com' }).expect(201);
    expect(registerMock).toHaveBeenCalled();
  });

  it('routes login requests', async () => {
    await request(app).post('/auth/login').send({ email: 'test@example.com' }).expect(200);
    expect(loginMock).toHaveBeenCalled();
  });

  it('routes forgot password requests', async () => {
    await request(app).post('/auth/forgot-password').send({ email: 'test@example.com' }).expect(200);
    expect(forgotPasswordMock).toHaveBeenCalled();
  });

  it('routes reset password requests', async () => {
    await request(app).post('/auth/reset-password').send({ token: 'tok' }).expect(200);
    expect(resetPasswordMock).toHaveBeenCalled();
  });

  it('routes authenticated get /me requests', async () => {
    await request(app).get('/auth/me').set('Authorization', 'Bearer token').expect(200);
    expect(getMeMock).toHaveBeenCalled();
  });
});
