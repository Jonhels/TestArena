import React, { useState, useContext } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import "./styles/ProfilePage.css";

const ProfilePage = () => {
    const { user, setUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || "");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevents the form from submitting and reloading the page
        try {
            const response = await api.put("/users/update", { name, password });
            setUser(response.data.user);
            setSuccess("Profile updated successfully.");
            setError(""); // Clear any previous errors
        } catch (err) {
            setError(err.response?.data?.error || "Update failed.");
            setSuccess(""); // Clear any previous success messages
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                const response = await api.delete("/users/delete");
                setUser(null);
                setSuccess("User deleted successfully.");
                setError("");
            } catch (err) {
                setError(err.response?.data?.error || "Failed to delete account.");
                setSuccess("");
            }
        }
    };

    /* delete: /delete */

    return (
        <div className="profile-container">
            <h1 className="profile-heading">Profile</h1>
            <form className="profile-form" onSubmit={handleUpdate}>
                <label className="profile-label">Name</label>
                <input
                    className="profile-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <label className="profile-label">Password</label>
                <input
                    className="profile-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                />
                <button className="profile-button" type="submit">
                    Update Profile
                </button>
            </form>
            <button
                className="profile-button"
                style={{ backgroundColor: "red", marginTop: "1rem" }}
                onClick={handleDelete}
            >
                Delete Account
            </button>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ProfilePage;
