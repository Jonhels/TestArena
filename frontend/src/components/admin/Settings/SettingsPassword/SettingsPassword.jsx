import { useState } from "react";
import api from "../../../../api/api";
import "./SettingsPassword.css";
import eyeClosed from "../../../../assets/icons/eye-closed.svg";
import eyeOpen from "../../../../assets/icons/eye-open.svg";
import lock from "../../../../assets/icons/lock.svg";
import arrowUp from "../../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../../assets/icons/arrow-down.svg";

const SettingsPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const validatePassword = (password) =>
    /[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8;

  const handleClear = () => {
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setSuccessMessage("");
  };

  const handleSubmit = async () => {
    const newErrors = {};
    setSuccessMessage("");
    setErrors({});

    if (!newPassword) newErrors.newPassword = "Nytt passord er påkrevd.";
    if (!confirmPassword) newErrors.confirmPassword = "Bekreft passordet.";

    if (newPassword && !validatePassword(newPassword)) {
      newErrors.newPassword = "Minst 8 tegn, én stor bokstav og ett tall.";
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passordene er ikke like.";
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    try {
      setLoading(true);
      await api.put("/users/update", { password: newPassword });
      setSuccessMessage("Passordet ble oppdatert.");
      handleClear();
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.error ||
          "Noe gikk galt under oppdatering av passord.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="settings-password">
      <div className="settings-password__header">
        <div className="settings-password__title">
          <img src={lock} alt="Ikon for passord" />
          <span>Passord</span>
        </div>
        <img
          src={isOpen ? arrowUp : arrowDown}
          alt="Vis/skjul seksjon"
          className="settings-password__toggle"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <>
          <div className="settings-password__container">
            <div className="settings-password__inputs">
              <label htmlFor="newPassword">
                Nytt passord:
                <div className="password-input">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Skriv nytt passord"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? "Skjul nytt passord" : "Vis nytt passord"}
                  >
                    <img
                      src={showNewPassword ? eyeClosed : eyeOpen}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {errors.newPassword && (
                  <span className="settings-password__error">{errors.newPassword}</span>
                )}
              </label>

              <label htmlFor="confirmPassword">
                Gjenta nytt passord:
                <div className="password-input">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Gjenta nytt passord"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Skjul bekreftelse" : "Vis bekreftelse"}
                  >
                    <img
                      src={showConfirmPassword ? eyeClosed : eyeOpen}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="settings-password__error">{errors.confirmPassword}</span>
                )}
              </label>

              {errors.api && (
                <span className="settings-password__error">{errors.api}</span>
              )}

              {successMessage && (
                <span className="settings-password__status success">
                  {successMessage}
                </span>
              )}
            </div>

            <div className="settings-password__requirements">
              <div className="requirements-title">Passord må inneholde:</div>
              <div>Minst en stor bokstav</div>
              <div>Et tall</div>
              <div>Minst 8 karakterer</div>
            </div>
          </div>

          <div className="settings-password__actions">
            <button
              className="clear-btn"
              type="button"
              onClick={handleClear}
              disabled={loading}
            >
              Tøm feltene
            </button>
            <button
              className="submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Lagrer..." : "Lagre passord"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SettingsPassword;
