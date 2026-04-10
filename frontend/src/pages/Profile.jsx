import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, setUser } = useAuth();

  const [tab, setTab] = useState("profile"); // "profile" | "events" | "clubs" | "certificates"

  // Profile edit state
  const [form, setForm] = useState({ name: "", department: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  // Tab data
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [tabError, setTabError] = useState(null);

  // Populate form when user loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        department: user.department || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Load tab data on tab change
  useEffect(() => {
    if (!user) return;
    if (tab === "profile") return;

    setTabLoading(true);
    setTabError(null);

    const fetch =
      tab === "events"
        ? api.getStudentEvents(user.id)
        : tab === "clubs"
        ? api.getStudentClubs(user.id)
        : api.getStudentCertificates(user.id);

    fetch
      .then((data) => {
        if (tab === "events") setEvents(data);
        else if (tab === "clubs") setClubs(data);
        else setCertificates(data);
      })
      .catch((err) => setTabError(err.message))
      .finally(() => setTabLoading(false));
  }, [tab, user]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);
    try {
      const updated = await api.updateStudent(user.id, {
        name: form.name,
        department: form.department || undefined,
        phone: form.phone || undefined,
      });
      setUser((prev) => ({ ...prev, ...updated }));
      setSaveMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setSaveMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10">

      <div className="w-full max-w-2xl space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 flex-wrap">
          {["profile", "events", "clubs", "certificates"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm capitalize border transition ${
                tab === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Profile Edit Tab */}
        {tab === "profile" && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            {saveMessage && (
              <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${saveMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {saveMessage.text}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Role</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500"
                    value={user.role === "club_head" ? "Club Head" : "Student"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">College Email</label>
                <input
                  type="email"
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500"
                  value={user.email}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">Department</label>
                <select
                  name="department"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                  <option>Business Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </form>
          </div>
        )}

        {/* Events Tab */}
        {tab === "events" && (
          <div className="space-y-3">
            {tabLoading && <p className="text-gray-500">Loading events...</p>}
            {tabError && <p className="text-red-600">{tabError}</p>}
            {!tabLoading && !tabError && events.length === 0 && (
              <p className="text-gray-500">No events registered yet.</p>
            )}
            {events.map((ev) => (
              <div key={ev.id} className="bg-white p-4 rounded-xl shadow-sm">
                <p className="font-medium">{ev.name}</p>
                <p className="text-sm text-gray-500">
                  {ev.starts_at ? new Date(ev.starts_at).toLocaleDateString() : "TBD"}
                  {ev.venue ? ` · ${ev.venue}` : ""}
                  {ev.club_name ? ` · ${ev.club_name}` : ""}
                </p>
                {ev.attended !== null && (
                  <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${ev.attended ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {ev.attended ? "Attended" : "Registered"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Clubs Tab */}
        {tab === "clubs" && (
          <div className="space-y-3">
            {tabLoading && <p className="text-gray-500">Loading clubs...</p>}
            {tabError && <p className="text-red-600">{tabError}</p>}
            {!tabLoading && !tabError && clubs.length === 0 && (
              <p className="text-gray-500">Not a member of any clubs yet.</p>
            )}
            {clubs.map((club) => (
              <div key={club.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-medium">{club.name}</p>
                  <p className="text-sm text-gray-500">{club.description}</p>
                </div>
                <span className="text-xs text-gray-400">
                  Joined {club.joined_at ? new Date(club.joined_at).toLocaleDateString() : ""}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certificates Tab */}
        {tab === "certificates" && (
          <div className="space-y-3">
            {tabLoading && <p className="text-gray-500">Loading certificates...</p>}
            {tabError && <p className="text-red-600">{tabError}</p>}
            {!tabLoading && !tabError && certificates.length === 0 && (
              <p className="text-gray-500">No certificates yet.</p>
            )}
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between gap-4">
                <div className="p-3 bg-gray-200 rounded-xl text-xl">🏅</div>
                <div className="flex-1">
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm text-gray-500">
                    {cert.event_name}
                    {cert.club_name ? ` · ${cert.club_name}` : ""}
                    {cert.issue_date ? ` · ${new Date(cert.issue_date).toLocaleDateString()}` : ""}
                  </p>
                </div>
                {cert.file_url && (
                  <a
                    href={cert.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Download
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Profile;
