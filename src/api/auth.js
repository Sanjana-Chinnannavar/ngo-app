const API_URL = "http://localhost:5000/auth";

export const loginRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }) // ❌ removed role
  });

  const data = await res.json(); // ✅ parse once

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // { success, token, user }
};

export const changePassword = async (token, currentPassword, newPassword) => {
  const res = await fetch(`${API_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update password");
  }

  return data;
};
