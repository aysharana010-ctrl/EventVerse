const router = require('express').Router();
const notificationsController = require('../controllers/notifications.controller');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

// Must register the more-specific /read-all before /:id/read
router.put('/read-all', notificationsController.markAllRead);
router.get('/', notificationsController.getNotifications);
router.put('/:id/read', notificationsController.markRead);

module.exports = router;