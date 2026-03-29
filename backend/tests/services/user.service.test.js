jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

const pool = require('../../src/db/pool');
const userService = require('../../src/services/user.service');

describe('user.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new user record', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'user1', name: 'Test' }] });

    const result = await userService.createUser({
      name: 'Test',
      email: 'test@example.com',
      role: 'student',
      department: 'CS',
      year: '2026',
      phone: '123',
      password: 'password',
    });

    expect(result).toEqual({ id: 'user1', name: 'Test' });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it('returns null when updateUser does not find the target', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await userService.updateUser('missing', 'password');

    expect(result).toBeNull();
  });
});
