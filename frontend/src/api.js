const API_BASE = "http://localhost:3000/api";

export const registerUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const fetchSweets = async (token) => {
  const res = await fetch(`${API_BASE}/sweets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
