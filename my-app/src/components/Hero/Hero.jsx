import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import heroTranslations from "./heroTranslations";
import planning from "../../assets/images/planning.svg";
import "./Hero.css";

function Hero() {
  const { language } = useContext(LanguageContext);
  const t = (key) => heroTranslations[language][key] || key;

  return (
    <section className="hero">
      <div className="hero__text-container">
        <p className="hero__tagline">{t("tagline")}</p>
        <h1 className="hero__title">{t("title")}</h1>
        <p className="hero__description">{t("description")}</p>
      </div>
      <div className="hero__image-container">
        <img src={planning} alt="Planning illustration" />
      </div>
    </section>
  );
}

export default Hero;
