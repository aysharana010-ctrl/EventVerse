import React, { useState, useEffect } from "react";
import * as api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    api.getNotifications()
      .then(setNotifications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleMarkRead(id) {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // silently ignore — user can retry by clicking again
    }
  }

  async function handleMarkAllRead() {
    setMarkingAll(true);
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      setError(err.message);
    } finally {
      setMarkingAll(false);
    }
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <div className="flex items-center gap-3">
            <span className="bg-gray-200 px-3 py-1 rounded text-sm">
              {unreadCount} new
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={markingAll}
                className="text-sm text-blue-600 hover:underline disabled:opacity-60"
              >
                {markingAll ? "Marking..." : "Mark all read"}
              </button>
            )}
          </div>
        </div>

        {loading && <p className="text-gray-500">Loading notifications...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && notifications.length === 0 && (
          <p className="text-gray-500">No notifications yet.</p>
        )}

        {/* Notifications List */}
        <div className="space-y-3">

          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.is_read && handleMarkRead(n.id)}
              className={`p-4 rounded-xl shadow-sm flex gap-4 cursor-pointer ${
                !n.is_read ? "bg-blue-50" : "bg-white"
              }`}
            >

              {/* Icon */}
              <div className={`p-2 rounded-lg ${!n.is_read ? "bg-blue-100" : "bg-gray-200"}`}>
                <span className="text-lg">🔔</span>
              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{n.message}</p>
                  {!n.is_read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {n.created_at ? new Date(n.created_at).toLocaleString() : ""}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Notifications;
