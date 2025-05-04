import React, { useState } from "react";
import api from "../api/api";
import "./styles/PasswordResetReq.css";

const PasswordResetRequestPage = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/password-reset-request", { email });
            setSuccess(response.data.message);
            setError(""); // Clear previous errors
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send password reset request.");
            setSuccess(""); // Clear previous success messages
        }
    };

    return (
        <div className="password-reset-container">
            <h1 className="password-reset-heading">Password Reset Request</h1>
            <form className="password-reset-form" onSubmit={handlePasswordResetRequest}>
                <input
                    className="password-reset-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button className="password-reset-button" type="submit">
                    Send Reset Link
                </button>
            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PasswordResetRequestPage;
