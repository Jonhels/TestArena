import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import "./VerifyEmail.css";
import { LanguageContext } from "../context/LanguageContext";
import verifyEmailTranslations from "./verifyEmailTranslations";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { language } = useContext(LanguageContext);
  const t = verifyEmailTranslations[language];

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.get(`/users/verify-email?token=${token}`);
        setSuccess(response.data.message);
        setError("");
      } catch (err) {
        setError(err.response?.data?.error || t.errorFallback);
        setSuccess("");
      }
    };
    verify();
  }, [token, t]);

  return (
    <div className="verify-email-container">
      <h1 className="verify-email-heading">{t.title}</h1>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
