import { useState } from "react";

const Events = () => {
  const mockEvents = [
    { title: "Tree Plantation Drive", date: "Jan 20, 2025", volunteersNeeded: 10 },
    { title: "Food Donation Camp", date: "Jan 26, 2025", volunteersNeeded: 5 },
    { title: "Clothes Distribution", date: "Feb 2, 2025", volunteersNeeded: 8 },
  ];

  const [events, setEvents] = useState(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    volunteersNeeded: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({ title: "", date: "", volunteersNeeded: "" });
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setEvents([...events, formData]);
    closeModal();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
        Events
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">

        {/* Create Event Button */}
        <button
          onClick={openModal}
          className="
            mb-6 px-5 py-2 rounded-lg 
            bg-[#245629] text-white 
            hover:bg-[#1E3A51] transition 
            font-grotesk text-base tracking-wide
          "
        >
          + Create Event
        </button>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <div
              key={i}
              className="
                bg-[#F7F9FB] p-6 rounded-xl shadow-sm 
                border border-[#4B86B4]/20
              "
            >
              <h3 className="font-semibold text-xl text-[#2A4D69] tracking-tight">
                {event.title}
              </h3>

              <p className="text-[#3E4C59] mt-1">📅 {event.date}</p>
              <p className="text-[#3E4C59]">👥 Needed: {event.volunteersNeeded}</p>

              <button
                className="
                  mt-4 px-4 py-2 rounded-lg 
                  bg-[#2A4D69] text-white 
                  hover:bg-[#1E3A51] transition 
                  font-grotesk text-base tracking-wide
                "
              >
                Assign Volunteers
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ✨ CREATE EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl border border-[#4B86B4]/20 font-grotesk">

            <h2 className="text-xl font-semibold text-[#2A4D69] mb-4 tracking-tight">
              Create Event
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-[#3E4C59] mb-1">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

              <div>
                <label className="block text-[#3E4C59] mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

              <div>
                <label className="block text-[#3E4C59] mb-1">Volunteers Needed</label>
                <input
                  type="number"
                  value={formData.volunteersNeeded}
                  onChange={(e) =>
                    setFormData({ ...formData, volunteersNeeded: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="
                  px-4 py-2 rounded-lg 
                  border border-[#2A4D69] text-[#2A4D69] 
                  hover:bg-[#E7EEF3]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="
                  px-4 py-2 rounded-lg 
                  bg-[#2A4D69] text-white 
                  hover:bg-[#1E3A51]
                "
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
