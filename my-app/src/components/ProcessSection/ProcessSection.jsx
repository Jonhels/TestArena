import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import processTranslations from "./processTranslations";
import "./ProcessSection.css";

function ProcessSection() {
  const { language } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const t = (key) => processTranslations[language][key] || key;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`process-section ${isVisible ? "fade-in-visible" : ""} `}
    >
      <h2 className="process-section__title">{t("title")}</h2>
      <div className="process-section__steps">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`process-card ${isVisible ? "fade-in" : ""}`}
            style={{ animationDelay: `${step * 0.2}s` }}
          >
            <div className="process-card__badge">{step}</div>
            <div className="process-card__content">
              <h3 className="process-card__title">{t(`step${step}Title`)}</h3>
              <p className="process-card__text">{t(`step${step}Text`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;
