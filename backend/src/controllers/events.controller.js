const eventsService = require('../services/events.service');
const asyncHandler = require('../utils/asyncHandler');

const listEvents = asyncHandler(async (req, res) => {
  const { club, date, page, limit } = req.query;
  const result = await eventsService.listEvents({ club, date, page, limit });
  res.json(result);
});

const getEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.getEvent(req.params.id);
  res.json(event);
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.createEvent(req.user.userId, req.body);
  res.status(201).json(event);
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.updateEvent(req.params.id, req.user.userId, req.body);
  res.json(event);
});

const deleteEvent = asyncHandler(async (req, res) => {
  await eventsService.deleteEvent(req.params.id, req.user.userId);
  res.json({ message: 'Event deleted successfully.' });
});

const registerForEvent = asyncHandler(async (req, res) => {
  const registration = await eventsService.registerForEvent(req.user.userId, req.params.id);
  res.status(201).json(registration);
});

const unregisterFromEvent = asyncHandler(async (req, res) => {
  await eventsService.unregisterFromEvent(req.user.userId, req.params.id);
  res.json({ message: 'Registration cancelled successfully.' });
});

const getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await eventsService.getRegistrations(req.params.id, req.user.userId);
  res.json(registrations);
});

const updateAttendance = asyncHandler(async (req, res) => {
  const { attendees } = req.body;
  await eventsService.updateAttendance(req.params.id, req.user.userId, attendees);
  res.json({ message: 'Attendance updated successfully.' });
});

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await eventsService.getAttendance(req.params.id, req.user.userId);
  res.json(attendance);
});

const uploadCertificate = asyncHandler(async (req, res) => {
  const certificate = await eventsService.uploadCertificate(
    req.params.id,
    req.params.studentId,
    req.user.userId,
    req.file
  );
  res.status(201).json(certificate);
});

const getEventCertificates = asyncHandler(async (req, res) => {
  const certificates = await eventsService.getEventCertificates(req.params.id, req.user.userId);
  res.json(certificates);
});

module.exports = {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getRegistrations,
  updateAttendance,
  getAttendance,
  uploadCertificate,
  getEventCertificates,
};