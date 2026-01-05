import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAssignedEvents,
  acceptEvent,
  rejectEvent,
} from "../api/events";
import { Calendar, MapPin, Clock, CheckCircle, XCircle, Inbox } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { RejectionModal } from "../components/RejectionModal";

const isVolunteer = (user) => user?.role === "volunteer";

const AssignedEvents = () => {
  const { user, token } = useAuth();
  const { toast } = useToast();

  const [assignedEvents, setAssignedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rejection Modal State
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(false);

  const fetchAssignedEvents = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/events/assigned", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setAssignedEvents(data.data || []);
    setLoading(false);
  };




  useEffect(() => {
    fetchAssignedEvents();
  }, []);

  const handleAccept = async (eventId) => {
    if (!isVolunteer(user)) return;

    try {
      await acceptEvent(token, eventId);
      toast.success("Event accepted!");
      fetchAssignedEvents();
    } catch (err) {
      toast.error("Failed to accept event");
    }
  };

  const openRejectModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedEventId(null);
  };

  const handleConfirmReject = async (reason) => {
    if (!selectedEventId) return;
    setRejectLoading(true);

    try {
      await rejectEvent(token, selectedEventId, reason);
      toast.success("Event rejected successfully");
      fetchAssignedEvents();
      closeRejectModal();
    } catch (err) {
      toast.error(err.message || "Failed to reject event");
    } finally {
      setRejectLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading assigned events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assigned Events
          </h1>
          <p className="text-gray-600 mt-2">Events assigned to you for participation</p>
        </div>

        <div className="grid gap-6">
          {assignedEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Inbox className="w-16 h-16 text-teal-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No assigned events.</p>
              <p className="text-gray-400 mt-2">Events will appear here when assigned to you!</p>
            </div>
          ) : (
            assignedEvents.map((event, index) => (
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
                      <Calendar className="w-6 h-6 text-teal-500" />
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

                  {isVolunteer(user) && event.assignmentStatus === "PENDING" && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(event.assignmentId)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => openRejectModal(event.assignmentId)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-300 hover:border-red-300"
                        >
                          <XCircle className="w-4 h-4" />
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
            ))
          )}
        </div>

        <RejectionModal
          isOpen={isRejectModalOpen}
          onClose={closeRejectModal}
          onConfirm={handleConfirmReject}
          loading={rejectLoading}
        />
      </div>
    </div>
  );
};

export default AssignedEvents;
