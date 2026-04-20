import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getClubs()
      .then(setClubs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categoryColors = {
    Technology: "from-blue-500 to-orange-400",
    "Arts & Culture": "from-pink-500 to-rose-400",
    Business: "from-indigo-500 to-indigo-400",
    Sports: "from-green-500 to-emerald-400",
    Academic: "from-amber-500 to-yellow-400",
    Social: "from-teal-500 to-cyan-400",
  };

  const defaultColor = "from-gray-400 to-gray-500";

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

        {loading && (
          <p className="text-center text-gray-500">Loading clubs...</p>
        )}
        {error && (
          <p className="text-center text-red-600">{error}</p>
        )}
        {!loading && !error && clubs.length === 0 && (
          <p className="text-center text-gray-500">No clubs found.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {clubs.map((club) => {
            const color = categoryColors[club.category] || defaultColor;
            return (
              <div
                key={club.id}
                className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                {/* Top Gradient */}
                <div className={`h-2 bg-gradient-to-r ${color}`} />

                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br ${color}`}>
                      {club.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{club.name}</h3>
                      <span className="text-xs text-blue-600 font-medium">
                        {club.category || "General"}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    {club.description}
                  </p>
                </div>

                <div className="px-6 pb-6 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>👥 {club.member_count ?? 0} members</span>
                    {club.club_head_name && (
                      <span className="text-xs">Head: {club.club_head_name}</span>
                    )}
                  </div>

                  <Link to={`/ClubDetails?id=${club.id}`}>
                    <button className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}

        </div>
      </section>

    </div>
  );
}

export default Clubs;
