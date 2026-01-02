import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api/events";

const isAdmin = (user) => user?.role === "admin";

const Events = () => {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // 🔹 FETCH EVENTS (FIX: res.data)
  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res.data); // ✅ IMPORTANT
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 ADMIN ONLY: OPEN MODAL
  const openModal = (event = null) => {
    if (!isAdmin(user)) return;

    if (event) {
      setEditingEvent(event);
      setTitle(event.title);
      setDate(event.date);
      setLocation(event.location);
    } else {
      setEditingEvent(null);
      setTitle("");
      setDate("");
      setLocation("");
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
  };

  // 🔹 ADMIN ONLY: CREATE / UPDATE
  const handleSubmit = async () => {
    if (!isAdmin(user)) return;

    const payload = { title, date, location };

    if (editingEvent) {
      await updateEvent(editingEvent.id, payload);
    } else {
      await createEvent(payload);
    }

    closeModal();
    fetchEvents();
  };

  // 🔹 ADMIN ONLY: DELETE
  const handleDelete = async (id) => {
    if (!isAdmin(user)) return;

    await deleteEvent(id);
    fetchEvents();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">Events</h2>

      {/* ADMIN ONLY: ADD EVENT */}
      {isAdmin(user) && (
        <button
          onClick={() => openModal()}
          className="bg-[#2A4D69] text-white px-5 py-2 rounded-lg mb-6"
        >
          + Add Event
        </button>
      )}

      {/* EVENT LIST */}
      <div className="grid gap-6">
        {Array.isArray(events) &&
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow border"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>

              {/* ADMIN ONLY: EDIT / DELETE */}
              {isAdmin(user) && (
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
              )}
            </div>
          ))}
      </div>

      {/* ADMIN ONLY: MODAL */}
      {isAdmin(user) && modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h3>

            <input
              className="w-full p-3 border rounded mb-3"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="date"
              className="w-full p-3 border rounded mb-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              className="w-full p-3 border rounded mb-4"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#2A4D69] text-white rounded"
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
