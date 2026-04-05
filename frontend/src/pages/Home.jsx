import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
     

      {/* Hero Section */}
     <section className="flex flex-col items-center justify-center min-h-screen px-6 md:px-20 py-20 text-center space-y-8">
        <div className="max-w-4xl space-y-6">
         <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            Discover Events. Join Clubs. Earn Certificates.
         </h1>
          <p className="text-2xl md:text-3xl text-gray-600">
            Discover, Join, & Manage College Events Easily
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
             <Link to="/Register">
            <button className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
              Get Started
            </button>
              </Link>
          </div>
           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
             <Link to="/Login">
            <button className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
              Login
            </button>
              </Link>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;