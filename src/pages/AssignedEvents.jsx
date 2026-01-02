import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAssignedEvents,
  acceptEvent,
  rejectEvent,
} from "../api/events";

const isVolunteer = (user) => user?.role === "volunteer";

const AssignedEvents = () => {
  const { user } = useAuth();

  const [assignedEvents, setAssignedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch assigned events (authoritative source)
  const fetchAssignedEvents = async () => {
    setLoading(true);
    const data = await getAssignedEvents();
    setAssignedEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignedEvents();
  }, []);

  // 🔹 Accept (volunteer only)
  const handleAccept = async (eventId) => {
    if (!isVolunteer(user)) return;

    await acceptEvent(eventId);
    fetchAssignedEvents(); // 🔑 re-sync state
  };

  // 🔹 Reject (volunteer only)
  const handleReject = async (eventId) => {
    if (!isVolunteer(user)) return;

    await rejectEvent(eventId);
    fetchAssignedEvents(); // 🔑 re-sync state
  };

  if (loading) {
    return <p className="p-6">Loading assigned events…</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Assigned Events</h2>

      {assignedEvents.length === 0 ? (
        <p className="text-gray-600">No assigned events.</p>
      ) : (
        <div className="space-y-5">
          {assignedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-5 rounded-lg shadow border"
            >
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
              <p className="mt-2 text-sm text-gray-700">
                Status: <strong>{event.status}</strong>
              </p>

              {/* VOLUNTEER-ONLY WORKFLOW */}
              {isVolunteer(user) && event.status === "PENDING" && (
                <div className="mt-4 space-x-4">
                  <button
                    onClick={() => handleAccept(event.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(event.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedEvents;
