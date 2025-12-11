import { useState } from "react";

const Volunteers = () => {
  const mockVolunteers = [
    { name: "Alex Johnson", skills: "First Aid", availability: "Weekends" },
    { name: "Sanjana Chinnanavar", skills: "Teaching", availability: "Weekdays" },
    { name: "Riya Sharma", skills: "Event Management", availability: "Flexible" },
  ];

  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [formData, setFormData] = useState({ name: "", skills: "", availability: "" });

  const openModal = (vol) => {
    setSelectedVolunteer(vol);
    setFormData(vol);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVolunteer(null);
  };

  const handleSave = () => {
    const updated = volunteers.map((v) =>
      v.name === selectedVolunteer.name ? formData : v
    );
    setVolunteers(updated);
    closeModal();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
        Volunteers
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-grotesk">
            <thead>
              <tr className="bg-[#4B86B4]/20 text-[#2A4D69] text-[15px]">
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Name</th>
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Skills</th>
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Availability</th>
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Actions</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((v, i) => (
                <tr
                  key={i}
                  className="border-b border-[#4B86B4]/20 hover:bg-[#F7F9FB] transition"
                >
                  <td className="p-3 text-base text-[#1F2933]">{v.name}</td>
                  <td className="p-3 text-base text-[#3E4C59]">{v.skills}</td>
                  <td className="p-3 text-base text-[#3E4C59]">{v.availability}</td>

                  <td className="p-3">
                    <button
                      onClick={() => openModal(v)}
                      className="
                        bg-[#2A4D69] text-white px-3 py-1 rounded 
                        hover:bg-[#1E3A51] transition 
                        font-grotesk text-sm tracking-wide
                      "
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ✨ EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl border border-[#4B86B4]/20 font-grotesk">
            <h2 className="text-xl font-semibold text-[#2A4D69] mb-4 tracking-tight">
              Edit Volunteer
            </h2>

            {/* Inputs */}
            <div className="space-y-4">

              <div>
                <label className="block text-[#3E4C59] mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

              <div>
                <label className="block text-[#3E4C59] mb-1">Skills</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

              <div>
                <label className="block text-[#3E4C59] mb-1">Availability</label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-[#2A4D69] text-[#2A4D69] hover:bg-[#E7EEF3]"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-[#2A4D69] text-white hover:bg-[#1E3A51]"
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

export default Volunteers;
