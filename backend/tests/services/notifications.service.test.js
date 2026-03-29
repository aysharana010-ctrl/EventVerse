jest.mock('../../src/db/pool', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

const pool = require('../../src/db/pool');
const notificationsService = require('../../src/services/notifications.service');
const AppError = require('../../src/utils/AppError');

describe('notifications.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns notifications for a user', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'n1', message: 'Hello' }] });

    const notifications = await notificationsService.getNotifications('user1');

    expect(notifications).toEqual([{ id: 'n1', message: 'Hello' }]);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT id, message, is_read, created_at'),
      ['user1']
    );
  });

  it('throws when markRead cannot find a notification', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(notificationsService.markRead('missing', 'user1')).rejects.toThrow(AppError);
    await expect(notificationsService.markRead('missing', 'user1')).rejects.toMatchObject({ statusCode: 404 });
  });
});
