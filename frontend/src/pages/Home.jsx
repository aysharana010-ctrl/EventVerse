import React from "react";

function Home() {
  return (
    <div>
      <h1>Home</h1>
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-700">Event Verse</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="text-gray-700 hover:text-blue-700">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-700">Events</a>
          <a href="#" className="text-gray-700 hover:text-blue-700">Clubs</a>
          <a href="#" className="text-gray-700 hover:text-blue-700">Contact</a>
        </nav>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
        {/* Left text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to Event Verse
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Discover, Join, & Manage College Events Easily
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800">
              Get Started
            </button>
            <button className="border-2 border-blue-700 text-blue-700 px-6 py-3 rounded-md hover:bg-blue-50">
              Explore Events
            </button>
          </div>
        </div>

        {/* Right illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Event Illustration"
            className="w-80 md:w-96"
          />
        </div>
      </section>
    </div>
   </div>
  )
}

export default Home;
