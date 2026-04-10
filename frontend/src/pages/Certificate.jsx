import React from "react";
import { Link } from "react-router-dom";
function Certificates() {

  const certificates = [
    {
      id: 1,
      title: "Hackathon 2.0 - Participation",
      event: "Hackathon 2.0",
      date: "Mar 2026",
      type: "Participation",
    },
    {
      id: 2,
      title: "Tech Fest - 1st Place",
      event: "Tech Fest 2025",
      date: "Nov 2025",
      type: "Winner",
    },
    {
      id: 3,
      title: "AI Workshop - Completion",
      event: "AI/ML Workshop",
      date: "Sep 2025",
      type: "Completion",
    },
    {
      id: 4,
      title: "Coding Club - Active Member",
      event: "Coding Club",
      date: "2025",
      type: "Membership",
    },
  ];

  function handleDownload() {
    alert("Download started");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-3xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            My Certificates
          </h1>
          <p className="text-gray-500">
            Download and share your achievements
          </p>
        </div>

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
                <p className="font-semibold">
                  {cert.title}
                </p>
                <p className="text-sm text-gray-500">
                  {cert.event} · {cert.date}
                </p>
              </div>

              {/* Type */}
              <span className="border px-3 py-1 rounded text-sm">
                {cert.type}
              </span>

              {/* Button */}
              <button
                onClick={handleDownload}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Download
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Certificates;