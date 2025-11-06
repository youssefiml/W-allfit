import axios from "axios";

// In production, if VITE_API_URL is not set, use relative path (same domain)
// In development, use the provided VITE_API_URL or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors (401 and 403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired, invalid, or missing
      localStorage.removeItem("token");
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes("/login") && 
          !window.location.pathname.includes("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
