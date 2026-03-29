const studentsService = require('../services/students.service');
const asyncHandler = require('../utils/asyncHandler');

const getProfile = asyncHandler(async (req, res) => {
  const profile = await studentsService.getProfile(req.params.id);
  res.json(profile);
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await studentsService.updateProfile(req.params.id, req.user.userId, req.body);
  res.json(profile);
});

const getStudentEvents = asyncHandler(async (req, res) => {
  const events = await studentsService.getStudentEvents(req.params.id);
  res.json(events);
});

const getStudentClubs = asyncHandler(async (req, res) => {
  const clubs = await studentsService.getStudentClubs(req.params.id);
  res.json(clubs);
});

const getStudentCertificates = asyncHandler(async (req, res) => {
  const certificates = await studentsService.getStudentCertificates(req.params.id, req.user);
  res.json(certificates);
});

module.exports = { getProfile, updateProfile, getStudentEvents, getStudentClubs, getStudentCertificates };