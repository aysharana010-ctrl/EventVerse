import React from "react";

function EventRegistration() {

  function handleSubmit(e) {
    e.preventDefault();
    alert("Successfully registered for the event!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-lg space-y-6">

        {/* Back Link */}
        <a
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          ← Back to Events
        </a>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          {/* Header */}
          <h1 className="text-2xl font-bold">
            Event Registration
          </h1>
          <p className="text-gray-500">
            Register for Event
          </p>

          {/* Event Info */}
          <div className="flex gap-4 text-sm text-gray-500 mt-3">
            <span>📅 Apr 15, 2026</span>
            <span>📍 Main Auditorium</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

            <div>
              <label className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@university.edu"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Why do you want to attend?
              </label>
              <textarea
                placeholder="Tell us your motivation..."
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Confirm Registration
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EventRegistration;