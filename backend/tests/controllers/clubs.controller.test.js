const { createMockReq, createMockRes } = require('../testUtils');

jest.mock('../../src/services/clubs.service', () => ({
  listClubs: jest.fn(),
  getClub: jest.fn(),
  joinClub: jest.fn(),
  leaveClub: jest.fn(),
  getClubEvents: jest.fn(),
}));

const clubsController = require('../../src/controllers/clubs.controller');
const clubsService = require('../../src/services/clubs.service');

describe('clubs.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lists clubs', async () => {
    const req = createMockReq();
    const res = createMockRes();
    clubsService.listClubs.mockResolvedValueOnce([{ id: 'club1' }]);

    await clubsController.listClubs(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 'club1' }]);
  });

  it('joins a club and returns success', async () => {
    const req = createMockReq({ params: { id: 'club1' }, user: { userId: 'student1' } });
    const res = createMockRes();
    clubsService.joinClub.mockResolvedValueOnce();

    await clubsController.joinClub(req, res);

    expect(clubsService.joinClub).toHaveBeenCalledWith('student1', 'club1');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully joined the club.' });
  });
});
