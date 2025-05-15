import React, { useState } from "react";
import "./EditUserForm.css"; // Reuse the same styles
import warning from "../../../../assets/icons/warning.svg";
import bluewarning from "../../../../assets/icons/bluewarning.svg";

const CreateUserForm = ({ onCancel, onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("guest");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Navn er påkrevd.";
    if (!email.trim()) newErrors.email = "E-post er påkrevd.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Ugyldig e-post.";
    if (phone && !/^\d{8,15}$/.test(phone)) newErrors.phone = "Ugyldig telefonnummer.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() === "" ? undefined : phone.trim(),
      organization: organization.trim(),
      role,
    });
  };

  return (
    <div className="edit-user-form">
      <div className="edit-user-form__info">
        <div className="edit-user-form__bluewarning">
          <img src={bluewarning} alt="Info" />
          <p>Administratorer har tilgang til alle funksjoner. Gjester har kun leserettigheter.</p>
        </div>
      </div>

      <div className="edit-user-form__grid">
        <div className="edit-user-form__group">
          <label>Navn:</label>
          <input
            type="text"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="edit-user-form__input"
            maxLength={50}
          />
          {errors.name && <div className="edit-user-form__error">{errors.name}</div>}
        </div>

        <div className="edit-user-form__group">
          <label>E-post:</label>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="edit-user-form__input"
          />
          {errors.email && <div className="edit-user-form__error">{errors.email}</div>}
        </div>

        <div className="edit-user-form__group">
          <label>Organisasjon:</label>
          <input
            type="text"
            placeholder="Organisasjon"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="edit-user-form__input"
            maxLength={50}
          />
        </div>

        <div className="edit-user-form__group">
          <label>Mobil:</label>
          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,15}$/.test(value)) setPhone(value);
            }}
            className="edit-user-form__input"
            maxLength={15}
          />
          {errors.phone && <div className="edit-user-form__error">{errors.phone}</div>}
        </div>

        <div className="edit-user-form__group">
          <label>Velg rolle:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="edit-user-form__input"
          >
            <option value="guest">Gjest</option>
            <option value="admin">Administrator</option>
          </select>

          {role === "guest" && (
            <div className="edit-user-form__warning-wrapper">
              <div className="edit-user-form__warning">
                <img src={warning} alt="Warning" />
                <p>Obs! Gjester har bare lesetilgang.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="edit-user-form__actions">
        <button onClick={onCancel} className="edit-user-form__cancel">Avbryt</button>
        <button onClick={handleSubmit} className="edit-user-form__save">Opprett bruker</button>
      </div>
    </div>
  );
};

export default CreateUserForm;
