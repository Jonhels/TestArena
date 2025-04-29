import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import serviceResearchTranslations from "./serviceResearchTranslations";
import ntnuMap from "../../assets/images/ntnu-campus.png";
import "./ServiceResearch.css";

function ServiceResearch() {
  const { language } = useContext(LanguageContext);
  const t = (key) => serviceResearchTranslations[language][key] || key;

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
