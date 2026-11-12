import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((req) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = "Bearer " + token;
    }
  } catch (error) {
    console.warn("Could not access localStorage for auth token:", error);
  }
  return req;
});

export default API;
