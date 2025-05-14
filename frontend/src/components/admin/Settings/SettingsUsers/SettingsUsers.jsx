import React, { useState } from "react";
import "./SettingsUsers.css";
import pencil from "../../../../assets/icons/pencil.svg";
import usersIcon from "../../../../assets/icons/admin.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";

const SettingsUsers = ({ users = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", role: "guest" });
  const [editedUsers, setEditedUsers] = useState({});

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

  const handleChange = (id, field, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleAddChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSubmit = () => {
    if (!newUser.name || !newUser.email) return alert("Navn og e-post er påkrevd");
    console.log("Legg til bruker:", newUser);
    setNewUser({ name: "", email: "", phone: "", role: "guest" });
    setShowAddForm(false);
  };

  const handleSaveEdit = (id) => {
    console.log("Lagre redigert:", editedUsers[id]);
    // Reset edit state
    setEditedUsers((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
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

          {users.map((user) => {
            const isUserEditing = isEditing;
            const data = editedUsers[user._id] || user;
            return (
              <div key={user._id} className="settings-users__row">
                <div className="settings-users__user">
                  <div className="settings-users__avatar">{getInitials(data.name)}</div>
                  <div className="settings-users__info">
                    {isUserEditing ? (
                      <>
                        <input
                        className="settings-users__input"
                          type="text"
                          value={data.name}
                          onChange={(e) => handleChange(user._id, "name", e.target.value)}
                        />
                        <input
                        className="settings-users__input"
                          type="email"
                          value={data.email}
                          onChange={(e) => handleChange(user._id, "email", e.target.value)}
                        />
                        <input
                        className="settings-users__input"
                          type="text"
                          value={data.phone || ""}
                          onChange={(e) => handleChange(user._id, "phone", e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <div>{data.name}</div>
                        <small>Email: {data.email}</small>
                        {data.phone && <small>Telefon: {data.phone}</small>}
                      </>
                    )}
                  </div>
                </div>
                <div>{formatDate(user.timestamp)}</div>
                <div>
                  {isUserEditing ? (
                    <select
                    className="settings-users__select"
                      value={data.role}
                      onChange={(e) => handleChange(user._id, "role", e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="guest">Gjesterolle</option>
                    </select>
                  ) : (
                    data.role === "admin" ? "Admin" : "Gjesterolle"
                  )}
                </div>
                {isUserEditing && (
                  <div>
                    <button onClick={() => handleSaveEdit(user._id)}>Lagre</button>
                  </div>
                )}
              </div>
            );
          })}

          {showAddForm && (
            <div className="settings-users__row">
              <div className="settings-users__user">
                <div className="settings-users__avatar">NY</div>
                <div className="settings-users__info">
                  <input
                  className="settings-users__input"
                    type="text"
                    placeholder="Navn"
                    value={newUser.name}
                    onChange={(e) => handleAddChange("name", e.target.value)}
                  />
                  <input
                  className="settings-users__input"
                    type="email"
                    placeholder="E-post"
                    value={newUser.email}
                    onChange={(e) => handleAddChange("email", e.target.value)}
                  />
                  <input
                  className="settings-users__input"
                    type="text"
                    placeholder="Telefon"
                    value={newUser.phone}
                    onChange={(e) => handleAddChange("phone", e.target.value)}
                  />
                </div>
              </div>
              <div>-</div>
              <div>
                <select
                className="settings-users__select"
                  value={newUser.role}
                  onChange={(e) => handleAddChange("role", e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="guest">Gjesterolle</option>
                </select>
              </div>
              <div>
                <button className="settings-users__save-btn" onClick={handleAddSubmit}>Lagre</button>
              </div>
            </div>
          )}

          <div className="settings-users__footer">
            <button
              className="settings-users__add-btn"
              onClick={() => setShowAddForm((prev) => !prev)}
            >
              {showAddForm ? "Avbryt" : "Legg til bruker"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SettingsUsers;
