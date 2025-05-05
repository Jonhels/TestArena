import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import businessNeedTranslations from "./businessNeedTranslations";
import businessImg from "../../assets/images/discussing.svg";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import "./BusinessNeedSection.css";

function BusinessNeedSection() {
  const { language } = useContext(LanguageContext);
  const t = businessNeedTranslations[language];
  const [ref, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={ref}
      className={`business-need ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="business-need__content">
        <div className="business-need__text fade-left">
          <h2>{t.title}</h2>
          <p>{t.paragraph1}</p>
          <p>{t.paragraph2}</p>
          <p>{t.paragraph3}</p>
        </div>
        <div className="business-need__image fade-right">
          <img src={businessImg} alt={t.alt} className="mirrored" />
        </div>
      </div>
    </section>
  );
}

export default BusinessNeedSection;
