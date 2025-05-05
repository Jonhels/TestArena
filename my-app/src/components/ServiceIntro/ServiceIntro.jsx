import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import serviceIntroTranslations from "./serviceIntroTranslations";
import offersImg from "../../assets/images/offers.png";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import "./ServiceIntro.css";

function ServiceIntro() {
  const { language } = useContext(LanguageContext);
  const t = (key) => serviceIntroTranslations[language][key] || key;

  const [sectionRef, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={sectionRef}
      className={`service-intro ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="service-intro__content">
        <div className="service-intro__text fade-left">
          <h2>{t("title")}</h2>
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
        <div className="service-intro__image fade-right">
          <img src={offersImg} alt={t("imageAlt") || "Illustrasjon"} />
        </div>
      </div>
    </section>
  );
}

export default ServiceIntro;
