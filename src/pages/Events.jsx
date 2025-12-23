import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../api/events";

const Events = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    coordinator: "",
    volunteersNeeded: "",
    description: "",
    status: "upcoming",
  });

  // Load events
  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await getEvents();
      const data = Array.isArray(res) ? res : res?.data || [];
      setEvents(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load events.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Open modal
  const openModal = (event = null) => {
    setEditingEvent(event);

    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime || "",
        location: event.location,
        coordinator: event.coordinator,
        volunteersNeeded: event.volunteersNeeded,
        description: event.description || "",
        status: event.status,
      });
    } else {
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        coordinator: "",
        volunteersNeeded: "",
        description: "",
        status: "upcoming",
      });
    }

    setModalOpen(true);
  };

  // Save event
  const handleSave = async () => {
    try {
      if (!token) {
        alert("You must be logged in to add events.");
        return;
      }

      if (editingEvent) {
        await updateEvent(token, editingEvent.id, formData);
      } else {
        await addEvent(token, formData);
      }

      setModalOpen(false);
      await loadEvents();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save event.");
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(token, id);
      await loadEvents();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete event.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading events…</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#2A4D69] mb-6">
        Events
      </h1>

      {/* 🔥 BUTTON ALWAYS SHOWN */}
      <button
        className="bg-[#2A4D69] text-white px-5 py-2 rounded-lg mb-6"
        onClick={() => openModal()}
      >
        + Add Event
      </button>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#F7F9FB] p-5 rounded-xl border border-[#4B86B4]/20 shadow-sm"
          >
            <h3 className="text-xl text-[#2A4D69] font-semibold">
              {event.title}
            </h3>

            <p className="text-[#3E4C59] mt-1">
              📅 {event.date} • 🕒 {event.startTime}
              {event.endTime && ` - ${event.endTime}`}
            </p>

            <p className="text-[#3E4C59]">📍 {event.location}</p>
            <p className="text-[#3E4C59]">
              👤 Coordinator: {event.coordinator}
            </p>
            <p className="text-[#3E4C59]">
              👥 Volunteers Needed: {event.volunteersNeeded}
            </p>

            {event.description && (
              <p className="text-[#3E4C59] mt-2 italic text-sm">
                {event.description}
              </p>
            )}

            {/* delete/edit still available */}
            <div className="mt-4 space-x-4">
              <button
                onClick={() => openModal(event)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
            <h2 className="text-2xl font-semibold">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>

            {[
              ["title", "Title"],
              ["date", "Date", "date"],
              ["startTime", "Start Time", "time"],
              ["endTime", "End Time (optional)", "time"],
              ["location", "Location"],
              ["coordinator", "Coordinator"],
              ["volunteersNeeded", "Volunteers Needed", "number"],
            ].map(([key, label, type = "text"]) => (
              <input
                key={key}
                type={type}
                placeholder={label}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
            ))}

            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
              rows={3}
            />

            <div className="flex justify-end space-x-4">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button
                onClick={handleSave}
                className="bg-[#2A4D69] text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
