import { useState } from "react";

const Volunteers = () => {
  const mockVolunteers = [
    { name: "Alex Johnson", skills: "First Aid", availability: "Weekends" },
    { name: "Sanjana Chinnanavar", skills: "Teaching", availability: "Weekdays" },
    { name: "Riya Sharma", skills: "Event Management", availability: "Flexible" },
  ];

  const [volunteers, setVolunteers] = useState(mockVolunteers);

  // Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [formData, setFormData] = useState({ name: "", skills: "", availability: "" });

  // Add modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({ name: "", skills: "", availability: "" });

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState(null);

  // Open Edit Modal
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

  // Delete Modal
  const openDeleteModal = (vol) => {
    setVolunteerToDelete(vol);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setVolunteerToDelete(null);
  };

  const confirmDelete = () => {
    const updated = volunteers.filter((v) => v.name !== volunteerToDelete.name);
    setVolunteers(updated);
    closeDeleteModal();
  };

  // Add Volunteer Modal
  const openAddModal = () => {
    setNewVolunteer({ name: "", skills: "", availability: "" });
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  const handleAddVolunteer = () => {
    setVolunteers([...volunteers, newVolunteer]);
    closeAddModal();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight">
          Volunteers
        </h1>

        {/* ADD VOLUNTEER BUTTON */}
        <button
          onClick={openAddModal}
          className="
            px-5 py-2 rounded-lg 
            bg-[#245629] text-white 
            hover:bg-[#1E3A51] transition 
            font-grotesk text-sm tracking-wide
          "
        >
          + Add Volunteer
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-source">
            <thead>
              <tr className="bg-[#4B86B4]/20 text-[#2A4D69] text-[15px]">
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Name</th>
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Skills</th>
                <th className="p-3 text-left border-b border-[#4B86B4]/30">Availability</th>

                {/* ACTIONS HEADER CENTERED */}
                <th className="p-3 text-center border-b border-[#4B86B4]/30">
                  Actions
                </th>
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

                  <td className="p-3 flex justify-center gap-3">

                    {/* EDIT BUTTON */}
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

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => openDeleteModal(v)}
                      className="
                        bg-red-700 text-white px-3 py-1 rounded 
                        hover:bg-red-800 transition 
                        font-grotesk text-sm tracking-wide
                      "
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ---------------- ADD VOLUNTEER MODAL ---------------- */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl border border-[#4B86B4]/20 font-grotesk">

            <h2 className="text-xl font-semibold text-[#2A4D69] mb-4 tracking-tight">
              Add New Volunteer
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[#3E4C59] mb-1">Name</label>
                <input
                  type="text"
                  value={newVolunteer.name}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

              <div>
                <label className="block text-[#3E4C59] mb-1">Skills</label>
                <input
                  type="text"
                  value={newVolunteer.skills}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>

              <div>
                <label className="block text-[#3E4C59] mb-1">Availability</label>
                <input
                  type="text"
                  value={newVolunteer.availability}
                  onChange={(e) =>
                    setNewVolunteer({ ...newVolunteer, availability: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-[#4B86B4]/30"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeAddModal}
                className="px-4 py-2 rounded-lg border border-[#2A4D69] text-[#2A4D69] hover:bg-[#E7EEF3]"
              >
                Cancel
              </button>

              <button
                onClick={handleAddVolunteer}
                className="px-4 py-2 rounded-lg bg-[#245629] text-white hover:bg-[#1E3A51]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- DELETE CONFIRMATION MODAL ---------------- */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl border border-red-300 font-grotesk">

            <h2 className="text-xl font-semibold text-red-800 mb-4 tracking-tight">
              Confirm Delete
            </h2>

            <p className="text-[#3E4C59] mb-6">
              Are you sure you want to delete <strong>{volunteerToDelete?.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Volunteers;
