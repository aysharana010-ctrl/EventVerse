import React from "react";
function Clubs() {
  var activeCategory = "All";

  var filtered = activeCategory === "All"
    ? clubs
    : clubs.filter(function (c) {
        return c.category === activeCategory;
      });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden md:h-80">
        <img
          src={heroImg}
          alt="Campus clubs"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold md:text-5xl">
              Student Clubs
            </h1>
            <p className="mt-2 text-lg">
              Find your community on campus
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container py-6">
        <div className="flex flex-wrap gap-2">
          {clubCategories.map(function (cat) {
            return (
              <button
                key={cat}
                className="border px-3 py-1 rounded"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clubs */}
      <section className="container pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(function (club) {
            return (
              <div
                key={club.id}
                className="border rounded p-4 shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-bold">{club.name}</h2>
                <p className="text-sm text-gray-500">{club.category}</p>

                <p className="text-sm mt-2">
                  {club.description}
                </p>

                {/* Tags */}
                <div className="mt-2">
                  {club.tags.map(function (tag) {
                    return (
                      <span
                        key={tag}
                        className="text-xs border px-2 py-1 mr-1 rounded"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Info */}
                <div className="mt-3 text-sm text-gray-600">
                  <p>{club.members} members</p>
                  <p>Est. {club.founded}</p>
                  <p>{club.meetingDay}</p>
                </div>

                <button className="mt-4 w-full bg-black text-white py-2 rounded">
                  Join Club
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Clubs;