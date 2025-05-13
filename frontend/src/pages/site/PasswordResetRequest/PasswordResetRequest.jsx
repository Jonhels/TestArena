import { useState, useContext } from "react";
import api from "../../../api/api";
import { LanguageContext } from "../../../context/LanguageContext";
import passwordResetTranslations from "./passwordResetTranslations";
import "./PasswordResetRequest.css";

const PasswordResetRequest = () => {
  const { language } = useContext(LanguageContext);
  const t = passwordResetTranslations[language];

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/password-reset-request", {
        email,
      });
      setSuccess(response.data.message || t.success);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || t.error);
      setSuccess("");
    }
  };

  return (
    <div className="password-reset-request-container">
      <h1 className="password-reset-request-heading">{t.title}</h1>
      <form
        className="password-reset-request-form"
        onSubmit={handlePasswordResetRequest}
      >
        <input
          className="password-reset-request-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
        />
        <button className="password-reset-request-button" type="submit">
          {t.button}
        </button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PasswordResetRequest;
