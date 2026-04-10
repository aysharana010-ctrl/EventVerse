import React, { useState, useEffect, useRef } from "react";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AdminCertificates() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user?.clubId) return;
    api.getClubEvents(user.clubId)
      .then(setEvents)
      .catch(() => {});
  }, [user]);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Please select a file to upload." });
      return;
    }
    if (!selectedEventId) {
      setMessage({ type: "error", text: "Please select an event." });
      return;
    }
    if (!studentId.trim()) {
      setMessage({ type: "error", text: "Please enter a student ID." });
      return;
    }

    setUploading(true);
    setMessage(null);
    try {
      await api.uploadCertificate(selectedEventId, studentId.trim(), file);
      setMessage({ type: "success", text: "Certificate uploaded successfully!" });
      setStudentId("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl space-y-8">

        {/* Title */}
        <h1 className="text-3xl font-bold">Upload Certificates</h1>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold mb-4">Certificate Details</h2>

          {message && (
            <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">

            {/* Event */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Event</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                required
              >
                <option value="">Select event</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                ))}
              </select>
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Student ID (UUID)
              </label>
              <input
                type="text"
                placeholder="Student's user ID"
                className="w-full px-4 py-2 border rounded-lg"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter one student ID per upload. Repeat for multiple students.
              </p>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Upload File</label>

              <label className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 block">
                <p className="text-2xl mb-2">📤</p>
                <p className="text-sm text-gray-500">
                  {file ? file.name : "Click to upload file"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG (max 10MB)</p>
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setFile(e.target.files[0] || null)}
                />
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload & Distribute"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdminCertificates;
