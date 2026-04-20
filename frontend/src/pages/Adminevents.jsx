import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AdminEvents() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  // Create form
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: "", starts_at: "", venue: "", max_participants: "", description: "" });

  // Delete
  const [deleting, setDeleting] = useState({});

  // Attendance panel
  const [attendanceEventId, setAttendanceEventId] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [attendanceEdits, setAttendanceEdits] = useState({});
  const [savingAttendance, setSavingAttendance] = useState(false);
  const [attendanceMessage, setAttendanceMessage] = useState(null);

  useEffect(() => {
    if (!user?.clubId) {
      setLoadingEvents(false);
      return;
    }
    loadEvents();
  }, [user]);

  function loadEvents() {
    setLoadingEvents(true);
    setEventsError(null);
    api.getClubEvents(user.clubId)
      .then(setEvents)
      .catch((err) => setEventsError(err.message))
      .finally(() => setLoadingEvents(false));
  }

  function handleNewEventChange(e) {
    setNewEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setCreateMessage(null);
    try {
      const created = await api.createEvent({
        name: newEvent.name,
        starts_at: newEvent.starts_at || undefined,
        venue: newEvent.venue || undefined,
        max_participants: newEvent.max_participants ? parseInt(newEvent.max_participants) : undefined,
        description: newEvent.description || undefined,
      });
      setEvents((prev) => [...prev, created]);
      setNewEvent({ name: "", starts_at: "", venue: "", max_participants: "", description: "" });
      setShowForm(false);
      setCreateMessage({ type: "success", text: "Event created successfully!" });
      setTimeout(() => setCreateMessage(null), 3000);
    } catch (err) {
      setCreateMessage({ type: "error", text: err.message });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(eventId) {
    setDeleting((prev) => ({ ...prev, [eventId]: true }));
    try {
      await api.deleteEvent(eventId);
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting((prev) => ({ ...prev, [eventId]: false }));
    }
  }

  async function openAttendance(eventId) {
    if (attendanceEventId === eventId) {
      setAttendanceEventId(null);
      return;
    }
    setAttendanceEventId(eventId);
    setLoadingAttendance(true);
    setAttendanceMessage(null);
    try {
      const data = await api.getAttendance(eventId);
      setAttendance(data);
      const edits = {};
      data.forEach((r) => { edits[r.user_id] = r.attended ?? false; });
      setAttendanceEdits(edits);
    } catch (err) {
      setAttendanceMessage({ type: "error", text: err.message });
    } finally {
      setLoadingAttendance(false);
    }
  }

  async function handleSaveAttendance() {
    setSavingAttendance(true);
    setAttendanceMessage(null);
    try {
      const attendees = Object.entries(attendanceEdits).map(([studentId, attended]) => ({
        studentId,
        attended,
      }));
      await api.updateAttendance(attendanceEventId, attendees);
      setAttendanceMessage({ type: "success", text: "Attendance saved!" });
    } catch (err) {
      setAttendanceMessage({ type: "error", text: err.message });
    } finally {
      setSavingAttendance(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">

      <div className="w-full max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Event Management</h1>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ New Event
          </button>
        </div>

        {/* Global message */}
        {createMessage && (
          <div className={`px-4 py-2 rounded-lg text-sm ${createMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {createMessage.text}
          </div>
        )}

        {/* Create Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create Event</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Event Title"
                  className="px-4 py-2 border rounded-lg"
                  value={newEvent.name}
                  onChange={handleNewEventChange}
                  required
                />
                <input
                  type="datetime-local"
                  name="starts_at"
                  className="px-4 py-2 border rounded-lg"
                  value={newEvent.starts_at}
                  onChange={handleNewEventChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="venue"
                  placeholder="Location"
                  className="px-4 py-2 border rounded-lg"
                  value={newEvent.venue}
                  onChange={handleNewEventChange}
                />
                <input
                  type="number"
                  name="max_participants"
                  placeholder="Max Participants"
                  className="px-4 py-2 border rounded-lg"
                  value={newEvent.max_participants}
                  onChange={handleNewEventChange}
                />
              </div>
              <textarea
                name="description"
                placeholder="Event details..."
                className="w-full px-4 py-2 border rounded-lg"
                value={newEvent.description}
                onChange={handleNewEventChange}
              ></textarea>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                >
                  {creating ? "Creating..." : "Create Event"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">

          {/* Header Row */}
          <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2">
            <span>Event</span>
            <span>Date</span>
            <span>Venue</span>
            <span>Registrations</span>
            <span className="text-right">Actions</span>
          </div>

          {loadingEvents && (
            <p className="text-gray-500 text-sm py-2">Loading events...</p>
          )}
          {eventsError && (
            <p className="text-red-600 text-sm py-2">{eventsError}</p>
          )}
          {!loadingEvents && !eventsError && events.length === 0 && (
            <p className="text-gray-500 text-sm py-2">No events yet.</p>
          )}

          {events.map((event) => (
            <div key={event.id}>
              <div className="grid grid-cols-5 items-center py-2 border-b last:border-0 text-sm">
                <span className="font-medium">{event.name}</span>
                <span>{event.starts_at ? new Date(event.starts_at).toLocaleDateString() : "TBD"}</span>
                <span>{event.venue || "—"}</span>
                <span>{event.max_participants ? `/ ${event.max_participants}` : "—"}</span>
                <div className="text-right space-x-2">
                  {/* TODO: edit event inline — api.updateEvent(id, data) */}
                  <button
                    onClick={() => openAttendance(event.id)}
                    className="text-blue-600 text-xs underline"
                  >
                    {attendanceEventId === event.id ? "Close" : "Attendance"}
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={deleting[event.id]}
                    className="text-red-600 disabled:opacity-50"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Attendance Panel */}
              {attendanceEventId === event.id && (
                <div className="bg-gray-50 rounded-lg p-4 mb-2 space-y-3">
                  <h3 className="font-semibold text-sm">Attendance — {event.name}</h3>

                  {attendanceMessage && (
                    <div className={`px-3 py-2 rounded text-sm ${attendanceMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {attendanceMessage.text}
                    </div>
                  )}

                  {loadingAttendance && <p className="text-gray-500 text-sm">Loading...</p>}

                  {!loadingAttendance && attendance.length === 0 && (
                    <p className="text-gray-500 text-sm">No registrations yet.</p>
                  )}

                  {attendance.map((r) => (
                    <div key={r.user_id} className="flex items-center justify-between text-sm">
                      <span>{r.name} <span className="text-gray-400 text-xs">({r.email})</span></span>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={attendanceEdits[r.user_id] ?? false}
                          onChange={(e) =>
                            setAttendanceEdits((prev) => ({ ...prev, [r.user_id]: e.target.checked }))
                          }
                        />
                        Attended
                      </label>
                    </div>
                  ))}

                  {!loadingAttendance && attendance.length > 0 && (
                    <button
                      onClick={handleSaveAttendance}
                      disabled={savingAttendance}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-60"
                    >
                      {savingAttendance ? "Saving..." : "Save Attendance"}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminEvents;
