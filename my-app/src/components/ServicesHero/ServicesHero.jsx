import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import servicesHeroTranslations from "./servicesHeroTranslations";
import serviceHeroImg from "../../assets/images/services-hero.png";
import "./ServicesHero.css";

function ServiceHero() {
  const { language } = useContext(LanguageContext);
  const t = (key) => servicesHeroTranslations[language][key] || key;

  return (
    <section className="service-hero">
      <img
        src={serviceHeroImg}
        alt={t("alt")}
        className="service-hero__background"
      />
      <div className="service-hero__text-container">
        <h1>{t("title")}</h1>
      </div>
    </section>
  );
}

export default ServiceHero;
