import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import ideaSupportTranslations from "./ideaSupportTranslations";
import ideaSupportImg from "../../../../assets/illustrations/planning.svg";
import useScrollFadeInOnce from "../../../../hooks/useScrollFadeInOnce";
import "./IdeaSupport.css";

function IdeaSupport() {
  const { language } = useContext(LanguageContext);
  const t = (key) => ideaSupportTranslations[language][key] || key;

  const [sectionRef, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={sectionRef}
      className={`idea-support ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="idea-support__container">
        <div className="idea-support__image fade-left">
          <img src={ideaSupportImg} alt={t("imageAlt")} />
        </div>
        <div className="idea-support__text fade-right">
          <h2>{t("title")}</h2>
          <p>{t("paragraph")}</p>
        </div>
      </div>
    </section>
  );
}

export default IdeaSupport;
