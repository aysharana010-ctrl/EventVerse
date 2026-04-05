import React from "react";
import { Link } from "react-router-dom";
function AdminEvents() {

  const events = [
    { id: 1, title: "Tech Fest 2026", date: "2026-04-15", status: "Active", registrations: 78 },
    { id: 2, title: "Cultural Night", date: "2026-04-22", status: "Active", registrations: 145 },
    { id: 3, title: "Hackathon 3.0", date: "2026-05-01", status: "Upcoming", registrations: 42 },
  ];

  function handleCreate(e) {
    e.preventDefault();
    alert("Event created successfully!");
    document.getElementById("form").classList.add("hidden");
  }

  function toggleForm() {
    document.getElementById("form").classList.toggle("hidden");
  }

  function handleDelete() {
    alert("Event deleted");
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">

      <div className="w-full max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Event Management</h1>

          <button
            onClick={toggleForm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ New Event
          </button>
        </div>

        {/* Form */}
        <div id="form" className="hidden bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold mb-4">Create Event</h2>

          <form onSubmit={handleCreate} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Event Title" className="px-4 py-2 border rounded-lg" required />
              <input type="date" className="px-4 py-2 border rounded-lg" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Location" className="px-4 py-2 border rounded-lg" required />
              <input type="number" placeholder="Max Participants" className="px-4 py-2 border rounded-lg" required />
            </div>

            <textarea placeholder="Event details..." className="w-full px-4 py-2 border rounded-lg"></textarea>

            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Create Event
              </button>

              <button
                type="button"
                onClick={toggleForm}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>

        </div>

        {/* Events List */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">

          {/* Header Row */}
          <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2">
            <span>Event</span>
            <span>Date</span>
            <span>Status</span>
            <span>Registrations</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Data Rows */}
          {events.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-5 items-center py-2 border-b last:border-0 text-sm"
            >

              <span className="font-medium">{event.title}</span>
              <span>{event.date}</span>

              <span>
                <span className={`px-2 py-1 rounded text-xs ${
                  event.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {event.status}
                </span>
              </span>

              <span>{event.registrations}</span>

              <div className="text-right space-x-2">
                <button className="text-blue-600">✏️</button>
                <button onClick={handleDelete} className="text-red-600">🗑️</button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminEvents;