const API_URL = "http://localhost:5000/events";

// GET EVENTS
export const getEvents = async (token) => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch events");

  return data; // { success, data }
};

// CREATE EVENT  ✅ THIS IS THE ONLY CREATE FUNCTION
export const addEvent = async (token, eventData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData), // ✅ ONLY EVENT DATA
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add event");

  return data;
};

// UPDATE
export const updateEvent = async (token, id, eventData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update event");

  return data;
};

// DELETE
export const deleteEvent = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete event");

  return data;
};

// ASSIGN
export const assignEvent = async (token, eventId, volunteerId) => {
  const res = await fetch(`${API_URL}/${eventId}/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ volunteerId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Assignment failed");

  return data;
};
