import { useEffect, useState } from "react";
import { Calendar, MapPin, CheckCircle, Clock, AlertCircle, Heart, X } from "lucide-react";
const ASSIGNED_EVENTS_URL = "http://localhost:5000/events/assigned";
import { getAssignedEvents } from "../api/events";
import { useAuth } from "../context/AuthContext";
import { acceptEvent, rejectEvent } from "../api/events";

const VolunteerDashboard = () => {
  const { user, token } = useAuth();
  const [assignedEvents, setAssignedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
  try {
    setLoading(true);

    const res = await fetch(ASSIGNED_EVENTS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setAssignedEvents(data.data || []);
  } catch (err) {
    console.error("Failed to load dashboard", err);
  } finally {
    setLoading(false);
  }
};
const handleAccept = async (assignmentId) => {
  try {
    await acceptEvent(token, assignmentId);
    loadDashboard();
  } catch (err) {
    console.error("Accept failed", err);
  }
};

const handleReject = async (assignmentId) => {
  try {
    await rejectEvent(token, assignmentId);
    loadDashboard();
  } catch (err) {
    console.error("Reject failed", err);
  }
};



  useEffect(() => {
    loadDashboard();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-teal-500" />;
      case "upcoming":
        return <Clock className="w-5 h-5 text-teal-500" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Heart className="w-5 h-5 text-teal-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 border-l-4 border-green-500 text-green-800";
      case "upcoming":
        return "bg-teal-50 border-l-4 border-teal-500 text-teal-800";
      case "cancelled":
        return "bg-red-50 border-l-4 border-red-500 text-red-800";
      default:
        return "bg-blue-50 border-l-4 border-blue-500 text-blue-800";
    }
  };

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
            Welcome back!
          </h1>
          {user?.email && (
            <p className="text-teal-600 text-lg font-medium">{user.email}</p>
          )}
          <p className="text-gray-600 mt-2">Your volunteering journey continues here</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Opportunities</h2>

          {assignedEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Heart className="w-16 h-16 text-teal-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No events available at the moment.</p>
              <p className="text-gray-400 mt-2">Check back soon for exciting opportunities!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {assignedEvents.map((event, index) => (
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
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
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
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>

                    {event.status === "PENDING" && (
                      <div className="mt-6 space-y-4 pt-6 border-t border-gray-100">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAccept(event.assignmentId)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(event.assignmentId)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-300 hover:border-red-300"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
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

export default VolunteerDashboard;
