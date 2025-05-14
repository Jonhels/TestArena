import React, { useState } from "react";
import "./UserModal.css";

const UserModal = ({ user, onClose, onSave }) => {
  const isEdit = !!user;
  const [formData, setFormData] = useState(
    user || { name: "", email: "", phone: "", role: "guest" }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Navn er påkrevd.";
    if (!formData.email) newErrors.email = "E-post er påkrevd.";
    if (formData.phone && !/^\d{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Telefonnummer må være 8–15 sifre.";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      const message = err?.response?.data?.error || "Ukjent feil oppstod";
      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else {
        setErrors((prev) => ({ ...prev, global: message }));
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? "Rediger bruker" : "Legg til ny bruker"}</h2>

        {errors.global && <div className="form-error global">{errors.global}</div>}

        <div className="modal-field">
          <input
            type="text"
            placeholder="Navn"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="modal-field">
          <input
            type="email"
            placeholder="E-post"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="modal-field">
          <input
            type="text"
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        <div className="modal-field">
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="guest">Gjesterolle</option>
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit}>Lagre</button>
          <button onClick={onClose}>Avbryt</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
