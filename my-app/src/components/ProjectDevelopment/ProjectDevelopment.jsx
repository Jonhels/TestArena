import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import developmentTranslations from "./developmentTranslations";
import teamImage from "../../assets/images/group-photo.png";
import "./ProjectDevelopment.css";

function ProjectDevelopment() {
  const { language } = useContext(LanguageContext);
  const t = developmentTranslations[language];
  const [ref, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={ref}
      className={`project-development ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="project-development__image-wrapper">
        <img src={teamImage} alt={t.altText} />
      </div>

      <div className="project-development__text">
        <h2>{t.title}</h2>
        <p>{t.paragraph1}</p>
        <p>{t.paragraph2}</p>
        <p>{t.paragraph3}</p>
      </div>
    </section>
  );
}

export default ProjectDevelopment;
