const router = require('express').Router();
const multer = require('multer');
const eventsController = require('../controllers/events.controller');
const authenticate = require('../middleware/authenticate');
const requireRole = require('../middleware/requireRole');

const upload = multer({ storage: multer.memoryStorage() });

const isClubHead = [authenticate, requireRole('club_head')];
const isStudent = [authenticate, requireRole('student')];

// Public / any authenticated
router.get('/', eventsController.listEvents);
router.get('/:id', eventsController.getEvent);

// Club head only — event CRUD
router.post('/', ...isClubHead, eventsController.createEvent);
router.put('/:id', ...isClubHead, eventsController.updateEvent);
router.delete('/:id', ...isClubHead, eventsController.deleteEvent);

// Student only — registration
router.post('/:id/register', ...isStudent, eventsController.registerForEvent);
router.delete('/:id/register', ...isStudent, eventsController.unregisterFromEvent);

// Club head only — registrations list
router.get('/:id/registrations', ...isClubHead, eventsController.getRegistrations);

// Attendance
router.put('/:id/attendance', ...isClubHead, eventsController.updateAttendance);
router.get('/:id/attendance', ...isClubHead, eventsController.getAttendance);

// Certificates
router.post(
  '/:id/certificates/:studentId',
  ...isClubHead,
  upload.single('certificate'),
  eventsController.uploadCertificate
);
router.get('/:id/certificates', ...isClubHead, eventsController.getEventCertificates);

module.exports = router;