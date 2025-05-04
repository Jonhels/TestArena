import axios from "axios";

// Use environment variable directly for Vite
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://testarenaapi-production.up.railway.app/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
