import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEvents } from "../api/events";
import { getAnnouncements } from "../api/announcements";

const VolunteerDashboard = () => {
  const { token, user } = useContext(AuthContext);

  const [assignedEvents, setAssignedEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const eventsRes = await getEvents(token);
      const events = eventsRes.data;

      const annsRes = await getAnnouncements(token);
      const ann = annsRes.data;

      // Temporary logic: show events coordinated by this volunteer
      const filtered = events.filter(
        (e) =>
          e.coordinator?.toLowerCase() === user?.role?.toLowerCase() ||
          true // until assignment system added
      );

      setAssignedEvents(filtered.slice(0, 3)); // show only first 3 for clean UI
      setAnnouncements(ann);
    } catch (err) {
      alert("Failed to load volunteer dashboard");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard…</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
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
              </div>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h2 className="text-xl font-semibold text-[#2A4D69] mb-3">
            Announcements
          </h2>

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
    </div>
  );
};

export default VolunteerDashboard;
