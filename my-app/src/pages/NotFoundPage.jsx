import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./styles/NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-heading">404</h1>
            <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/register" className="not-found-link">
                Register here
            </Link>
        </div>
    );
};

export default NotFoundPage;
