import { useEffect, useState } from "react";
import { getEvents } from "../api/events";
import { useAuth } from "../context/AuthContext";

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      // ✅ DO NOT mutate or fake status
      setEvents(res.data.slice(0, 3)); // show latest 3
    } catch (err) {
      console.error("Failed to load dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard…</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">
        Welcome{user?.email ? `, ${user.email}` : ""}
      </h1>

      <h2 className="text-xl font-semibold mb-4">Recent Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-600">No events available.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>

              <p className="mt-2 text-sm">
                Status:{" "}
                <span className="font-medium capitalize">
                  {event.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
