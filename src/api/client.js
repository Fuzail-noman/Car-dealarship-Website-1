// Base URL of the existing backend (auth + orders).
// Change this if you deploy the backend elsewhere.
export const API_BASE = "https://full-backend-kapadya.vercel.app";

function getToken() {
  return localStorage.getItem("galaxy_token");
}

async function request(path, { method = "GET", body, isForm = false, auth = false } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { success: false, message: "Server returned an unexpected response" };
  }

  if (!res.ok && data.success === undefined) {
    data.success = false;
  }
  return data;
}

export const api = {
  signup: (payload) => request("/api/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
  googleLogin: (credential) =>
    request("/api/auth/google", { method: "POST", body: { credential } }),
  me: () => request("/api/auth/me", { auth: true }),
  forgotPassword: (payload) =>
    request("/api/auth/forgot-password", { method: "POST", body: payload }),

  createOrder: (formData) =>
    request("/api/orders", { method: "POST", body: formData, isForm: true, auth: true }),
  myOrders: () => request("/api/orders/mine", { auth: true }),
  order: (id) => request(`/api/orders/${id}`, { auth: true }),
  cancelOrder: (id) => request(`/api/orders/${id}/cancel`, { method: "PATCH", auth: true }),
};
