import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.clubId) {
      setLoading(false);
      return;
    }
    api.getClubEvents(user.clubId)
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">

      <div className="w-full max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">
              Manage events, clubs, and certificates
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Link to="/admin/events">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                ⚙️ Manage Events
              </button>
            </Link>

            <Link to="/admin/certificates">
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                📤 Upload Certs
              </button>
            </Link>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">📅</span>
            </div>
            <p className="text-2xl font-bold">{events.length}</p>
            <p className="text-sm text-gray-500">Your Events</p>
          </div>

          {/* TODO: stats for students, certificates, clubs require additional API endpoints */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">👥</span>
            </div>
            <p className="text-2xl font-bold">—</p>
            <p className="text-sm text-gray-500">Total Students</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">🏅</span>
            </div>
            <p className="text-2xl font-bold">—</p>
            <p className="text-sm text-gray-500">Certificates Issued</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">📈</span>
            </div>
            <p className="text-2xl font-bold">—</p>
            <p className="text-sm text-gray-500">Clubs</p>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Club Events */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">

            <h2 className="text-xl font-semibold">Your Events</h2>

            {loading && <p className="text-gray-500 text-sm">Loading events...</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {!user?.clubId && !loading && (
              <p className="text-gray-500 text-sm">No club associated with your account.</p>
            )}
            {!loading && !error && events.length === 0 && user?.clubId && (
              <p className="text-gray-500 text-sm">No events yet.</p>
            )}

            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex justify-between border-b py-2 last:border-0"
              >
                <span className="text-sm">{ev.name}</span>
                <span className="text-xs text-gray-500">
                  {ev.starts_at ? new Date(ev.starts_at).toLocaleDateString() : "TBD"}
                </span>
              </div>
            ))}

          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">

            <h2 className="text-xl font-semibold">Quick Actions</h2>

            <Link to="/admin/events">
              <button className="w-full border px-4 py-2 rounded-lg text-left hover:bg-gray-100">
                📅 Create New Event
              </button>
            </Link>

            <Link to="/admin/certificates">
              <button className="w-full border px-4 py-2 rounded-lg text-left hover:bg-gray-100">
                📤 Upload Certificates
              </button>
            </Link>

            {/* TODO: View All Students requires a dedicated admin endpoint */}
            <button className="w-full border px-4 py-2 rounded-lg text-left hover:bg-gray-100 opacity-50 cursor-not-allowed">
              👥 View All Students
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
