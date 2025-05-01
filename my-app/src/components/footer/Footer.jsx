import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import footerTranslations from "./footerTranslations";
import { LanguageContext } from "../../context/LanguageContext";
import "./Footer.css";
import logo from "../../assets/images/footer-logo.svg";

function Footer() {
  const { language } = useContext(LanguageContext);
  const [fade, setFade] = useState(false);
  const [currentLang, setCurrentLang] = useState(language);

  useEffect(() => {
    if (language !== currentLang) {
      setFade(true);
      setTimeout(() => {
        setCurrentLang(language);
        setFade(false);
      }, 300);
    }
  }, [language, currentLang]);

  const t = (key) => footerTranslations[currentLang][key];

  return (
    <footer className={`footer ${fade ? "fade-out" : "fade-in"}`}>
      <div className="footer__container">
        <div
          className="footer__logo-wrapper fade-item"
          style={{ animationDelay: "0.2s" }}
        >
          <img
            src={logo}
            alt="Testarena Innlandet logo"
            className="footer__logo"
          />
        </div>

        <div className="footer__columns">
          {/* Kolonne 1 */}
          <div className="footer__column">
            <h3 className="fade-item">{t("contact")}</h3>
            <address className="footer__address">
              <p className="fade-item">
                <strong>{t("mail")}</strong>
                <br />
                <a href="mailto:kontakt@testarena-innlandet.no">
                  kontakt@testarena-innlandet.no
                </a>
              </p>
            </address>
            <div className="admin-login-wrapper fade-item">
              <NavLink to="/admin-login" className="admin-login">
                {t("admin")}
              </NavLink>
            </div>
          </div>

          {/* Kolonne 2 */}
          <div className="footer__column">
            <h3 className="fade-item">{t("find")}</h3>
            <ul>
              <li className="fade-item">
                <NavLink to="/">{t("home")}</NavLink>
              </li>
              <li className="fade-item">
                <NavLink to="/tjenester">{t("services")}</NavLink>
              </li>
              <li className="fade-item">
                <NavLink to="/om-oss">{t("about")}</NavLink>
              </li>
              <li className="fade-item">
                <NavLink to="/kontakt">{t("contactPage")}</NavLink>
              </li>
              <li className="fade-item">
                <NavLink to="/henvendelsesskjema">{t("form")}</NavLink>
              </li>
            </ul>
          </div>

          {/* Kolonne 3 */}
          <div className="footer__column">
            <h3 className="fade-item">{t("other")}</h3>
            <p className="fade-item">
              <strong>{t("some")}</strong>
            </p>
            <ul>
              <li className="fade-item">
                <a href="https://linkedin.com">LinkedIn</a>
              </li>
              <li className="fade-item">
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li className="fade-item">
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom fade-item">
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
