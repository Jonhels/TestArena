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
        <div className="footer__columns">
          <div className="footer__column">
            <img
              src={logo}
              alt="Testarena Innlandet logo"
              className="footer__logo fade-item"
              style={{ animationDelay: "0.2s" }}
            />
            <h3 className="fade-item" style={{ animationDelay: "0.4s" }}>
              {t("contact")}
            </h3>
            <address className="footer__address">
              <p className="fade-item" style={{ animationDelay: "0.6s" }}>
                <strong>{t("mail")}</strong>
                <br />
                <a href="mailto:kontakt@testarena-innlandet.no">
                  kontakt@testarena-innlandet.no
                </a>
              </p>
              <p className="fade-item" style={{ animationDelay: "0.8s" }}>
                <strong>{t("phone")}</strong>
                <br />
                <a href="tel:+4700000000">+47 000 00 000</a>
              </p>
              <p className="fade-item" style={{ animationDelay: "1s" }}>
                <strong>{t("address")}</strong>
                <br />
                <a
                  href="https://maps.app.goo.gl/SB3ZYvFw1NUBStqx5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Raufossvegen 40, 2821 Gjøvik
                </a>
              </p>
            </address>
          </div>

          <div className="footer__column">
            <h3 className="fade-item" style={{ animationDelay: "0.4s" }}>
              {t("find")}
            </h3>
            <ul>
              <li className="fade-item" style={{ animationDelay: "0.6s" }}>
                <NavLink to="/">{t("home")}</NavLink>
              </li>
              <li className="fade-item" style={{ animationDelay: "0.8s" }}>
                <NavLink to="/tjenester">{t("services")}</NavLink>
              </li>
              <li className="fade-item" style={{ animationDelay: "1s" }}>
                <NavLink to="/om-oss">{t("about")}</NavLink>
              </li>
              <li className="fade-item" style={{ animationDelay: "1.2s" }}>
                <NavLink to="/kontakt">{t("contactPage")}</NavLink>
              </li>
              <li className="fade-item" style={{ animationDelay: "1.4s" }}>
                <NavLink to="/henvendelsesskjema">{t("form")}</NavLink>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="fade-item" style={{ animationDelay: "0.4s" }}>
              {t("other")}
            </h3>
            <p className="fade-item" style={{ animationDelay: "0.6s" }}>
              <strong>{t("some")}</strong>
            </p>
            <ul>
              <li className="fade-item" style={{ animationDelay: "0.8s" }}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li className="fade-item" style={{ animationDelay: "1s" }}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li className="fade-item" style={{ animationDelay: "1.2s" }}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <div
              className="admin-login-wrapper fade-item"
              style={{ animationDelay: "1.4s" }}
            >
              <NavLink to="/admin-login" className="admin-login">
                {t("admin")}
              </NavLink>
            </div>
          </div>
        </div>

        <div
          className="footer__bottom fade-item"
          style={{ animationDelay: "1.6s" }}
        >
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
