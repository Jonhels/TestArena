import { useContext, useRef, useState, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import serviceIntroTranslations from "./serviceIntroTranslations";
import lightbulbBox from "../../assets/images/lightbulb-box.svg";
import "./ServiceIntro.css";

function ServiceIntro() {
  const { language } = useContext(LanguageContext);
  const t = (key) => serviceIntroTranslations[language][key] || key;

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

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
          <p>{t("paragraph3")}</p>
          <p>{t("paragraph4")}</p>
        </div>
        <div className="service-intro__image fade-right">
          <img src={lightbulbBox} alt="Lightbulb in a box" />
        </div>
      </div>
    </section>
  );
}

export default ServiceIntro;
