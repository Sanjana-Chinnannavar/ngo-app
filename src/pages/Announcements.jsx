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
  const [message, setMessage] = useState("");

  // 🔹 Fetch announcements (IMPORTANT FIX: res.data)
  const fetchAnnouncements = async () => {
    const res = await getAnnouncements();
    setAnnouncements(res.data); // ✅ FIX
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // 🔹 Admin only
  const openModal = () => {
    if (!isAdmin(user)) return;
    setMessage("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCreate = async () => {
    if (!isAdmin(user)) return;

    await createAnnouncement({ message });
    closeModal();
    fetchAnnouncements();
  };

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
      <div className="space-y-4">
        {Array.isArray(announcements) &&
          announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white p-5 rounded-lg shadow border"
            >
              <p className="text-gray-800">{a.message}</p>

              {/* ADMIN ONLY */}
              {isAdmin(user) && (
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:underline text-sm mt-2"
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

            <textarea
              className="w-full p-3 border rounded mb-4"
              rows="4"
              placeholder="Announcement message"
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
