import React, { useState, useEffect } from "react";
import "./SettingsProfile.css";
import pencil from "../../../../assets/icons/pencil.svg";
import profile from "../../../../assets/icons/profile.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";

const SettingsProfile = ({ name, email, profileImage, phone, updateProfile, role }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone || "");
  const [editedRole, setEditedRole] = useState(role || "guest");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  useEffect(() => {
    setEditedPhone(phone || "");
  }, [phone]);

  useEffect(() => {
    setEditedRole(role);
  }, [role]);

  const getInitials = (fullName) =>
    fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedPhone(phone || "");
    setEditedRole(role);
    setErrors({});
  };

  const handleSave = async () => {
    const newErrors = {};

    if (!editedName.trim()) {
      newErrors.name = "Navn er påkrevd.";
    } else if (editedName.length > 50) {
      newErrors.name = "Navnet kan ikke være lengre enn 50 tegn.";
    }

    if (!/^\d{8,15}$/.test(editedPhone)) {
      newErrors.phone = "Telefonnummer må være 8-15 sifre.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateProfile({
        name: editedName.trim(),
        phone: editedPhone.trim(),
        role: editedRole,
      });

      setErrors({});
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error.response?.data || error.message);
    }
  };

  return (
    <section className="settings-profile">
      <div className="settings-profile__header">
        <div className="settings-profile__title">
          <img src={profile} alt="Profil ikon" />
          <span>Profil</span>
        </div>
        <img
          src={isOpen ? arrowup : arrowdown}
          alt="Toggle"
          className="settings-profile__toggle"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <div className="settings-profile__wrapper">
          <div className="settings-profile-icon">
            {isEditing ? (
              <div className="settings-profile__actions">
                <button onClick={handleCancel} className="cancel-btn">Avbryt</button>
                <button onClick={handleSave} className="save-btn">Lagre</button>
              </div>
            ) : (
              <img
                src={pencil}
                alt="Rediger"
                className="settings-profile__edit-icon"
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>

          <div className="settings-profile__body">
            <div className="settings-profile__avatar-wrapper">
              <div className="settings-profile__avatar">
                {profileImage ? (
                  <img src={profileImage} alt="Profilbilde" />
                ) : (
                  <span>{getInitials(editedName)}</span>
                )}
              </div>
            </div>

            <div className="settings-profile__info-left">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="settings-profile__input"
                    maxLength={50}
                  />
                  {errors.name && <div className="error-text">{errors.name}</div>}

                  <div className="settings-profile__email">e-post: {email}</div>

                  <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,15}$/.test(value)) {
                        setEditedPhone(value);
                      }
                    }}
                    className="settings-profile__input"
                    maxLength={15}
                  />
                  {errors.phone && <div className="error-text">{errors.phone}</div>}

                  <select
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                    className="settings-profile__input"
                    disabled={role !== "admin"}
                  >
                    <option value="admin">Administrator</option>
                    <option value="guest">Gjesterolle</option>
                  </select>
                </>
              ) : (
                <>
                  <div className="settings-profile__name">{editedName}</div>
                  <div className="settings-profile__email">e-post: {email}</div>
                  <div className="settings-profile__phone">Tel: {editedPhone}</div>
                  <div className="settings-profile__role">
                    Rolle: {editedRole === "admin" ? "Administrator" : "Gjesterolle"}
                  </div>
                </>
              )}
            </div>

            <div className="settings-profile__right">
              <div className="settings-profile__role-org">
                <div className="settings-profile__org">Tilhører organisasjon: HelseInn</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SettingsProfile;
