import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo = "/login", requiredRole }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="loading-spinner">Loading...</div>;

    if (!user) return <Navigate to={redirectTo} />;

    return children;
};

export default ProtectedRoute;
