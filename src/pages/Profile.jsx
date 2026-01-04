import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, updateMyProfile } from "../api/volunteers";

const Profile = () => {
  const { token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);

  // Load profile
  useEffect(() => {
    getMyProfile(token).then((res) => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Save changes
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
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-5">
          {/* NAME */}
          <p>
            <strong>Name:</strong>{" "}
            {editing ? (
              <input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                className="border px-3 py-1 rounded w-full mt-1"
              />
            ) : (
              profile.name
            )}
          </p>

          {/* EMAIL (READ ONLY) */}
          <p>
            <strong>Email:</strong>{" "}
            <span className="text-gray-700">{profile.email}</span>
          </p>

          {/* PHONE */}
          <p>
            <strong>Phone:</strong>{" "}
            {editing ? (
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="border px-3 py-1 rounded w-full mt-1"
              />
            ) : (
              profile.phone || "—"
            )}
          </p>

          {/* SKILLS */}
          <p>
            <strong>Skills:</strong>{" "}
            {editing ? (
              <input
                name="skills"
                value={form.skills || ""}
                onChange={handleChange}
                className="border px-3 py-1 rounded w-full mt-1"
                placeholder="e.g. Web Development, IT Support"
              />
            ) : (
              profile.skills || "—"
            )}
          </p>

          {/* AVAILABILITY */}
          <p>
            <strong>Availability:</strong>{" "}
            {editing ? (
              <input
                name="availability"
                value={form.availability || ""}
                onChange={handleChange}
                className="border px-3 py-1 rounded w-full mt-1"
                placeholder="e.g. Weekends, Evenings"
              />
            ) : (
              profile.availability || "—"
            )}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-6">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-5 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setForm(profile);
                    setEditing(false);
                  }}
                  className="px-5 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
