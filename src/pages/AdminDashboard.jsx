import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getVolunteers } from "../api/volunteers";
import { getEvents } from "../api/events";
import { getAnnouncements } from "../api/announcements";
import { Users, Calendar, Megaphone, MapPin, Clock, Heart } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage your volunteer community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DashboardCard
            label="Total Volunteers"
            value={stats.volunteers}
            icon={<Users className="w-6 h-6 text-teal-500" />}
            index={0}
          />
          <DashboardCard
            label="Total Events"
            value={stats.events}
            icon={<Calendar className="w-6 h-6 text-teal-500" />}
            index={1}
          />
          <DashboardCard
            label="Announcements"
            value={stats.announcements}
            icon={<Megaphone className="w-6 h-6 text-teal-500" />}
            index={2}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>

          {upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Heart className="w-16 h-16 text-teal-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No upcoming events.</p>
              <p className="text-gray-400 mt-2">Create new events to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-teal-300 hover:-translate-y-1"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <style>{`
                    @keyframes fadeInUp {
                      from {
                        opacity: 0;
                        transform: translateY(20px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>

                  <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:h-1.5 transition-all duration-300"></div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300 mb-2">
                          {event.title}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-teal-50 border-l-4 border-teal-500 text-teal-800">
                          <Clock className="w-5 h-5 text-teal-500" />
                          <span className="capitalize">{event.status}</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                        <Heart className="w-6 h-6 text-teal-500" />
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <Calendar className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                      )}
                      {event.startTime && (
                        <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          <Clock className="w-5 h-5 text-teal-500 flex-shrink-0" />
                          <span className="font-medium">
                            {event.startTime}
                            {event.endTime && ` - ${event.endTime}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-gray-50 transition-all duration-300">
                    <span className="text-sm text-gray-600 font-medium">Event ID: {event.id}</span>
                    <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ label, value, icon, index }) => (
  <div
    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-teal-300 hover:-translate-y-1"
    style={{
      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
    }}
  >
    <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:h-1.5 transition-all duration-300"></div>
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
          {icon}
        </div>
        <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:animate-pulse"></div>
      </div>
      <div className="text-4xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
        {value}
      </div>
      <div className="text-gray-600 mt-2 font-medium">{label}</div>
    </div>
  </div>
);

export default AdminDashboard;
