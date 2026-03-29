jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

const pool = require('../../src/db/pool');
const eventsService = require('../../src/services/events.service');
const AppError = require('../../src/utils/AppError');

describe('events.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns paginated event list and count', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 'e1', name: 'Demo Event' }] })
      .mockResolvedValueOnce({ rows: [{ total: 1 }] });

    const result = await eventsService.listEvents({ club: 'club1', date: '2026-01-01', page: '1', limit: '10' });

    expect(result).toEqual({
      events: [{ id: 'e1', name: 'Demo Event' }],
      total: 1,
      page: 1,
      limit: 10,
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it('throws if getEvent cannot find an event', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(eventsService.getEvent('missing')).rejects.toThrow(AppError);
    await expect(eventsService.getEvent('missing')).rejects.toMatchObject({ statusCode: 404 });
  });
});
