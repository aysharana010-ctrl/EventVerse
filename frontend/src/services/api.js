const BASE_URL = import.meta.env.VITE_API_URL || '';
const TOKEN_KEY = 'ev_token';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, { body, auth = true, isFormData = false } = {}) {
  const headers = {
    ...(auth ? authHeaders() : {}),
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
  };

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Something went wrong, please try again');
  }

  if (!res.ok) {
    let message = 'Something went wrong, please try again';
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ── Auth ────────────────────────────────────────────────────────────────────

export const register = (name, email, password, department, year, phone) =>
  request('POST', '/auth/register', {
    body: { name, email, password, department, year, phone },
    auth: false,
  });

export const login = (email, password) =>
  request('POST', '/auth/login', { body: { email, password }, auth: false });

export const forgotPassword = (email) =>
  request('POST', '/auth/forgot-password', { body: { email }, auth: false });

export const resetPassword = (token, newPassword) =>
  request('POST', '/auth/reset-password', { body: { token, newPassword }, auth: false });

export const getMe = () => request('GET', '/auth/me');

// ── Events ──────────────────────────────────────────────────────────────────

export const getEvents = ({ club, date, page, limit } = {}) => {
  const params = new URLSearchParams();
  if (club) params.set('club', club);
  if (date) params.set('date', date);
  if (page) params.set('page', page);
  if (limit) params.set('limit', limit);
  const qs = params.toString();
  return request('GET', `/events${qs ? `?${qs}` : ''}`, { auth: false });
};

export const getEventById = (id) => request('GET', `/events/${id}`, { auth: false });

export const createEvent = (data) => request('POST', '/events', { body: data });

export const updateEvent = (id, data) => request('PUT', `/events/${id}`, { body: data });

export const deleteEvent = (id) => request('DELETE', `/events/${id}`);

export const registerForEvent = (id) => request('POST', `/events/${id}/register`);

export const cancelEventRegistration = (id) => request('DELETE', `/events/${id}/register`);

export const getEventRegistrations = (id) => request('GET', `/events/${id}/registrations`);

// ── Attendance ───────────────────────────────────────────────────────────────

export const updateAttendance = (eventId, attendees) =>
  request('PUT', `/events/${eventId}/attendance`, { body: { attendees } });

export const getAttendance = (eventId) => request('GET', `/events/${eventId}/attendance`);

// ── Certificates ─────────────────────────────────────────────────────────────

export const uploadCertificate = (eventId, studentId, file) => {
  const formData = new FormData();
  formData.append('certificate', file);
  return request('POST', `/events/${eventId}/certificates/${studentId}`, {
    body: formData,
    isFormData: true,
  });
};

export const getEventCertificates = (eventId) =>
  request('GET', `/events/${eventId}/certificates`);

export const getStudentCertificates = (studentId) =>
  request('GET', `/students/${studentId}/certificates`);

// ── Clubs ────────────────────────────────────────────────────────────────────

export const getClubs = () => request('GET', '/clubs', { auth: false });

export const getClubById = (id) => request('GET', `/clubs/${id}`, { auth: false });

export const joinClub = (id) => request('POST', `/clubs/${id}/join`);

export const leaveClub = (id) => request('DELETE', `/clubs/${id}/join`);

export const getClubEvents = (id) => request('GET', `/clubs/${id}/events`, { auth: false });

// ── Students ─────────────────────────────────────────────────────────────────

export const getStudent = (id) => request('GET', `/students/${id}`);

export const updateStudent = (id, data) => request('PUT', `/students/${id}`, { body: data });

export const getStudentEvents = (id) => request('GET', `/students/${id}/events`);

export const getStudentClubs = (id) => request('GET', `/students/${id}/clubs`);

// ── Notifications ─────────────────────────────────────────────────────────────

export const getNotifications = () => request('GET', '/notifications');

export const markNotificationRead = (id) => request('PUT', `/notifications/${id}/read`);

export const markAllNotificationsRead = () => request('PUT', '/notifications/read-all');
