import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import aboutHeroTranslations from "./aboutHeroTranslations";
import aboutHeroImg from "../../../../assets/images/about-hero.png";
import "./AboutHero.css";

function AboutHero() {
  const { language } = useContext(LanguageContext);
  const t = (key) => aboutHeroTranslations[language][key] || key;

  return (
    <section className="about-hero">
      <div className="about-hero__content">
        <h1 className="about-hero__title">{t("title")}</h1>
        <div className="about-hero__image-wrapper">
          <img
            src={aboutHeroImg}
            alt={t("alt")}
            className="about-hero__image"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
