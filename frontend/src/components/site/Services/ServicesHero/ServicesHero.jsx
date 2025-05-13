import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import servicesHeroTranslations from "./servicesHeroTranslations";
import serviceHeroImg from "../../../../assets/images/services-hero.png";
import "./ServicesHero.css";

function ServiceHero() {
  const { language } = useContext(LanguageContext);
  const t = (key) => servicesHeroTranslations[language][key] || key;

  return (
    <section className="services-hero">
      <div className="services-hero__content">
        <h1 className="services-hero__title">{t("title")}</h1>
        <div className="services-hero__image-wrapper">
          <img
            src={serviceHeroImg}
            alt={t("alt")}
            className="services-hero__image"
          />
        </div>
      </div>
    </section>
  );
}

export default ServiceHero;
