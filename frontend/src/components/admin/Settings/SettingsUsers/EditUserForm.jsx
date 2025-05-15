import React, { useState } from "react";
import "./EditUserForm.css";
import warning from "../../../../assets/icons/warning.svg"

const EditUserForm = ({ user, onCancel, onSave }) => {
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [organization, setOrganization] = useState(user.organization || "");
    const [role, setRole] = useState(user.role || "guest");
    const [timestamp] = useState(user.timestamp);
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

        onSave({
            ...user,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            organization: organization.trim(),
            role,
        });
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("nb-NO", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <div className="edit-user-form">
            <div className="edit-user-form__info">
                <p>
                    <span className="info-icon">ℹ️</span> Administratorer har tilgang til alle funksjoner. Gjester har kun leserettigheter.
                </p>
            </div>

            <div className="edit-user-form__grid">
                <div className="edit-user-form__group">
                    <label>Navn:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="edit-user-form__input"
                    />
                    {errors.name && <div className="edit-user-form__error">{errors.name}</div>}
                </div>

                <div className="edit-user-form__group">
                    <label>E-post:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="edit-user-form__input"
                    />
                    {errors.email && <div className="edit-user-form__error">{errors.email}</div>}
                </div>

                <div className="edit-user-form__group">
                    <label>Organisasjon:</label>
                    <input
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="edit-user-form__input"
                    />
                </div>

                <div className="edit-user-form__group">
                    <label>Mobil:</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                            <img src={warning}></img>
                            <p>Obs! Gjester har bare lesetilgang.</p>
                        </div>
                    </div>

                )}
                </div>
              
                <div className="edit-user-form__group">
                    <label>Lagt til:</label>
                    <input value={formatDate(timestamp)} disabled className="edit-user-form__input" />
                </div>
            </div>



            <div className="edit-user-form__actions">
                <button onClick={onCancel} className="edit-user-form__cancel">Avbryt</button>
                <button onClick={handleSubmit} className="edit-user-form__save">Lagre</button>
            </div>
        </div>
    );
};

export default EditUserForm;
