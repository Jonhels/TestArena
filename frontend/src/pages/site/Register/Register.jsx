import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import Loader from "../../../components/common/Loader/Loader";
import { LanguageContext } from "../../../context/LanguageContext";
import registerTranslations from "./registerTranslations";
import "./Register.css";

const Register = () => {
  const { language } = useContext(LanguageContext);
  const t = registerTranslations[language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });
      setSuccess(response.data.message || t.success);
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/admin-login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>{t.title}</h1>
      {loading ? (
        <Loader message={t.registering} />
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPlaceholder}
          />
          <button type="submit" disabled={loading}>
            {t.button}
          </button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <p>
        {t.alreadyHaveAccount} <Link to="/admin-login">{t.loginHere}</Link>
      </p>
    </div>
  );
};

export default Register;
