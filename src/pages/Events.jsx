import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  assignEvent,
} from "../api/events";
import { getVolunteers } from "../api/volunteers";
import { Plus, Calendar, MapPin, Users, Edit2, Trash2, X } from "lucide-react";

const isAdmin = (user) => user?.role === "admin";

const Events = () => {
  const { user, token } = useAuth();

  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState(0);

  const fetchEvents = async () => {
    const res = await getEvents(token);
    setEvents(res.data);
  };

  const fetchVolunteers = async () => {
    if (!isAdmin(user)) return;
    const res = await getVolunteers(token);
    setVolunteers(res);
  };

  useEffect(() => {
    fetchEvents();
    fetchVolunteers();
  }, []);

  const openModal = (event = null) => {
    if (!isAdmin(user)) return;

    if (event) {
      setEditingEvent(event);
      setTitle(event.title);
      setDescription(event.description || "");
      setDate(event.date);
      setStartTime(event.startTime);
      setEndTime(event.endTime || "");
      setLocation(event.location);
      setCoordinator(event.coordinator);
      setVolunteersNeeded(event.volunteersNeeded || 0);
    } else {
      setEditingEvent(null);
      setTitle("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setLocation("");
      setCoordinator("");
      setVolunteersNeeded(0);
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = async () => {
    if (!isAdmin(user)) return;

    const payload = {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      coordinator,
      volunteersNeeded,
    };

    if (editingEvent) {
      await updateEvent(token, editingEvent.id, payload);
    } else {
      await addEvent(token, payload);
    }

    closeModal();
    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (!isAdmin(user)) return;
    await deleteEvent(token, id);
    fetchEvents();
  };

  const handleAssign = async (eventId) => {
    const volunteerId = selectedVolunteer[eventId];
    if (!volunteerId) {
      alert("Select a volunteer first");
      return;
    }

    try {
      await assignEvent(token, eventId, volunteerId);
      alert("Volunteer assigned");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Events
          </h1>
          <p className="text-gray-600 mt-2">{isAdmin(user) ? "Manage and explore all events" : "Explore all events"}</p>
        </div>

        {isAdmin(user) && (
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        )}

        <div className="grid gap-6">
          {events.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Calendar className="w-16 h-16 text-teal-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No events yet.</p>
              <p className="text-gray-400 mt-2">Create your first event to get started!</p>
            </div>
          ) : (
            events.map((event, index) => (
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
                      {event.description && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                      <Calendar className="w-6 h-6 text-teal-500" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      <Calendar className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span className="font-medium">{event.date}</span>
                      {event.startTime && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="font-medium">
                            {event.startTime}
                            {event.endTime && ` - ${event.endTime}`}
                          </span>
                        </>
                      )}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      <Users className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span className="font-medium">
                        Volunteers Needed: {event.volunteersNeeded}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      <span className="font-medium text-gray-900">Coordinator:</span> {event.coordinator}
                    </div>
                  </div>

                  {isAdmin(user) && (
                    <div className="mt-6 space-y-4 pt-6 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <select
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300 text-gray-700 bg-white"
                          value={selectedVolunteer[event.id] || ""}
                          onChange={(e) =>
                            setSelectedVolunteer((prev) => ({
                              ...prev,
                              [event.id]: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select a volunteer...</option>
                          {volunteers.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleAssign(event.id)}
                          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          Assign
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(event)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-teal-200 text-teal-600 hover:bg-teal-50 rounded-lg font-semibold transition-all duration-300 hover:border-teal-300"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-300 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
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
      </div>

      {isAdmin(user) && modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Event Description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Event Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Coordinator</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Coordinator Name"
                    value={coordinator}
                    onChange={(e) => setCoordinator(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Volunteers Needed</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="0"
                    value={volunteersNeeded}
                    onChange={(e) =>
                      setVolunteersNeeded(Number(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {editingEvent ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
