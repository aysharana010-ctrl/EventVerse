import React from "react";
import { Link } from "react-router-dom";
function AdminDashboard() {

  const stats = [
    { label: "Total Students", value: "1,245", icon: "👥", change: "+12%" },
    { label: "Active Events", value: "24", icon: "📅", change: "+3" },
    { label: "Certificates Issued", value: "856", icon: "🏅", change: "+45" },
    { label: "Clubs", value: "18", icon: "📈", change: "+2" },
  ];

  const registrations = [
    "Alice Johnson - Tech Fest",
    "Bob Smith - Hackathon 3.0",
    "Carol Williams - AI Workshop",
    "David Brown - Cultural Night",
  ];

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
            <a href="/admin/events">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                ⚙️ Manage Events
              </button>
            </a>

            <a href="/admin/certificates">
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                📤 Upload Certs
              </button>
            </a>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{s.icon}</span>
                <span className="text-xs text-gray-500">
                  {s.change}
                </span>
              </div>

              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>

            </div>
          ))}

        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Recent Registrations */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">

            <h2 className="text-xl font-semibold">
              Recent Registrations
            </h2>

            {registrations.map((r) => (
              <div
                key={r}
                className="flex justify-between border-b py-2 last:border-0"
              >
                <span className="text-sm">{r}</span>
                <span className="text-xs text-gray-500">Today</span>
              </div>
            ))}

          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">

            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <a href="/admin/events">
              <button className="w-full border px-4 py-2 rounded-lg text-left hover:bg-gray-100">
                📅 Create New Event
              </button>
            </a>

            <a href="/admin/certificates">
              <button className="w-full border px-4 py-2 rounded-lg text-left hover:bg-gray-100">
                📤 Upload Certificates
              </button>
            </a>

            <button className="w-full border px-4 py-2 rounded-lg text-left hover:bg-gray-100">
              👥 View All Students
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;