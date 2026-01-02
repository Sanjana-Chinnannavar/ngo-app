const API_URL = "http://localhost:5000/events";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 🔹 GET ALL EVENTS (admin + volunteer)
export const getEvents = async () => {
  const res = await fetch(API_URL, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

// 🔹 CREATE EVENT (admin)
export const createEvent = async (eventData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
};

// 🔹 UPDATE EVENT (admin)
export const updateEvent = async (id, eventData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
};

// 🔹 DELETE EVENT (admin)
export const deleteEvent = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to delete event");
};
