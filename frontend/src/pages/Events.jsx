import React from "react";
import { Link } from "react-router-dom";

function Events() {
  const events = [
    {
      id: "1",
      name: "Hackathon 2026",
      description: "24-hour coding challenge to build innovative solutions.",
      category: "Technology",
      date: "April 20, 2026",
      location: "Main Auditorium",
      tags: ["Coding", "AI", "Competition"]
    },
    {
      id: "2",
      name: "Cultural Fest",
      description: "A vibrant celebration of music, dance, and art.",
      category: "Arts & Culture",
      date: "May 5, 2026",
      location: "Open Ground",
      tags: ["Dance", "Music", "Fun"]
    },
    {
      id: "3",
      name: "Startup Pitch Day",
      description: "Pitch your startup ideas to investors and mentors.",
      category: "Business",
      date: "June 10, 2026",
      location: "Seminar Hall",
      tags: ["Startup", "Pitching", "Business"]
    },
    {
      id: "4",
      name: "Sports Meet",
      description: "Annual inter-college sports competition.",
      category: "Sports",
      date: "July 15, 2026",
      location: "Sports Ground",
      tags: ["Cricket", "Football", "Athletics"]
    }
  ];

  const categoryColors = {
    Technology: "from-blue-500 to-orange-400",
    "Arts & Culture": "from-pink-500 to-rose-400",
    Business: "from-indigo-500 to-indigo-400",
    Sports: "from-green-500 to-emerald-400"
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ✅ Hero Section */}
      <section className="relative h-64 md:h-80">

        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
          alt="Events"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        {/* 🔥 Lifted Text */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">
            Events
          </h1>
          <p className="mt-2 text-lg">
            Discover what’s happening on campus
          </p>
        </div>

      </section>

      {/* ✅ Events Cards */}
      <section className="px-6 md:px-20 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              {/* Top Gradient */}
              <div className={`h-2 bg-gradient-to-r ${categoryColors[event.category]}`} />

              <div className="p-6">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.category}</p>

                <p className="mt-2 text-sm text-gray-600">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Info */}
                <div className="mt-3 text-sm text-gray-600">
                  <p>📅 {event.date}</p>
                  <p>📍 {event.location}</p>
                </div>
                  <Link to="/EventRegistration">
                <button className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                  Register
                </button>
                 </Link>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

export default Events;