import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirm) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      await api.resetPassword(token, newPassword);
      setMessage({ type: "success", text: "Password reset successfully. Redirecting to login..." });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-center">
          Reset Password
        </h1>

        {message && (
          <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!token && (
            <div>
              <label className="block text-gray-700 mb-2">Reset Token</label>
              <input
                type="text"
                placeholder="Paste your reset token here"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={token}
                readOnly
              />
              <p className="text-xs text-gray-400 mt-1">Token is read from the URL. Use the link sent to your email.</p>
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
