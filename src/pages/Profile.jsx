import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, updateMyProfile } from "../api/volunteers";
import { User, Mail, Phone, Briefcase, Clock, Edit2, Save, X } from "lucide-react";

const Profile = () => {
  const { token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getMyProfile(token).then((res) => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, [token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await updateMyProfile(token, {
        name: form.name,
        phone: form.phone,
        skills: form.skills,
        availability: form.availability,
      });

      setProfile(res.data);
      setForm(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">Manage your personal information</p>
        </div>

        <div 
          className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-teal-300 hover:-translate-y-1"
          style={{
            animation: `fadeInUp 0.6s ease-out both`
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">{profile.name}</h2>
                  <p className="text-teal-600 font-medium">{profile.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm">
                    <User className="w-5 h-5 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    {editing ? (
                      <input
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm">
                    <Mail className="w-5 h-5 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <p className="text-gray-600 font-medium">{profile.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm">
                    <Phone className="w-5 h-5 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    {editing ? (
                      <input
                        name="phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.phone || "Not provided"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm">
                    <Briefcase className="w-5 h-5 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                    {editing ? (
                      <input
                        name="skills"
                        value={form.skills || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                        placeholder="e.g. Web Development, IT Support"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.skills || "Not provided"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm">
                    <Clock className="w-5 h-5 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                    {editing ? (
                      <input
                        name="availability"
                        value={form.availability || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-300"
                        placeholder="e.g. Weekends, Evenings"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.availability || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setForm(profile);
                        setEditing(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white px-6 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-gray-50 transition-all duration-300">
            <span className="text-sm text-gray-600 font-medium">Profile Information</span>
            <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
