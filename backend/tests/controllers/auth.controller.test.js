const { createMockReq, createMockRes } = require('../testUtils');

jest.mock('../../src/services/auth.service', () => ({
  register: jest.fn(),
  login: jest.fn(),
  forgotPassword: jest.fn(),
  resetPassword: jest.fn(),
  getMe: jest.fn(),
}));

const authService = require('../../src/services/auth.service');
const authController = require('../../src/controllers/auth.controller');

describe('auth.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers a user and returns 201', async () => {
    const req = createMockReq({ body: { email: 'test@example.com' } });
    const res = createMockRes();
    authService.register.mockResolvedValueOnce({ token: 'abc', user: { id: '1' } });

    await authController.register(req, res);

    expect(authService.register).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ token: 'abc', user: { id: '1' } });
  });

  it('logs in a user and returns json', async () => {
    const req = createMockReq({ body: { email: 'test@example.com', password: 'password' } });
    const res = createMockRes();
    authService.login.mockResolvedValueOnce({ token: 'abc', user: { id: '1' } });

    await authController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ token: 'abc', user: { id: '1' } });
  });

  it('returns forgot password confirmation message', async () => {
    const req = createMockReq({ body: { email: 'test@example.com' } });
    const res = createMockRes();
    authService.forgotPassword.mockResolvedValueOnce();

    await authController.forgotPassword(req, res);

    expect(authService.forgotPassword).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ message: 'If an account with that email exists, a reset token has been logged.' });
  });

  it('resets password and returns confirmation message', async () => {
    const req = createMockReq({ body: { token: 'tok', newPassword: 'newpass' } });
    const res = createMockRes();
    authService.resetPassword.mockResolvedValueOnce();

    await authController.resetPassword(req, res);

    expect(authService.resetPassword).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ message: 'Password reset successfully.' });
  });

  it('returns current user data', async () => {
    const req = createMockReq({ user: { userId: '1' } });
    const res = createMockRes();
    authService.getMe.mockResolvedValueOnce({ id: '1' });

    await authController.getMe(req, res);

    expect(authService.getMe).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ id: '1' });
  });
});
