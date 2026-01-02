const API_URL = "http://localhost:5000/announcements";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 🔹 GET ALL ANNOUNCEMENTS (admin + volunteer)
export const getAnnouncements = async () => {
  const res = await fetch(API_URL, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch announcements");
  return res.json();
};

// 🔹 CREATE ANNOUNCEMENT (admin)
export const createAnnouncement = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create announcement");
  return res.json();
};

// 🔹 DELETE ANNOUNCEMENT (admin)
export const deleteAnnouncement = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to delete announcement");
};
