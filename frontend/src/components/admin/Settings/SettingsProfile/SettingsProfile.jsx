import React, { useState, useEffect } from "react";
import "./SettingsProfile.css";
import pencil from "../../../../assets/icons/pencil.svg";
import profile from "../../../../assets/icons/profile.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";
import api from "../../../../api/api";

const SettingsProfile = ({ name, email, profileImage, phone, updateProfile, role, organization }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone || "");
  const [editedRole, setEditedRole] = useState(role || "guest");
  const [errors, setErrors] = useState({});
  const [localProfileImage, setLocalProfileImage] = useState("");
  const [editedOrganization, setEditedOrganization] = useState(organization || "");
  const [editedEmail, setEditedEmail] = useState(email);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    if (!profileImage) return setLocalProfileImage("");
    const base = api.defaults.baseURL.replace(/\/api$/, "");
    const isAbsolute = profileImage.startsWith("http");
    setLocalProfileImage(isAbsolute ? profileImage : `${base}${profileImage}`);
  }, [profileImage]);



  useEffect(() => {
    setEditedName(name);
  }, [name]);

  useEffect(() => {
    setEditedPhone(phone || "");
  }, [phone]);

  useEffect(() => {
    setEditedRole(role);
  }, [role]);

  useEffect(() => {
    setEditedEmail(email);
  }, [email]);



  const getInitials = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedPhone(phone || "");
    setEditedRole(role);
    setErrors({});
  };

 const handleSave = async () => {
  const newErrors = {};

  // Name validation
  if (!editedName.trim()) {
    newErrors.name = "Navn er påkrevd.";
  } else if (editedName.length > 50) {
    newErrors.name = "Navnet kan ikke være lengre enn 50 tegn.";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!editedEmail.trim()) {
    newErrors.email = "E-post er påkrevd.";
  } else if (!emailRegex.test(editedEmail)) {
    newErrors.email = "Ugyldig e-postadresse.";
  }

  // ✅ Updated phone validation
  if (editedPhone.trim() && !/^\d{8,15}$/.test(editedPhone.trim())) {
    newErrors.phone = "Telefonnummer må være mellom 8 og 15 sifre.";
  }

  // Organization validation
  if (editedOrganization && editedOrganization.length > 50) {
    newErrors.organization = "Organisasjon kan ikke være lengre enn 50 tegn.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  let uploadedImageUrl = profileImage;

  try {
    if (selectedImageFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedImageFile);

      const res = await api.post("/users/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const relativePath = res.data.imageUrl;
      const base = api.defaults.baseURL.replace(/\/api$/, "");
      uploadedImageUrl = `${base}${relativePath}`;
    }

    await updateProfile({
      name: editedName.trim(),
      phone: editedPhone.trim() || "",
      role: editedRole,
      organization: editedOrganization.trim(),
      email: editedEmail.trim(),
      profileImage: uploadedImageUrl,
    });

    setErrors({});
    setIsEditing(false);
  } catch (error) {
    console.error("Failed to update user:", error.response?.data || error.message);
    setErrors({ api: "Kunne ikke lagre endringer. Prøv igjen senere." });
  }
};



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setLocalProfileImage(previewURL); // show preview
    setSelectedImageFile(file);       // save file for later
  };





  const handleRemoveImage = async () => {
    try {
      await api.delete("/users/profile-image");
      setLocalProfileImage("");
      await updateProfile({
        name: editedName.trim(),
        phone: editedPhone.trim(),
        role: editedRole,
        organization: editedOrganization.trim(),
        email: editedEmail.trim(),
        profileImage: "",
      });
    } catch (error) {
      console.error("Error removing profile image", error);
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
          onClick={() => {
            if (isOpen) setIsEditing(false);
            setIsOpen(!isOpen);
          }}
        />

      </div>

      {isOpen && (
        <div className="settings-profile__container">
          {isEditing ? (
            <>
              <div className="settings-profile__avatar-wrapper">
                <div className="settings-profile__avatar-small">
                  {localProfileImage ? (
                    <img
                      src={localProfileImage}
                      alt="Profilbilde"
                      onError={() => setLocalProfileImage("")}
                    />
                  ) : (
                    <span>{getInitials(editedName)}</span>
                  )}
                </div>

                <div className="settings-profile__avatar-actions">
                  <label htmlFor="profile-upload" className="upload-label">
                    Legg til bilde
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  {localProfileImage && (
                    <button onClick={handleRemoveImage} type="button" className="remove-btn">
                      Fjern bilde
                    </button>
                  )}
                </div>
              </div>

              <div className="settings-profile__grid">
                <div className="form-group">
                  <label>Navn:</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="settings-profile__input"
                    placeholder="Navn"
                    maxLength={50}
                  />
                  {errors.name && <div className="error-text">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label>Rolle:</label>
                  <select
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                    className="settings-profile__input"
                    disabled
                  >
                    <option value="admin">Administrator</option>
                    <option value="guest">Gjesterolle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>E-post:</label>
                  <input
                    type="email"
                    placeholder="E-post"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="settings-profile__input"
                  />
                  {errors.email && <div className="error-text">{errors.email}</div>}

                </div>
                <div className="form-group">
                  <label>Organisasjon:</label>
                  <input
                    type="text"
                    value={editedOrganization}
                    onChange={(e) => setEditedOrganization(e.target.value)}
                    className="settings-profile__input"
                    placeholder="Organisasjon"
                    maxLength={50}
                  />
                  {errors.organization && <div className="error-text">{errors.organization}</div>}
                </div>

                <div className="form-group">
                  <label>Mobil:</label>
                  <input
                    type="text"
                    value={editedPhone}
                    placeholder="Telefon"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,15}$/.test(value)) setEditedPhone(value);
                    }}
                    className="settings-profile__input"
                    maxLength={8}
                  />
                  {errors.phone && <div className="error-text">{errors.phone}</div>}
                </div>
              </div>

              <div className="settings-profile__form-actions">
                <button className="cancel-btn" onClick={handleCancel}>
                  Avbryt
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Lagre
                </button>
              </div>
            </>
          ) : (
            <div className="settings-profile__readmode">
              <div className="settings-profile__readmode-content">
                <div className="settings-profile__avatar-small">
                  {localProfileImage ? (
                    <img
                      src={localProfileImage}
                      alt="Profilbilde"
                      onError={() => setLocalProfileImage("")}
                    />
                  ) : (
                    <span>{getInitials(name)}</span>
                  )}
                </div>
                <div className="settings-profile__info-block">
                  <div className="settings-profile__info-left">
                    <span>{name}</span>
                    <div>e-post: {email}</div>
                    <div>Tel: {phone}</div>
                  </div>
                  <div className="settings-profile__info-right">
                    <div>Rolle: {role === "admin" ? "Admin" : "Gjesterolle"}</div>
                    <div>Tilhører organisasjon: {organization}</div>
                  </div>
                </div>

              </div>
              <img
                src={pencil}
                alt="Rediger"
                className="settings-profile__edit-icon"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SettingsProfile;
