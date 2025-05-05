import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import loginTranslations from "./loginTranslations";
import "./Login.css";

const Login = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const t = loginTranslations[language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/dashboard");
      }
    }
  }, [loading, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t.requiredFields);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await api.post("/users/login", { email, password });
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || t.loginFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loader message={t.loggingIn} />;
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">{t.title}</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
        />
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.passwordPlaceholder}
        />
        <button className="login-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.loggingIn : t.loginButton}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="login-footer">
        {t.noAccount}{" "}
        <Link to="/register" className="login-link">
          {t.registerHere}
        </Link>
      </p>
      <p className="login-footer">
        <Link to="/password-reset-request" className="login-link">
          {t.forgotPassword}
        </Link>
      </p>
    </div>
  );
};

export default Login;
