jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

const pool = require('../../src/db/pool');
const studentsService = require('../../src/services/students.service');
const AppError = require('../../src/utils/AppError');

describe('students.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a student profile when found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'student1', name: 'Student One' }] });

    const profile = await studentsService.getProfile('student1');

    expect(profile).toEqual({ id: 'student1', name: 'Student One' });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it('throws when profile is missing', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(studentsService.getProfile('missing')).rejects.toThrow(AppError);
    await expect(studentsService.getProfile('missing')).rejects.toMatchObject({ statusCode: 404 });
  });
});
