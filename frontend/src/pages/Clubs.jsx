import React from "react";
import { Link } from "react-router-dom";

function Clubs() {
  const clubs = [
    { id: "1", name: "Tech Club", description: "Building the future through code, hardware, and innovation.", category: "Technology", members: 245, founded: "2018", meetingDay: "Every Wednesday, 5 PM", tags: ["Coding", "Hackathons", "Web Dev"] },
    { id: "2", name: "Cultural Society", description: "Celebrating diversity through music, dance, drama, and art.", category: "Arts & Culture", members: 180, founded: "2015", meetingDay: "Every Friday, 4 PM", tags: ["Dance", "Music", "Theatre"] },
    { id: "3", name: "Entrepreneurship Cell", description: "Turning ideas into startups. We mentor aspiring entrepreneurs.", category: "Business", members: 120, founded: "2019", meetingDay: "Every Tuesday, 6 PM", tags: ["Startups", "Pitching", "Business"] },
    { id: "4", name: "Photography Club", description: "Capturing moments and telling stories through the lens.", category: "Arts & Culture", members: 95, founded: "2016", meetingDay: "Every Saturday, 10 AM", tags: ["Photography", "Editing", "Visual Arts"] },
    { id: "5", name: "AI Society", description: "Exploring artificial intelligence, machine learning, and data science.", category: "Technology", members: 150, founded: "2020", meetingDay: "Every Thursday, 5 PM", tags: ["AI", "ML", "Data Science"] },
    { id: "6", name: "Sports Council", description: "Organizing inter-college tournaments and promoting fitness culture.", category: "Sports", members: 310, founded: "2010", meetingDay: "Every Monday, 6 AM", tags: ["Cricket", "Basketball", "Athletics"] },
    { id: "7", name: "Debate Society", description: "Sharpening minds through structured argumentation and MUNs.", category: "Academic", members: 88, founded: "2017", meetingDay: "Every Wednesday, 4 PM", tags: ["Debate", "MUN", "Public Speaking"] },
    { id: "8", name: "Green Campus Initiative", description: "Making our campus sustainable through awareness campaigns.", category: "Social", members: 72, founded: "2021", meetingDay: "Every Sunday, 9 AM", tags: ["Environment", "Sustainability", "Volunteering"] },
  ];

  const categoryColors = {
    Technology: "from-blue-500 to-orange-400",
    "Arts & Culture": "from-pink-500 to-rose-400",
    Business: "from-indigo-500 to-indigo-400",
    Sports: "from-green-500 to-emerald-400",
    Academic: "from-amber-500 to-yellow-400",
    Social: "from-teal-500 to-cyan-400",
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <section className="relative h-64 md:h-80">

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Students"
          className="absolute inset-0 w-full h-full object-cover"
        />
         </section>

      {/* Hero */}
    
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-white">
  <h1 className="text-4xl font-bold md:text-5xl">
    Student Clubs
  </h1>
  <p className="mt-2 text-lg">
    Find your community on campus
  </p>
</div>
     

      {/* Clubs */}
      <section className="px-6 md:px-20 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {clubs.map((club) => (
            <div
              key={club.id}
              className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              {/* Top Gradient */}
              <div className={`h-2 bg-gradient-to-r ${categoryColors[club.category]}`} />

              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br ${categoryColors[club.category]}`}>
                    {club.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{club.name}</h3>
                    <span className="text-xs text-blue-600 font-medium">
                      {club.category}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {club.description}
                </p>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {club.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👥 {club.members} members</span>
                  <span>📅 Est. {club.founded}</span>
                </div>

                <p className="text-xs text-gray-500">
                  📅 {club.meetingDay}
                </p>
                <Link to="/ClubDetails">
                  <button className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                    View Details
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

export default Clubs;