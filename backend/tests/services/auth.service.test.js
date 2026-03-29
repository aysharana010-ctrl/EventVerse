process.env.JWT_SECRET = 'test-secret';

jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(async () => 'hashed-password'),
  compare: jest.fn(async (value, hash) => value === 'password' && hash === 'hashed-password'),
}));

const pool = require('../../src/db/pool');
const authService = require('../../src/services/auth.service');
const AppError = require('../../src/utils/AppError');

describe('auth.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers a new user and returns token + user', async () => {
    pool.query
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      .mockResolvedValueOnce({ rows: [{ id: '1', name: 'Test User', email: 'test@example.com', role: 'student' }] });

    const result = await authService.register({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      department: 'CS',
      year: '2025',
      phone: '1234567890',
    });

    expect(result).toHaveProperty('token');
    expect(result.user).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it('throws when login email does not exist', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(authService.login({ email: 'missing@example.com', password: 'password' }))
      .rejects.toMatchObject({ statusCode: 401 });
  });
});
