const { createMockReq, createMockRes } = require('../testUtils');

jest.mock('../../src/services/students.service', () => ({
  getProfile: jest.fn(),
  updateProfile: jest.fn(),
  getStudentEvents: jest.fn(),
  getStudentClubs: jest.fn(),
  getStudentCertificates: jest.fn(),
}));

const studentsController = require('../../src/controllers/students.controller');
const studentsService = require('../../src/services/students.service');

describe('students.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a student profile', async () => {
    const req = createMockReq({ params: { id: 'student1' } });
    const res = createMockRes();
    studentsService.getProfile.mockResolvedValueOnce({ id: 'student1' });

    await studentsController.getProfile(req, res);

    expect(studentsService.getProfile).toHaveBeenCalledWith('student1');
    expect(res.json).toHaveBeenCalledWith({ id: 'student1' });
  });

  it('updates a student profile', async () => {
    const req = createMockReq({ params: { id: 'student1' }, user: { userId: 'student1' }, body: { name: 'Updated' } });
    const res = createMockRes();
    studentsService.updateProfile.mockResolvedValueOnce({ id: 'student1', name: 'Updated' });

    await studentsController.updateProfile(req, res);

    expect(studentsService.updateProfile).toHaveBeenCalledWith('student1', 'student1', { name: 'Updated' });
    expect(res.json).toHaveBeenCalledWith({ id: 'student1', name: 'Updated' });
  });
});
