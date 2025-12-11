const API_URL = "http://localhost:5000/volunteers";

export const getVolunteers = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch volunteers");

  const data = await res.json();
  return data.data;
};

export const addVolunteer = async (token, volunteer) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(volunteer),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add volunteer");
  }

  const data = await res.json();
  return data.data;
};

export const updateVolunteer = async (token, id, volunteer) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(volunteer),
  });

  if (!res.ok) throw new Error("Failed to update volunteer");

  const data = await res.json();
  return data.data;
};

export const deleteVolunteer = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete volunteer");
};
