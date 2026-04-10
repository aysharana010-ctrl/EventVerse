import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Events() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState({}); // { [eventId]: boolean }
  const [registered, setRegistered] = useState({}); // { [eventId]: boolean }
  const [toast, setToast] = useState(null);

  // Filters
  const [clubFilter, setClubFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  function showToast(type, text) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getEvents({ club: clubFilter || undefined, date: dateFilter || undefined })
      .then((data) => setEvents(data.events))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [clubFilter, dateFilter]);

  async function handleRegister(eventId) {
    if (!user) {
      navigate("/login");
      return;
    }
    setRegistering((prev) => ({ ...prev, [eventId]: true }));
    try {
      await api.registerForEvent(eventId);
      setRegistered((prev) => ({ ...prev, [eventId]: true }));
      showToast("success", "Successfully registered for the event!");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setRegistering((prev) => ({ ...prev, [eventId]: false }));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-sm shadow-lg ${toast.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {toast.text}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-64 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
          alt="Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">Events</h1>
          <p className="mt-2 text-lg">Discover what's happening on campus</p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-20 pt-8 flex flex-wrap gap-4">
        <input
          type="date"
          className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filter by date"
        />
        <input
          type="text"
          className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Filter by club ID"
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
        />
        {(clubFilter || dateFilter) && (
          <button
            onClick={() => { setClubFilter(""); setDateFilter(""); }}
            className="px-4 py-2 text-sm text-gray-500 hover:text-black"
          >
            Clear filters
          </button>
        )}
      </section>

      {/* Events Cards */}
      <section className="px-6 md:px-20 py-10">
        {loading && (
          <p className="text-center text-gray-500">Loading events...</p>
        )}
        {error && (
          <p className="text-center text-red-600">{error}</p>
        )}
        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-500">No upcoming events found.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              {/* Top Gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />

              <div className="p-6">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.club_name || "General"}</p>

                <p className="mt-2 text-sm text-gray-600">{event.description}</p>

                {/* Info */}
                <div className="mt-3 text-sm text-gray-600">
                  <p>📅 {event.starts_at ? new Date(event.starts_at).toLocaleDateString() : "TBD"}</p>
                  <p>📍 {event.venue || "TBD"}</p>
                  {event.organiser_name && <p>🎙️ {event.organiser_name}</p>}
                </div>

                {/* Register / Manage button */}
                {user?.role === "club_head" ? (
                  <Link to="/Admin">
                    <button className="mt-4 px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                      Manage
                    </button>
                  </Link>
                ) : registered[event.id] ? (
                  <span className="mt-4 inline-block px-6 py-2 rounded-full text-white font-semibold bg-green-500">
                    Registered ✓
                  </span>
                ) : (
                  <button
                    onClick={() => handleRegister(event.id)}
                    disabled={registering[event.id]}
                    className="mt-4 px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {registering[event.id] ? "Registering..." : "Register"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Events;
