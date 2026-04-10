import React, { useState } from "react";
import * as api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await api.forgotPassword(email);
      setMessage({ type: "success", text: "If an account with that email exists, a reset link has been sent." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-center">
          Forgot Password
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-blue-700 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
