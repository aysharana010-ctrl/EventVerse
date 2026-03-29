const { createMockReq, createMockRes } = require('../testUtils');

jest.mock('../../src/services/user.service', () => ({
  createUser: jest.fn(),
  updateUser: jest.fn(),
}));

const userController = require('../../src/controllers/user.controller');
const userService = require('../../src/services/user.service');

describe('user.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new user and returns success', async () => {
    const req = createMockReq({ body: { name: 'Test', email: 'test@example.com', role: 'student', password: 'pass' } });
    const res = createMockRes();
    userService.createUser.mockResolvedValueOnce({ id: 'user1' });

    await userController.createUser(req, res);

    expect(userService.createUser).toHaveBeenCalledWith({
      name: 'Test',
      email: 'test@example.com',
      role: 'student',
      department: undefined,
      year: undefined,
      phone: undefined,
      password: 'pass',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith('User created successfully');
  });

  it('returns 400 when password is missing on update', async () => {
    const req = createMockReq({ params: { id: 'user1' }, body: {} });
    const res = createMockRes();

    await userController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'password is required' });
  });
});
