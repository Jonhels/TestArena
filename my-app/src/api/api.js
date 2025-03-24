import axios from "axios";

// Use environment variable directly for Vite
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.skjaerstein.com/api/users",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
