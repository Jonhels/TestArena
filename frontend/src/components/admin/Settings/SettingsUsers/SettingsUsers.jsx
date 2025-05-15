import React, { useState } from "react";
import "./SettingsUsers.css";
import usersIcon from "../../../../assets/icons/admin.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";
import pencil from "../../../../assets/icons/pencil.svg";
import api from "../../../../api/api.js";
import EditUserForm from "./EditUserForm";
import CreateUserForm from "./CreateUserForm.jsx";

const SettingsUsers = ({ users = [], refetchUsers }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

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
          {/* Form area (Edit or Create) */}
          {editingUserId !== null ? (
            <div className="edit-users__wrapper">
              {(() => {
                const user = users.find((u) => u._id === editingUserId);
                return (
                  <>
                    <h3 className="settings-users__form-title">
                      Rediger bruker: <span className="highlight">{user?.name}</span>
                    </h3>
                    <EditUserForm
                      user={user}
                      onCancel={() => setEditingUserId(null)}
                      onSave={async (updatedData) => {
                        await api.put(`/users/${editingUserId}`, updatedData);
                        setEditingUserId(null);
                        await refetchUsers();
                      }}
                    />
                  </>
                );
              })()}
            </div>
          ) : isAddModalOpen ? (
            <div className="edit-users__wrapper">
              <h3 className="settings-users__form-title">Opprett ny bruker</h3>
              <CreateUserForm
                onCancel={() => setIsAddModalOpen(false)}
                onCreate={async (newUserData) => {
                  await api.post("/users", newUserData);
                  setIsAddModalOpen(false);
                  await refetchUsers();
                }}
              />
            </div>
          ) : (
            <>
              {/* Header Row */}
              <div className="settings-users__row settings-users__header-row">
                <div>Navn:</div>
                <div>Lagt til:</div>
                <div>Sist aktiv:</div>
                <div>Rolle:</div>
              </div>

              {/* User List */}
              {users.map((user) => (
                <div key={user._id} className="settings-users__row">
                  <div className="settings-users__user">
                    <div className="settings-users__avatar">{getInitials(user.name)}</div>
                    <div className="settings-users__info">
                      <div className="settings-users__information-item-wrap settings-users_name">
                        {user.name}
                      </div>
                      <div className="settings-users__information-small">
                        <div><small>Email: {user.email}</small></div>
                        <div><small>Telefon: {user.phone}</small></div>
                      </div>
                    </div>
                  </div>
                  <div className="settings-users__information-item-wrap">
                    <span className="settings-mobile__title">Lagt til: </span>
                    {formatDate(user.timestamp)}
                  </div>
                  <div className="settings-users__information-item-wrap">
                    <span className="settings-mobile__title">Sist aktiv: </span>
                    {formatDate(user.lastActive)}
                  </div>
                  <div className="settings-users__information-item-wrap">
                    <span className="settings-mobile__title">Rolle: </span>
                    {user.role === "admin" ? "Admin" : "Gjesterolle"}
                  </div>
                  <div>
                    <img
                      src={pencil}
                      alt="Rediger"
                      className="settings-users__edit-icon"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingUserId(user._id);
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Add User Button */}
              <div className="settings-users__footer">
                <button
                  className="settings-users__add-btn"
                  onClick={() => {
                    setEditingUserId(null);
                    setIsAddModalOpen(true);
                  }}
                >
                  Legg til bruker
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default SettingsUsers;
