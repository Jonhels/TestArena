import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import challengeTranslations from "./challengeTranslations";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import discussingImg from "../../assets/images/discussing.svg";
import "./ChallengeSection.css";

function ChallengeSection() {
  const { language } = useContext(LanguageContext);
  const [sectionRef, isVisible] = useScrollFadeInOnce();
  const t = (key) => challengeTranslations[language][key] || key;

  return (
    <section
      ref={sectionRef}
      className={`challenge-section ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="challenge-section__content">
        <div className="challenge-section__image">
          <img src={discussingImg} alt="Discussion Illustration" />
        </div>
        <div className="challenge-section__text">
          <h2 className={isVisible ? "fade-in delay-1" : ""}>{t("title")}</h2>
          <p className={isVisible ? "fade-in delay-2" : ""}>
            {t("paragraph1")}
          </p>
          <p className={isVisible ? "fade-in delay-3" : ""}>
            {t("paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChallengeSection;
