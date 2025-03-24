import { useContext } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

const useLogout = () => {
    const { setUser } = useContext(AuthContext);

    const logout = async () => {
        try {
            await api.post("/logout"); // Call the backend logout route
            setUser(null); // Clear the user context
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };

    return logout;
};

export default useLogout;
