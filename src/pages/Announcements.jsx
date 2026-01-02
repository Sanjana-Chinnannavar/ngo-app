import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../api/announcements";

const isAdmin = (user) => user?.role === "admin";

const Announcements = () => {
  const { user } = useAuth();

  const [announcements, setAnnouncements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // REQUIRED FIELDS
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Fetch announcements
  const fetchAnnouncements = async () => {
    const res = await getAnnouncements();
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // 🔹 Admin only
  const openModal = () => {
    if (!isAdmin(user)) return;
    setTitle("");
    setMessage("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 🔹 Create announcement
  const handleCreate = async () => {
    if (!isAdmin(user)) return;

    const payload = {
      title,
      message,
    };

    await createAnnouncement(payload);
    closeModal();
    fetchAnnouncements();
  };

  // 🔹 Delete announcement
  const handleDelete = async (id) => {
    if (!isAdmin(user)) return;

    await deleteAnnouncement(id);
    fetchAnnouncements();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Announcements</h2>

      {/* ADMIN ONLY */}
      {isAdmin(user) && (
        <button
          onClick={openModal}
          className="bg-[#2A4D69] text-white px-5 py-2 rounded-lg mb-6"
        >
          + Add Announcement
        </button>
      )}

      {/* LIST */}
      <div className="space-y-5">
        {Array.isArray(announcements) &&
          announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white p-5 rounded-lg shadow border"
            >
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="text-gray-700 mt-1">{a.message}</p>

              {isAdmin(user) && (
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:underline text-sm mt-3"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>

      {/* ADMIN MODAL */}
      {isAdmin(user) && modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Add Announcement
            </h3>

            <input
              className="w-full p-3 border rounded mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full p-3 border rounded mb-4"
              rows="4"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-[#2A4D69] text-white rounded"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
