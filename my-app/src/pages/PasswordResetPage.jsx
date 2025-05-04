import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import "./styles/ResetPassword.css";

const PasswordResetPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/users/reset-password?token=${token}`, { newPassword });
            setSuccess(response.data.message);
            setError(""); // Clear any previous error messages
        } catch (err) {
            setError(err.response?.data?.error || "Password reset failed.");
            setSuccess(""); // Clear any previous success messages
        }
    };

    return (
        <div className="password-reset-container">
            <h1 className="password-reset-heading">Reset Password</h1>
            <form className="password-reset-form" onSubmit={handlePasswordReset}>
                <input
                    className="password-reset-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                />
                <button className="password-reset-button" type="submit">
                    Reset Password
                </button>
            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PasswordResetPage;
