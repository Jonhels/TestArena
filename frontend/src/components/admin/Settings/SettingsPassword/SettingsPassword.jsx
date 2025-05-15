import { useState } from "react";
import api from "../../../../api/api";
import "./SettingsPassword.css";

const SettingsPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8;
  };

  const handleSubmit = async () => {
    setStatus(null);

    if (!newPassword || !confirmPassword) {
      return setStatus({ type: "error", message: "Alle felt må fylles ut." });
    }

    if (newPassword !== confirmPassword) {
      return setStatus({ type: "error", message: "Nye passordene er ikke like." });
    }

    if (!validatePassword(newPassword)) {
      return setStatus({
        type: "error",
        message: "Passordet må ha minst én stor bokstav, ett tall og være minst 8 tegn.",
      });
    }

    try {
      setLoading(true);
      await api.put("/users/update", { password: newPassword });
      setStatus({ type: "success", message: "Passordet ble oppdatert." });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.error || "Noe gikk galt under oppdatering av passord.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-section__header">
        <span role="img" aria-label="lock">🔒</span>
        <span>Passord</span>
      </div>

      <div className="settings-password__content">
        <div className="settings-password__inputs">
          <label htmlFor="newPassword">
            Nytt passord:
            <div className="password-input">
              <input
                id="newPassword"
                tabIndex={0}
                type={showPassword ? "text" : "password"}
                placeholder="Skriv nytt passord"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Skjul passord" : "Vis passord"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <label htmlFor="confirmPassword">
            Gjenta nytt passord:
            <div className="password-input">
              <input
                id="confirmPassword"
                tabIndex={0}
                type={showPassword ? "text" : "password"}
                placeholder="Gjenta nytt passord"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Skjul passord" : "Vis passord"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>
        </div>

        <div className="settings-password__requirements">
          <strong>Passord må inneholde:</strong>
          <ul>
            <li>Minst en stor bokstav</li>
            <li>Et tall</li>
            <li>Minst 8 karakterer</li>
          </ul>
        </div>
      </div>

      {status && (
        <p
          className={`settings-password__status ${
            status.type === "error" ? "error" : "success"
          }`}
        >
          {status.message}
        </p>
      )}

      <div className="settings-password__actions">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Lagrer..." : "Lagre passord"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPassword;
