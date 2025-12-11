import { useState } from "react";

const Announcements = () => {
  const [input, setInput] = useState("");

  // Each announcement now has: { text, date }
  const [announcements, setAnnouncements] = useState([
    { text: "Meeting at 5 PM today.", date: "Jan 10, 2025" },
    { text: "Submit your availability form.", date: "Jan 9, 2025" },
    { text: "New event added: Clothing Drive.", date: "Jan 8, 2025" },
  ]);

  const handlePost = () => {
    if (!input.trim()) return;

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newEntry = { text: input, date: today };

    setAnnouncements([newEntry, ...announcements]);
    setInput("");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      
      <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
        Announcements
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">

        {/* Create Announcement */}
        <div className="flex gap-4 mb-6">
          <input
            className="
              flex-1 p-3 border rounded-lg font-grotesk 
              focus:ring focus:ring-[#4B86B4]/30
            "
            placeholder="Write a new announcement..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={handlePost}
            className="
              bg-[#2A4D69] text-white px-5 py-2 rounded-lg 
              hover:bg-[#1E3A51] transition 
              font-grotesk text-base tracking-wide
            "
          >
            Post
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((entry, i) => (
            <div
              key={i}
              className="
                bg-[#F7F9FB] p-4 rounded-lg 
                border border-[#4B86B4]/20 shadow-sm
                flex items-center font-grotesk
              "
            >
              {/* Date Column */}
              <div className="
                w-32 text-[#2A4D69] font-medium 
                border-r border-[#4B86B4]/30 pr-4
              ">
                {entry.date}
              </div>

              {/* Announcement Text */}
              <div className="pl-4 text-[#3E4C59]">
                {entry.text}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Announcements;
