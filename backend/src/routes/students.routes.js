const router = require('express').Router();
const studentsController = require('../controllers/students.controller');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

router.get('/:id', studentsController.getProfile);
router.put('/:id', studentsController.updateProfile);
router.get('/:id/events', studentsController.getStudentEvents);
router.get('/:id/clubs', studentsController.getStudentClubs);
router.get('/:id/certificates', studentsController.getStudentCertificates);

module.exports = router;