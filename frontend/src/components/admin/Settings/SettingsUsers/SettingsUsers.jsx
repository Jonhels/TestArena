import React, { useState } from "react";
import "./SettingsUsers.css";
import pencil from "../../../../assets/icons/pencil.svg";
import usersIcon from "../../../../assets/icons/admin.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";

const SettingsUsers = ({ users = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="settings-users">
      <div className="settings-users__header">
        <div className="settings-users__title">
          <img src={usersIcon} alt="Brukere" />
          <span>Administrasjon</span>
        </div>
        <div className="settings-users__controls">
          <img
            src={isOpen ? arrowup : arrowdown}
            alt="Toggle"
            className="settings-users__toggle"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
<div className="pencilholder">
     <img
            src={pencil}
            alt="Rediger"
            className="settings-users__edit-icon"
            onClick={() => setIsEditing((prev) => !prev)}
          />
</div>
      {isOpen && (
        <div className="settings-users__body">
          <div className="settings-users__row settings-users__header-row">
            <div>Navn:</div>
            <div>Lagt til:</div>
            <div>Rolle:</div>
          </div>

          {users.map((user) => (
            <div key={user._id} className="settings-users__row">
              <div className="settings-users__user">
                <div className="settings-users__avatar">
                  {getInitials(user.name)}
                </div>
                <div className="settings-users__info">
                  <div>{user.name}</div>
                  <small>Email: {user.email}</small>
                  {user.phone && <small>Telefon: {user.phone}</small>}
                </div>
              </div>
              <div>{formatDate(user.timestamp)}</div>
              <div>{user.role === "admin" ? "Admin" : "Gjesterolle"}</div>
            </div>
          ))}

          <div className="settings-users__footer">
            <button className="settings-users__add-btn">Legg til bruker</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SettingsUsers;
