import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import offerTranslations from "./offerTranslations";
import lightbulbBox from "../../assets/images/lightbulb-box.svg";
import "./OfferSection.css";
import { useNavigate } from "react-router-dom";

function OfferSection() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const t = (key) => offerTranslations[language][key] || key;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleButtonClick = () => {
    navigate("/tjenester");
  };

  return (
    <section ref={sectionRef}>
      <div className={`offer-section__container ${isVisible ? "visible" : ""}`}>
        <div
          className={`offer-section__card ${isVisible ? "visible" : ""}`}
          style={{ animationDelay: "0s" }}
        >
          <h2>{t("title")}</h2>
          <p>{t("text")}</p>
          <button className="offer-section__button" onClick={handleButtonClick}>
            {t("button")}
          </button>
        </div>
        <div
          className={`offer-section__image ${isVisible ? "visible" : ""}`}
          style={{ animationDelay: "0.2s" }}
        >
          <img src={lightbulbBox} alt="Lightbulb in box" />
        </div>
      </div>
    </section>
  );
}

export default OfferSection;
