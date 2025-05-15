import React, { useState } from "react";
import "./EditUserForm.css";
import warning from "../../../../assets/icons/warning.svg"
import bluewarning from "../../../../assets/icons/bluewarning.svg"
import api from "../../../../api/api";


const EditUserForm = ({ user, onCancel, onSave, refetchUsers }) => {
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [organization, setOrganization] = useState(user.organization || "");
    const [role, setRole] = useState(user.role || "guest");
    const [timestamp] = useState(user.timestamp);
    const [errors, setErrors] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSubmit = () => {
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = "Navn er påkrevd.";
        } else if (name.length > 50) {
            newErrors.name = "Navnet kan ikke være lengre enn 50 tegn.";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "E-post er påkrevd.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Ugyldig e-postadresse.";
        }

        // Phone validation
        if (phone && !/^\d{8,15}$/.test(phone)) {
            newErrors.phone = "Telefonnummer må være 8 sifre.";
        }

        // Organization validation
        if (organization && organization.length > 50) {
            newErrors.organization = "Organisasjon kan ikke være lengre enn 50 tegn.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave({
            ...user,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || "",
            organization: organization.trim(),
            role,
        });

    };


    const handleDelete = async () => {
        try {
            const res = await api.delete(`/users/${user._id}`);
            if (res.status !== 200) throw new Error("Sletting feilet");

            await refetchUsers?.();
            alert("Bruker slettet.");
            onCancel();
        } catch (err) {
            console.error(err);
            alert("Kunne ikke slette bruker.");
        }
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
                <div className="edit-user-form__bluewarning">
                    <img src={bluewarning}></img>
                    <p>Administratorer har tilgang til alle funksjoner. Gjester har kun leserettigheter.</p>
                </div>
            </div>

            <div className="edit-user-form__grid">
                <div className="edit-user-form__group">
                    <label>Navn:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="edit-user-form__input"
                        placeholder="Navn"
                        maxLength={50}
                        type="text"
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
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="edit-user-form__input"
                        placeholder="Organisasjon"
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
                        maxLength={8}
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
                <button onClick={onCancel} className="edit-user-form__cancel">
                    Avbryt
                </button>
                <button onClick={handleSubmit} className="edit-user-form__save">
                    Lagre
                </button>
            </div>

            {/* Bottom row: Delete logic */}
            <div className="edit-user-form__delete-section">
                {!confirmDelete ? (
                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="edit-user-form__delete"
                    >
                        Slett bruker
                    </button>
                ) : (
                    <div className="edit-user-form__confirm-delete">
                        <p>Er du sikker?</p>
                        <button onClick={handleDelete} className="edit-user-form__delete-confirm">
                            Ja, slett
                        </button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            className="edit-user-form__cancel"
                        >
                            Avbryt
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditUserForm;
