import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAnnouncements } from "../api/announcements";

const Announcements = () => {
  const { token, user } = useContext(AuthContext);

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [posting, setPosting] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");

  const loadAnnouncements = async () => {
    try {
      const res = await getAnnouncements(token);

      if (Array.isArray(res)) {
        setAnnouncements(res);
      } else if (Array.isArray(res?.data)) {
        setAnnouncements(res.data);
      } else {
        setAnnouncements([]);
      }
    } catch (err) {
      console.error("Failed to load announcements", err);
      setAnnouncements([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handlePost = async () => {
    if (!title.trim() || !message.trim()) {
      alert("Title and message are required.");
      return;
    }

    setPosting(true);

    try {
      await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          message,
          category,
          postedBy: user?.name || "User",
        }),
      });

      // Reset form
      setTitle("");
      setMessage("");
      setCategory("general");
      setShowModal(false);

      loadAnnouncements();
    } catch (err) {
      alert("Failed to post announcement");
      console.error(err);
    }

    setPosting(false);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading announcements…</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight">
          Announcements
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#2A4D69] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A51]"
        >
          + Add Announcement
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">
        <div className="space-y-4">
          {announcements.length === 0 && (
            <p className="text-gray-500">No announcements available.</p>
          )}

          {announcements.map((entry) => (
            <div
              key={entry.id}
              className="
                bg-[#F7F9FB] p-4 rounded-lg 
                border border-[#4B86B4]/20 shadow-sm
                flex items-center
              "
            >
              {/* Date */}
              <div className="w-32 text-[#2A4D69] font-medium border-r border-[#4B86B4]/30 pr-4">
                {entry.createdAt
                  ? new Date(entry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "--"}
              </div>

              {/* Content */}
              <div className="pl-4 text-[#3E4C59]">
                <p className="font-medium">{entry.title}</p>
                <p>{entry.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Category: {entry.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-[#2A4D69] mb-4">
              New Announcement
            </h2>

            <input
              className="w-full mb-3 p-2 border rounded-md"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full mb-3 p-2 border rounded-md"
              rows={4}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <select
              className="w-full mb-4 p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="event">Event</option>
              <option value="important">Important</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handlePost}
                disabled={posting}
                className="px-4 py-2 rounded-md bg-[#2A4D69] text-white disabled:opacity-60"
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
