const { createMockReq, createMockRes } = require('../testUtils');

jest.mock('../../src/services/notifications.service', () => ({
  getNotifications: jest.fn(),
  markRead: jest.fn(),
  markAllRead: jest.fn(),
}));

const notificationsController = require('../../src/controllers/notifications.controller');
const notificationsService = require('../../src/services/notifications.service');

describe('notifications.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retrieves notifications for the authenticated user', async () => {
    const req = createMockReq({ user: { userId: 'user1' } });
    const res = createMockRes();
    notificationsService.getNotifications.mockResolvedValueOnce([{ id: 'n1' }]);

    await notificationsController.getNotifications(req, res);

    expect(notificationsService.getNotifications).toHaveBeenCalledWith('user1');
    expect(res.json).toHaveBeenCalledWith([{ id: 'n1' }]);
  });

  it('marks a notification as read', async () => {
    const req = createMockReq({ params: { id: 'n1' }, user: { userId: 'user1' } });
    const res = createMockRes();
    notificationsService.markRead.mockResolvedValueOnce({ id: 'n1', is_read: true });

    await notificationsController.markRead(req, res);

    expect(notificationsService.markRead).toHaveBeenCalledWith('n1', 'user1');
    expect(res.json).toHaveBeenCalledWith({ id: 'n1', is_read: true });
  });
});
