import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import networkTranslations from "./networkTranslations";
import norwayHealthtechLogo from "../../assets/images/norwayhealthtech-logo.svg";
import vaagerLogo from "../../assets/images/vaager-logo.svg";
import ksLogo from "../../assets/images/ks-logo.svg";
import helsetjenestenLogo from "../../assets/images/helsetjenesten-logo.svg";
import gjovikregionenLogo from "../../assets/images/gjovikregionen-logo.svg";
import "./NetworkSection.css";

function NetworkSection() {
  const { language } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const t = (key) => networkTranslations[language][key] || key;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const partners = [
    {
      src: norwayHealthtechLogo,
      alt: "Norway Health Tech",
      link: "https://www.norwayhealthtech.com",
    },
    { src: vaagerLogo, alt: "Vaager Innovasjon", link: "https://vaager.no" },
    { src: ksLogo, alt: "KS", link: "https://www.ks.no" },
    {
      src: helsetjenestenLogo,
      alt: "Helsetjenestens Driftsorganisasjon",
      link: "https://helsenorge.no",
    },
    {
      src: gjovikregionenLogo,
      alt: "Gjøvikregionen",
      link: "https://www.gjovikregionen.no",
    },
  ];

  return (
    <section
      className={`network-section ${isVisible ? "fade-in-visible" : ""}`}
      ref={sectionRef}
    >
      <h2 className="network-section__title">{t("title")}</h2>
      <p className="network-section__subtitle">{t("subtitle")}</p>
      <div className="network-section__logos">
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`network-section__logo ${isVisible ? "fade-in" : ""}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img src={partner.src} alt={partner.alt} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default NetworkSection;
