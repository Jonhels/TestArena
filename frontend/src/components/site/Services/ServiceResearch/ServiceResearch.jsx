import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import serviceResearchTranslations from "./serviceResearchTranslations";
import ntnuMap from "../../../../assets/images/ntnu-campus.png";
import "./ServiceResearch.css";
import useScrollFadeInOnce from "../../../../hooks/useScrollFadeInOnce";

function ServiceResearch() {
  const { language } = useContext(LanguageContext);
  const t = (key) => serviceResearchTranslations[language][key] || key;

  const [ref, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={ref}
      className={`service-research ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="service-research__content">
        <h2>{t("title")}</h2>
        <div className="service-research__image-wrapper">
          <img src={ntnuMap} alt={t("altText")} />
        </div>
        <p className="service-research__note">{t("note")}</p>
      </div>
    </section>
  );
}

export default ServiceResearch;
