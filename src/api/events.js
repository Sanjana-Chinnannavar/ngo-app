const API_URL = "http://localhost:5000/events";

// GET ALL EVENTS
export const getEvents = async (token) => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch events");

  return res.json(); // { success, data }
};

// ADD NEW EVENT
export const addEvent = async (token, eventData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add event");
  }

  return res.json();
};

// UPDATE EVENT
export const updateEvent = async (token, id, eventData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) throw new Error("Failed to update event");

  return res.json();
};

// DELETE EVENT
export const deleteEvent = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete event");

  return res.json();
};
