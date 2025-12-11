const API_URL = "http://localhost:5000/announcements";

export const getAnnouncements = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch announcements");

  const data = await res.json();
  return data;
};
