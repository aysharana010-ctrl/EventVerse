const router = require('express').Router();
const clubsController = require('../controllers/clubs.controller');
const authenticate = require('../middleware/authenticate');
const requireRole = require('../middleware/requireRole');

router.get('/', clubsController.listClubs);
router.get('/:id', clubsController.getClub);
router.get('/:id/events', clubsController.getClubEvents);

router.post('/:id/join', authenticate, requireRole('student'), clubsController.joinClub);
router.delete('/:id/join', authenticate, requireRole('student'), clubsController.leaveClub);

module.exports = router;