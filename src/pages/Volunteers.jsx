import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
} from "../api/volunteers";

const Volunteers = () => {
  const { token } = useContext(AuthContext);

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
  });

  // Load all volunteers
  const loadVolunteers = async () => {
    setLoading(true);
    try {
      const data = await getVolunteers(token);
      setVolunteers(data);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  // Open modal for edit/create
  const openModal = (vol = null) => {
    setEditingVolunteer(vol);

    if (vol) {
      setFormData({
        name: vol.name,
        email: vol.email,
        phone: vol.phone,
        skills: vol.skills || "",
        availability: vol.availability || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        availability: "",
      });
    }

    setModalOpen(true);
  };

  // Save volunteer
  const handleSave = async () => {
    try {
      if (editingVolunteer) {
        await updateVolunteer(token, editingVolunteer.id, formData);
      } else {
        await addVolunteer(token, formData);
      }

      setModalOpen(false);
      loadVolunteers();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete volunteer
  const handleDelete = async (id) => {
    if (!confirm("Delete volunteer?")) return;

    try {
      await deleteVolunteer(token, id);
      loadVolunteers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading volunteers…</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#2A4D69] mb-6">
        Volunteers
      </h1>

      <button
        className="bg-[#2A4D69] text-white px-5 py-2 rounded-lg mb-6"
        onClick={() => openModal()}
      >
        + Add Volunteer
      </button>

      <div className="space-y-4">
        {volunteers.map((v) => (
          <div
            key={v.id}
            className="bg-[#F7F9FB] p-5 rounded-xl border border-[#4B86B4]/20 shadow-sm"
          >
            <h3 classend="text-xl font-semibold text-[#2A4D69]">
              {v.name}
            </h3>

            <p className="text-[#3E4C59]">📧 {v.email}</p>
            <p className="text-[#3E4C59]">📞 {v.phone}</p>

            {v.skills && <p className="text-[#3E4C59] mt-1">🛠 {v.skills}</p>}
            {v.availability && (
              <p className="text-[#3E4C59]">📅 {v.availability}</p>
            )}

            <div className="mt-4 space-x-4">
              <button
                onClick={() => openModal(v)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(v.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
            <h2 className="text-2xl font-semibold">
              {editingVolunteer ? "Edit Volunteer" : "Add Volunteer"}
            </h2>

            {["name", "email", "phone", "skills", "availability"].map((key) => (
              <input
                key={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
            ))}

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

export default Volunteers;
