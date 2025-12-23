import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getEvents } from "../api/events";
import { getAnnouncements } from "../api/announcements";

const VolunteerDashboard = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [assignedEvents, setAssignedEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reject modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const loadDashboard = async () => {
    try {
      const eventsRes = await getEvents(token);
      const events = eventsRes.data;

      const annsRes = await getAnnouncements(token);
      const ann = annsRes.data;

      const formatted = events.map((e) => ({
        ...e,
        participationStatus: "pending",
      }));

      setAssignedEvents(formatted.slice(0, 3));
      setAnnouncements(ann);
    } catch (err) {
      alert("Failed to load volunteer dashboard");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleAccept = (eventId) => {
    setAssignedEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, participationStatus: "accepted" }
          : event
      )
    );
  };

  const openRejectModal = (event) => {
    setSelectedEvent(event);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    setAssignedEvents((prev) =>
      prev.filter((event) => event.id !== selectedEvent.id)
    );

    setShowRejectModal(false);
    setSelectedEvent(null);
    setRejectReason("");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard…</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
        Volunteer Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-8 border border-[#4B86B4]/20">

        {/* Assigned Events */}
        <section>
          <h2 className="text-xl font-semibold text-[#2A4D69] mb-3">
            Assigned Events
          </h2>

          {assignedEvents.length === 0 && (
            <p className="text-gray-500">No assigned events.</p>
          )}

          <div className="space-y-3">
            {assignedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#F7F9FB] p-4 rounded-lg border border-[#4B86B4]/20 shadow-sm"
              >
                <h3 className="font-medium text-[#2A4D69] text-lg">
                  {event.title}
                </h3>

                <p className="text-[#3E4C59] mt-1">📅 {event.date}</p>

                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span className="font-medium text-yellow-600">
                    {event.participationStatus}
                  </span>
                </p>

                {event.participationStatus === "pending" && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleAccept(event.id)}
                      className="px-4 py-1.5 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => openRejectModal(event)}
                      className="px-4 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-[#2A4D69]">
              Announcements
            </h2>

            <button
              onClick={() => navigate("/announcements")}
              className="text-sm text-[#4B86B4] font-medium hover:underline"
            >
              View all →
            </button>
          </div>

          <ul className="space-y-3">
            {announcements.map((msg) => (
              <li
                key={msg.id}
                className="bg-[#F7F9FB] p-4 rounded-lg border border-[#4B86B4]/20 shadow-sm text-[#3E4C59]"
              >
                {msg.message}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-[#2A4D69] mb-3">
              Reject Event
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Please provide a reason for rejecting{" "}
              <span className="font-medium">{selectedEvent?.title}</span>.
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B86B4]"
              rows={3}
              placeholder="Enter reason..."
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-1.5 rounded-md bg-gray-200 text-sm hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={confirmReject}
                className="px-4 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
