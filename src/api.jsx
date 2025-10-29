import axios from "axios";

// Use environment variable for the backend URL
const API = axios.create({
  baseURL: "https://invo-backend.onrender.com/api", 
});

// Attach token automatically if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
