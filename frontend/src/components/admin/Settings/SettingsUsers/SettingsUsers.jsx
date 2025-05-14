import React, { useState } from "react";
import "./SettingsUsers.css";
import usersIcon from "../../../../assets/icons/admin.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";
import pencil from "../../../../assets/icons/pencil.svg";
import api from "../../../../api/api.js";
import UserModal from "./UserModal";


const SettingsUsers = ({ users = [], refetchUsers }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const getInitials = (fullName) => {
        if (!fullName) return "";
        const parts = fullName.trim().split(" ");
        const first = parts[0]?.[0] || "";
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return `${first}${last}`.toUpperCase();
    };

    const formatDate = (dateString) =>
        dateString
            ? new Date(dateString).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
            : "-";

    const handleSaveUser = async (userData) => {
        try {
            if (userData._id) {
                await api.put(`/users/${userData._id}`, userData);
            } else {
                await api.post("/users", userData);
            }
            await refetchUsers();
        } catch (error) {
            throw error;
        }
    };

    return (
        <section className="settings-users">
            <div className="settings-users__header">
                <div className="settings-users__title">
                    <img src={usersIcon} alt="Brukere" />
                    <span>Administrasjon</span>
                </div>
                <img
                    src={isOpen ? arrowup : arrowdown}
                    alt="Toggle"
                    className="settings-users__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {isOpen && (
                <div className="settings-users__body">
                    <div className="settings-users__row settings-users__header-row">
                        <div>Navn:</div>
                        <div>Lagt til:</div>
                        <div>Sist aktiv:</div>
                    </div>

                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="settings-users__row settings-users__clickable"
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="settings-users__user">
                                <div className="settings-users__avatar">{getInitials(user.name)}</div>
                                <div className="settings-users__info">
                                    <div>{user.name}</div>
                                    <small>Email: {user.email}</small>
                                    {user.phone && <small>Telefon: {user.phone}</small>}
                                </div>
                            </div>
                            <div>{formatDate(user.lastActive)}</div>
                            <div>{formatDate(user.timestamp)}</div>
                            <div>{user.role === "admin" ? "Admin" : "Gjesterolle"}</div>
                            <div>
                                <img
                                    src={pencil}
                                    alt="Rediger"
                                    className="settings-users__edit-icon"
                                />
                            </div>
                        </div>
                    ))}

                    <div className="settings-users__footer">
                        <button
                            className="settings-users__add-btn"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Legg til bruker
                        </button>
                    </div>
                </div>
            )}

            {(selectedUser || isAddModalOpen) && (
                <UserModal
                    user={selectedUser}
                    onClose={() => {
                        setSelectedUser(null);
                        setIsAddModalOpen(false);
                    }}
                    onSave={handleSaveUser}
                />
            )}
        </section>
    );
};

export default SettingsUsers;
