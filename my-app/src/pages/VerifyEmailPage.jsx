import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import "./styles/VerifyEmail.css";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await api.get(`/verify-email?token=${token}`);
                setSuccess(response.data.message);
                setError(""); // Clear any previous errors
            } catch (err) {
                setError(err.response?.data?.error || "Email verification failed.");
                setSuccess(""); // Clear any previous success messages
            }
        };
        verifyEmail();
    }, [token]);

    return (
        <div className="verify-email-container">
            <h1 className="verify-email-heading">Verify Email</h1>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default VerifyEmailPage;
