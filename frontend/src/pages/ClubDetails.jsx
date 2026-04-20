import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ClubDetails() {
  const [searchParams] = useSearchParams();
  const clubId = searchParams.get("id");
  const { user } = useAuth();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(type, text) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    if (!clubId) {
      setLoading(false);
      setError("No club selected.");
      return;
    }
    api.getClubById(clubId)
      .then(setClub)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [clubId]);

  async function handleJoin() {
    setJoining(true);
    try {
      await api.joinClub(clubId);
      setIsMember(true);
      showToast("success", "You've joined the club!");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setJoining(false);
    }
  }

  async function handleLeave() {
    setLeaving(true);
    try {
      await api.leaveClub(clubId);
      setIsMember(false);
      showToast("success", "You've left the club.");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setLeaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-sm shadow-lg ${toast.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {toast.text}
        </div>
      )}

      <div className="w-full max-w-3xl space-y-8">

        {/* Back Link */}
        <a href="/clubs" className="text-sm text-gray-500 hover:text-black">
          ← Back to Clubs
        </a>

        {loading && <p className="text-gray-500">Loading club details...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {club && (
          <>
            {/* Club Info */}
            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">

              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{club.name}</h1>
                {club.category && (
                  <span className="text-sm bg-gray-200 px-3 py-1 rounded">
                    {club.category}
                  </span>
                )}
              </div>

              <p className="text-gray-500">{club.description}</p>

              {/* Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>👥 {club.members?.length ?? 0} Members</span>
                {club.club_head_name && <span>🎓 Head: {club.club_head_name}</span>}
                {club.max_participants && <span>🔢 Max: {club.max_participants}</span>}
              </div>

              {/* Join / Leave Button — students only */}
              {user?.role === "student" && (
                isMember ? (
                  <button
                    onClick={handleLeave}
                    disabled={leaving}
                    className="border border-red-400 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition disabled:opacity-60"
                  >
                    {leaving ? "Leaving..." : "Leave Club"}
                  </button>
                ) : (
                  <button
                    onClick={handleJoin}
                    disabled={joining}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                  >
                    {joining ? "Joining..." : "Join This Club"}
                  </button>
                )
              )}

            </div>

            {/* Upcoming Activities */}
            {club.upcoming_events && club.upcoming_events.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Upcoming Activities</h2>
                {club.upcoming_events.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-gray-500">
                        {activity.starts_at ? new Date(activity.starts_at).toLocaleDateString() : "TBD"}
                        {activity.venue ? ` · ${activity.venue}` : ""}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Upcoming</span>
                  </div>
                ))}
              </div>
            )}

            {club.upcoming_events && club.upcoming_events.length === 0 && (
              <p className="text-gray-500 text-sm">No upcoming activities.</p>
            )}
          </>
        )}

      </div>

    </div>
  );
}

export default ClubDetails;
