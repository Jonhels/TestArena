import React from "react";
import useLogout from "../../hooks/useLogout";
import "./Dashboard.css";

const DashboardPage = () => {
    const logout = useLogout();

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Dashboard</h1>
            <p>This page is a work in progress.</p>
        </div>
    );
};

export default DashboardPage;
