import { useState } from "react";

const Announcements = () => {
  const [input, setInput] = useState("");

  const mockAnnouncements = [
    "Meeting at 5 PM today.",
    "Submit your availability form.",
    "New event added: Clothing Drive.",
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Announcements</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Create announcement box */}
        <div className="flex gap-4 mb-6">
          <input
            className="flex-1 p-3 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Write a new announcement..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Post
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {mockAnnouncements.map((msg, i) => (
            <div
              key={i}
              className="bg-gray-50 p-4 rounded-lg border shadow-sm"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
