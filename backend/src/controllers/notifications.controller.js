const notificationsService = require('../services/notifications.service');
const asyncHandler = require('../utils/asyncHandler');

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationsService.getNotifications(req.user.userId);
  res.json(notifications);
});

const markRead = asyncHandler(async (req, res) => {
  const notification = await notificationsService.markRead(req.params.id, req.user.userId);
  res.json(notification);
});

const markAllRead = asyncHandler(async (req, res) => {
  await notificationsService.markAllRead(req.user.userId);
  res.json({ message: 'All notifications marked as read.' });
});

module.exports = { getNotifications, markRead, markAllRead };