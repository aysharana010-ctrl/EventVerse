import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const name = `${form.firstName} ${form.lastName}`.trim();
      const { token, user } = await api.register(
        name,
        form.email,
        form.password,
        form.department || undefined,
        undefined, // year — no field in this form
        undefined  // phone — no field in this form
      );
      api.setToken(token);
      setUser(user);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* Card */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-lg">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-6 text-center">
          Student Registration
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        {error && (
          <div className="mb-4 px-4 py-2 rounded-lg text-sm bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">College Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@university.edu"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Student ID — no API equivalent, kept as UI placeholder */}
          {/* TODO: wire to a student ID field once backend supports it */}
          <div>
            <label className="block text-gray-700 mb-2">Student ID</label>
            <input
              type="text"
              placeholder="STU2026001"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 mb-2">Department</label>
            <select
              name="department"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select department</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Business Admin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
