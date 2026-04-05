function ClubDetails() {

  function handleJoin() {
    alert("You've joined the Coding Club!");
  }

  const activities = [
    { title: "Weekly Coding Session", date: "Every Saturday, 3 PM" },
    { title: "Web Dev Workshop", date: "Apr 18, 2026" },
    { title: "Inter-College Hackathon", date: "May 5, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-3xl space-y-8">

        {/* Back Link */}
        <a
          href="/clubs"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Clubs
        </a>

        {/* Club Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Coding Club</h1>
            <span className="text-sm bg-gray-200 px-3 py-1 rounded">
              Technical
            </span>
          </div>

          <p className="text-gray-500">
            A community of passionate programmers who learn, code, and build projects together.
            We host weekly meetups, workshops, and participate in national hackathons.
          </p>

          {/* Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>👥 85 Members</span>
            <span>📅 Est. 2020</span>
            <span>🏆 12 Awards</span>
          </div>

          {/* Button */}
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Join This Club
          </button>

        </div>

        {/* Activities */}
        <div className="space-y-4">

          <h2 className="text-xl font-semibold">
            Upcoming Activities
          </h2>

          {activities.map((activity) => (
            <div
              key={activity.title}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>

              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                Upcoming
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ClubDetails;