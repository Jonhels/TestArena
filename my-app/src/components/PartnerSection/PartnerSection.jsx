import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import partnerTranslations from "./partnerTranslations";
import "./PartnerSection.css";
import sykehusetInnlandetLogo from "../../assets/images/sykehusetinnlandet-logo.svg";
import helseinnLogo from "../../assets/images/helseinn-logo.svg";
import ntnuLogo from "../../assets/images/ntnu-logo.svg";

function PartnerSection() {
  const { language } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const t = (key) => partnerTranslations[language][key] || key;

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
      className={`partners ${isVisible ? "fade-in-visible" : ""}`}
    >
      <p className="partners__intro">{t("intro")}</p>
      <div className="partners__logos">
        <a
          href="https://sykehuset-innlandet.no"
          target="_blank"
          rel="noopener noreferrer"
          className="partner-card"
        >
          <img src={sykehusetInnlandetLogo} alt="Sykehuset Innlandet logo" />
        </a>
        <a
          href="https://helseinn.no"
          target="_blank"
          rel="noopener noreferrer"
          className="partner-card"
        >
          <img src={helseinnLogo} alt="HelseINN logo" />
        </a>
        <a
          href="https://ntnu.no"
          target="_blank"
          rel="noopener noreferrer"
          className="partner-card"
        >
          <img src={ntnuLogo} alt="NTNU logo" />
        </a>
      </div>
    </section>
  );
}

export default PartnerSection;
