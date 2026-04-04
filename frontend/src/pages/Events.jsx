function Events() {
    return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden md:h-80">
        <img
          src={heroImg}
          alt="Campus events"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              Campus Events
            </h1>
            <p className="mt-2 text-lg text-primary-foreground/80">
              Discover what's happening on campus
            </p>
          </div>
        </div>
      </section>

      {/* Filters (static, no click functionality) */}
      <div className="container py-6">
        <div className="flex flex-wrap gap-2">
          {eventCategories.map(function (cat) {
            return (
              <button key={cat} className="border px-3 py-1 rounded">
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Grid */}
      <section className="container pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(function (event, i) {
            var percentage = event.spots
              ? Math.round((event.registered / event.spots) * 100)
              : 0;

            return (
              <div key={event.id} className="border rounded p-4 shadow">
                <div className="flex justify-between text-sm">
                  <span>{event.category}</span>
                  <span>{event.club}</span>
                </div>

                <h2 className="mt-2 text-xl font-bold">{event.title}</h2>
                <p className="text-sm">{event.description}</p>

                <div className="mt-3 text-sm">
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p>{event.time}</p>
                  <p>{event.location}</p>
                </div>

                <div className="mt-3">
                  <p className="text-xs">
                    {event.registered}/{event.spots} registered ({percentage}%)
                  </p>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: percentage + "%" }}
                    ></div>
                  </div>
                </div>

                <button className="mt-4 w-full border py-2 rounded">
                  {event.registered >= event.spots
                    ? "Waitlist"
                    : "Register Now"}
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

export default Events;