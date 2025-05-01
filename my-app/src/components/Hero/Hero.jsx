import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import heroTranslations from "./heroTranslations";
import planning from "../../assets/images/planning.svg";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import "./Hero.css";

function Hero() {
  const { language } = useContext(LanguageContext);
  const [sectionRef, isVisible] = useScrollFadeInOnce();
  const t = (key) => heroTranslations[language][key] || key;

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__text-container">
        <p className={`hero__tagline ${isVisible ? "fade-in delay-1" : ""}`}>
          {t("tagline")}
        </p>
        <h1 className={`hero__title ${isVisible ? "fade-in delay-2" : ""}`}>
          {t("title")}
        </h1>
        <p
          className={`hero__description ${isVisible ? "fade-in delay-3" : ""}`}
        >
          {t("description")}
        </p>
      </div>
      <div
        className={`hero__image-container ${
          isVisible ? "fade-in delay-4" : ""
        }`}
      >
        <img src={planning} alt="Planning illustration" />
      </div>
    </section>
  );
}

export default Hero;
