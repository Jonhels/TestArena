import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import serviceSkillsTranslations from "./serviceSkillsTranslations";
import "./ServiceSkills.css";
import useScrollFadeInOnce from "../../../../hooks/useScrollFadeInOnce";

// Ikoner
import prehospitalIcon from "../../../../assets/icons/prehospitale.svg";
import researchIcon from "../../../../assets/icons/forskning.svg";
import collaborationIcon from "../../../../assets/icons/samhandling.svg";
import clinicalIcon from "../../../../assets/icons/klinisk.svg";
import vrIcon from "../../../../assets/icons/vr.svg";
import healthtechIcon from "../../../../assets/icons/helseteknologi.svg";
import multicenterIcon from "../../../../assets/icons/multisenter.svg";
import clinicalStudyIcon from "../../../../assets/icons/kliniske-studier.svg";

function ServiceSkills() {
  const { language } = useContext(LanguageContext);
  const t = (key) => serviceSkillsTranslations[language][key] || key;

  const [sectionRef, isVisible] = useScrollFadeInOnce(0.2);

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

  return (
    <section ref={sectionRef} className="service-skills">
      <h2 className="service-skills__title">
        {t("title1")} <br />
        <span className="subtitle">{t("title2")}</span>
      </h2>

      <div className="service-skills__grid">
        {t("skills").map((skill, index) => (
          <div
            key={index}
            className={`service-skills__card ${isVisible ? "fade-up" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="service-skills__icon-wrapper">
              <img src={icons[index]} alt="" />
            </div>
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceSkills;
