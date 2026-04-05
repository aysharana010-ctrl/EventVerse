import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        
      {/* Login Card */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-center">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
              <div className="text-right mt-2">
              <a
                href="/forgot-password"
                className="text-blue-700 hover:underline text-sm"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-700 hover:underline">
            Sign Up
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;
