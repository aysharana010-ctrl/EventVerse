import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Certificates() {
  const { user } = useAuth();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    api.getStudentCertificates(user.id)
      .then(setCertificates)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-3xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-gray-500">Download and share your achievements</p>
        </div>

        {loading && <p className="text-gray-500">Loading certificates...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && certificates.length === 0 && (
          <p className="text-gray-500">No certificates yet.</p>
        )}

        {/* Certificates List */}
        <div className="space-y-4">

          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4"
            >

              {/* Icon */}
              <div className="p-3 bg-gray-200 rounded-xl text-xl">
                🏅
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold">{cert.title}</p>
                <p className="text-sm text-gray-500">
                  {cert.event_name}
                  {cert.club_name ? ` · ${cert.club_name}` : ""}
                  {cert.issue_date ? ` · ${new Date(cert.issue_date).toLocaleDateString()}` : ""}
                </p>
              </div>

              {/* Button */}
              {cert.file_url ? (
                <a
                  href={cert.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Download
                </a>
              ) : (
                <span className="text-sm text-gray-400">Unavailable</span>
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Certificates;
