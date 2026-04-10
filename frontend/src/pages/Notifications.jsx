import React from "react";
function Notifications() {

  const notifications = [
    {
      id: 1,
      icon: "📅",
      title: "Tech Fest Registration Open",
      message: "Register before Apr 10 to secure your spot.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      icon: "🏆",
      title: "Certificate Available",
      message: "Your Hackathon 2.0 participation certificate is ready.",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      icon: "👥",
      title: "Club Invite",
      message: "You've been invited to join the Robotics Club.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 4,
      icon: "🔔",
      title: "Event Reminder",
      message: "Cultural Night starts tomorrow at 6 PM.",
      time: "3 days ago",
      unread: false,
    },
    {
      id: 5,
      icon: "📅",
      title: "Schedule Update",
      message: "Workshop on AI/ML has been rescheduled to May 15.",
      time: "5 days ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <span className="bg-gray-200 px-3 py-1 rounded text-sm">
            {unreadCount} new
          </span>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl shadow-sm flex gap-4 ${
                n.unread ? "bg-blue-50" : "bg-white"
              }`}
            >

              {/* Icon */}
              <div className={`p-2 rounded-lg ${
                n.unread ? "bg-blue-100" : "bg-gray-200"
              }`}>
                <span className="text-lg">{n.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{n.title}</p>

                  {n.unread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  {n.message}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {n.time}
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