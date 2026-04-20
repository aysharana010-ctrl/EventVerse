import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function EventRegistration() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("id");
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [eventError, setEventError] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setLoadingEvent(false);
      setEventError("No event selected.");
      return;
    }
    api.getEventById(eventId)
      .then(setEvent)
      .catch((err) => setEventError(err.message))
      .finally(() => setLoadingEvent(false));
  }, [eventId]);

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: the motivation field has no corresponding API field — collected but not sent
    setSubmitting(true);
    setMessage(null);
    try {
      await api.registerForEvent(eventId);
      setRegistered(true);
      setMessage({ type: "success", text: "Successfully registered for the event!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
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

          {loadingEvent && (
            <p className="text-gray-500">Loading event details...</p>
          )}

          {eventError && (
            <p className="text-red-600">{eventError}</p>
          )}

          {event && (
            <>
              {/* Header */}
              <h1 className="text-2xl font-bold">
                Event Registration
              </h1>
              <p className="text-gray-500">
                Register for {event.name}
              </p>

              {/* Event Info */}
              <div className="flex gap-4 text-sm text-gray-500 mt-3">
                <span>📅 {event.starts_at ? new Date(event.starts_at).toLocaleDateString() : "TBD"}</span>
                <span>📍 {event.venue || "TBD"}</span>
              </div>

              {message && (
                <div className={`mt-4 px-4 py-2 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {message.text}
                </div>
              )}

              {/* Form */}
              {!registered && (
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">

                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user?.name || ""}
                      readOnly={!!user?.name}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="you@university.edu"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user?.email || ""}
                      readOnly={!!user?.email}
                    />
                  </div>

                  {/* TODO: api.registerForEvent(id) takes no phone param — field is display-only */}
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user?.phone || ""}
                    />
                  </div>

                  {/* TODO: motivation has no corresponding API field */}
                  <div>
                    <label className="block text-gray-700 mb-2">Why do you want to attend?</label>
                    <textarea
                      placeholder="Tell us your motivation..."
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                  >
                    {submitting ? "Registering..." : "Confirm Registration"}
                  </button>

                </form>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default EventRegistration;
