import React from "react";
import { Link } from "react-router-dom";    
function AdminCertificates() {

  function handleUpload(e) {
    e.preventDefault();
    alert("Certificates uploaded successfully!");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl space-y-8">

        {/* Title */}
        <h1 className="text-3xl font-bold">
          Upload Certificates
        </h1>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Certificate Details
          </h2>

          <form onSubmit={handleUpload} className="space-y-4">

            {/* Event */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Event
              </label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>Select event</option>
                <option>Tech Fest 2026</option>
                <option>Hackathon 3.0</option>
                <option>Cultural Night</option>
              </select>
            </div>

            {/* Certificate Type */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Certificate Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>Select type</option>
                <option>Participation</option>
                <option>Winner</option>
                <option>Completion</option>
              </select>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Upload File
              </label>

              <label className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 block">
                <p className="text-2xl mb-2">📤</p>
                <p className="text-sm text-gray-500">
                  Click to upload file
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, PNG, JPG (max 10MB)
                </p>

                <input type="file" className="hidden" />
              </label>
            </div>

            {/* Student IDs */}
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Recipient Student IDs
              </label>
              <input
                placeholder="STU2026001, STU2026002, ..."
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-1">
                Comma-separated student IDs
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Upload & Distribute
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdminCertificates;