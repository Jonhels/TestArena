import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import contactBannerTranslations from "./contactBannerTranslations";
import "./ContactBanner.css";
import listImg from "../../../../assets/illustrations/list.svg";
import { NavLink } from "react-router-dom";

function ContactBanner() {
  const { language } = useContext(LanguageContext);

  const t = (key) => contactBannerTranslations[language][key] || key;

  return (
    <section className="contact-banner">
      <div className="contact-banner__container">
        <div className="contact-banner__content">
          <h2>{t("contactTitle")}</h2>
          <p>{t("contactText")}</p>
          <NavLink to="/henvendelsesskjema" className="contact-banner__button">
            {t("contactButton")}
          </NavLink>
        </div>
        <div className="contact-banner__image">
          <img src={listImg} alt="Checklist illustration" />
        </div>
      </div>
    </section>
  );
}

export default ContactBanner;
