const clubsService = require('../services/clubs.service');
const asyncHandler = require('../utils/asyncHandler');

const listClubs = asyncHandler(async (req, res) => {
  const clubs = await clubsService.listClubs();
  res.json(clubs);
});

const getClub = asyncHandler(async (req, res) => {
  const club = await clubsService.getClub(req.params.id);
  res.json(club);
});

const joinClub = asyncHandler(async (req, res) => {
  await clubsService.joinClub(req.user.userId, req.params.id);
  res.status(201).json({ message: 'Successfully joined the club.' });
});

const leaveClub = asyncHandler(async (req, res) => {
  await clubsService.leaveClub(req.user.userId, req.params.id);
  res.json({ message: 'Successfully left the club.' });
});

const getClubEvents = asyncHandler(async (req, res) => {
  const events = await clubsService.getClubEvents(req.params.id);
  res.json(events);
});

module.exports = { listClubs, getClub, joinClub, leaveClub, getClubEvents };