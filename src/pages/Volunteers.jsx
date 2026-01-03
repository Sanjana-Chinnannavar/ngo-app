import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
} from "../api/volunteers";
import { Plus, Users, Edit2, Trash2, X, Mail, Phone, Zap, Calendar } from "lucide-react";

const Volunteers = () => {
  const { token } = useAuth();

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

  const loadVolunteers = async () => {
    setLoading(true);
    try {
      const data = await getVolunteers(token);
      setVolunteers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load volunteers");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

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

  const closeModal = () => {
    setModalOpen(false);
    setEditingVolunteer(null);
  };

  const handleSave = async () => {
    try {
      if (editingVolunteer) {
        await updateVolunteer(token, editingVolunteer.id, formData);
      } else {
        await addVolunteer(token, formData);
      }

      closeModal();
      loadVolunteers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this volunteer?")) return;

    try {
      await deleteVolunteer(token, id);
      loadVolunteers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading volunteers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteers
          </h1>
          <p className="text-gray-600 mt-2">Manage and track your volunteer team</p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8"
        >
          <Plus className="w-5 h-5" />
          Add Volunteer
        </button>

        <div className="grid gap-6">
          {volunteers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Users className="w-16 h-16 text-teal-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No volunteers yet.</p>
              <p className="text-gray-400 mt-2">Add your first volunteer to get started!</p>
            </div>
          ) : (
            volunteers.map((volunteer, index) => (
              <div
                key={volunteer.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-teal-300 hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <style>{`
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(20px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>

                <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:h-1.5 transition-all duration-300"></div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300 mb-2">
                        {volunteer.name}
                      </h3>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                      <Users className="w-6 h-6 text-teal-500" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span className="font-medium">{volunteer.email}</span>
                    </div>
                    {volunteer.phone && (
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="font-medium">{volunteer.phone}</span>
                      </div>
                    )}
                    {volunteer.skills && (
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <Zap className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="font-medium">{volunteer.skills}</span>
                      </div>
                    )}
                    {volunteer.availability && (
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <Calendar className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="font-medium">{volunteer.availability}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={() => openModal(volunteer)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-teal-200 text-teal-600 hover:bg-teal-50 rounded-lg font-semibold transition-all duration-300 hover:border-teal-300"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(volunteer.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-300 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white px-6 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-gray-50 transition-all duration-300">
                  <span className="text-sm text-gray-600 font-medium">Volunteer ID: {volunteer.id}</span>
                  <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:animate-pulse"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingVolunteer ? "Edit Volunteer" : "Add Volunteer"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Skills</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Skills (e.g., Teaching, Mentoring)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Availability</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Availability (e.g., Weekends)"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {editingVolunteer ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Volunteers;
