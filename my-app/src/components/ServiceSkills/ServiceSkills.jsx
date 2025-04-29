import { useContext, useRef, useState, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import serviceSkillsTranslations from "./serviceSkillsTranslations";
import "./ServiceSkills.css";

import prehospitalIcon from "../../assets/images/prehospitale.svg";
import researchIcon from "../../assets/images/forskning.svg";
import collaborationIcon from "../../assets/images/samhandling.svg";
import clinicalIcon from "../../assets/images/klinisk.svg";
import vrIcon from "../../assets/images/vr.svg";
import healthtechIcon from "../../assets/images/helseteknologi.svg";
import multicenterIcon from "../../assets/images/multisenter.svg";
import clinicalStudyIcon from "../../assets/images/kliniske-studier.svg";

function ServiceSkills() {
  const { language } = useContext(LanguageContext);
  const t = (key) => serviceSkillsTranslations[language][key] || key;

  const icons = [
    prehospitalIcon,
    researchIcon,
    collaborationIcon,
    clinicalIcon,
    vrIcon,
    healthtechIcon,
    multicenterIcon,
    clinicalStudyIcon,
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section ref={sectionRef} className="service-skills">
      <h2 className="service-skills__title">{t("title")}</h2>
      <div className="service-skills__grid">
        {t("skills").map((skill, index) => (
          <div
            key={index}
            className={`service-skills__card ${isVisible ? "fade-up" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={icons[index]} alt="" />
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceSkills;
