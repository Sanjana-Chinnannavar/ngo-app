import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getVolunteers } from "../api/volunteers";
import { getEvents } from "../api/events";
import { getAnnouncements } from "../api/announcements"; // we will create this

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState({
    volunteers: 0,
    events: 0,
    announcements: 0,
  });

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const volunteers = await getVolunteers(token);
      const eventsRes = await getEvents(token);
      const events = eventsRes.data;

      let announcements = [];
      try {
        const ann = await getAnnouncements(token);
        announcements = ann.data || [];
      } catch {}

      const upcoming = events.filter((e) => e.status === "upcoming");

      setStats({
        volunteers: volunteers.length,
        events: events.length,
        announcements: announcements.length,
      });

      setUpcomingEvents(upcoming);
    } catch (err) {
      console.error(err);
      alert("Failed to load admin dashboard");
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
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard label="Total Volunteers" value={stats.volunteers} />
        <DashboardCard label="Total Events" value={stats.events} />
        <DashboardCard label="Announcements" value={stats.announcements} />
      </div>

      {/* Upcoming Events */}
      <h2 className="text-xl font-semibold text-[#2A4D69] mb-3">
        Upcoming Events
      </h2>

      <div className="space-y-4">
        {upcomingEvents.length === 0 && (
          <p className="text-gray-500">No upcoming events.</p>
        )}

        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#F7F9FB] p-4 rounded-xl border border-[#4B86B4]/20 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-[#2A4D69]">
              {event.title}
            </h3>
            <p className="text-[#3E4C59] mt-1">
              📅 {event.date} • 🕒 {event.startTime}
              {event.endTime && ` - ${event.endTime}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardCard = ({ label, value }) => (
  <div className="bg-[#2A4D69] p-6 rounded-xl shadow-md flex flex-col items-center text-white">
    <div className="text-4xl font-bold">{value}</div>
    <div className="text-sm mt-2">{label}</div>
  </div>
);

export default AdminDashboard;
