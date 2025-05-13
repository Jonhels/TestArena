import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import resetTranslations from "./resetTranslations";
import "./PasswordReset.css";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { language } = useContext(LanguageContext);
  const t = resetTranslations[language];

  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/users/reset-password?token=${token}`, {
        newPassword,
      });
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || t.resetFailed);
      setSuccess("");
    }
  };

  return (
    <div className="password-reset-container">
      <h1 className="password-reset-heading">{t.title}</h1>
      <form className="password-reset-form" onSubmit={handlePasswordReset}>
        <input
          className="password-reset-input"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t.passwordPlaceholder}
        />
        <button className="password-reset-button" type="submit">
          {t.resetButton}
        </button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PasswordReset;
