jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

const pool = require('../../src/db/pool');
const clubsService = require('../../src/services/clubs.service');
const AppError = require('../../src/utils/AppError');

describe('clubs.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns club list', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'club1', name: 'Event Club' }] });

    const result = await clubsService.listClubs();

    expect(result).toEqual([{ id: 'club1', name: 'Event Club' }]);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it('throws if getClub cannot find a club', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(clubsService.getClub('missing')).rejects.toThrow(AppError);
    await expect(clubsService.getClub('missing')).rejects.toMatchObject({ statusCode: 404 });
  });
});
