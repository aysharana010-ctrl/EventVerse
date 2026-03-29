const { createMockReq, createMockRes } = require('../testUtils');

jest.mock('../../src/services/events.service', () => ({
  listEvents: jest.fn(),
  getEvent: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
  registerForEvent: jest.fn(),
  unregisterFromEvent: jest.fn(),
  getRegistrations: jest.fn(),
  updateAttendance: jest.fn(),
  getAttendance: jest.fn(),
  uploadCertificate: jest.fn(),
  getEventCertificates: jest.fn(),
}));

const eventsController = require('../../src/controllers/events.controller');
const eventsService = require('../../src/services/events.service');

describe('events.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns event list from service', async () => {
    const req = createMockReq({ query: { club: 'club1' } });
    const res = createMockRes();
    eventsService.listEvents.mockResolvedValueOnce({ events: [] });

    await eventsController.listEvents(req, res);

    expect(eventsService.listEvents).toHaveBeenCalledWith({ club: 'club1', date: undefined, page: undefined, limit: undefined });
    expect(res.json).toHaveBeenCalledWith({ events: [] });
  });

  it('creates an event and returns 201', async () => {
    const req = createMockReq({ body: { name: 'Event' }, user: { userId: 'head1' } });
    const res = createMockRes();
    eventsService.createEvent.mockResolvedValueOnce({ id: 'event1' });

    await eventsController.createEvent(req, res);

    expect(eventsService.createEvent).toHaveBeenCalledWith('head1', { name: 'Event' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'event1' });
  });

  it('deletes an event and returns message', async () => {
    const req = createMockReq({ params: { id: 'event1' }, user: { userId: 'head1' } });
    const res = createMockRes();
    eventsService.deleteEvent.mockResolvedValueOnce();

    await eventsController.deleteEvent(req, res);

    expect(eventsService.deleteEvent).toHaveBeenCalledWith('event1', 'head1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted successfully.' });
  });
});
