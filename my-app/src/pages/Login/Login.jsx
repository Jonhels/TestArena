import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import api from "../../api/api";
import "./Login.css";

const Login = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirect to the dashboard if the user is already logged in
  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log("User is logged in, redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        console.log("No user logged in.");
      }
    }
  }, [loading, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/login", { email, password });
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    // Show a loading spinner while checking authentication state
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="login-footer">
        Don't have an account?{" "}
        <Link to="/register" className="login-link">
          Register here
        </Link>
      </p>
      <p className="login-footer">
        <Link to="/password-reset-request" className="login-link">
          Forgot password
        </Link>
      </p>
    </div>
  );
};

export default Login;
