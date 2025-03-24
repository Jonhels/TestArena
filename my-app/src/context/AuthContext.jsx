import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/profile");
                console.log("Fetched user:", response.data.user);
                setUser(response.data.user);
            } catch (err) {
                console.log("No user logged in or error fetching user:", err);
                setUser(null);
            } finally {
                setLoading(false);
                console.log("Finished authentication check.");
            }
        };
        fetchUser();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
