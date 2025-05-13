import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import testcaseTranslations from "./testcaseTranslations";
import testcaseImg from "../../../../assets/images/meeting.png";
import "./TestCaseSection.css";
import { useNavigate } from "react-router-dom";
import useScrollFadeInOnce from "../../../../hooks/useScrollFadeInOnce";

function TestcaseSection() {
  const { language } = useContext(LanguageContext);
  const t = (key) => testcaseTranslations[language][key] || key;
  const navigate = useNavigate();
  const [sectionRef, isVisible] = useScrollFadeInOnce(0.2);

  return (
    <section className="testcase-section" ref={sectionRef}>
      <div className="testcase-section__container">
        <div
          className={`testcase-section__text fade-item ${
            isVisible ? "visible delay-1" : ""
          }`}
        >
          <h2 className={isVisible ? "fade-item visible delay-2" : ""}>
            {t("title")}
          </h2>
          <p className={isVisible ? "fade-item visible delay-3" : ""}>
            {t("text")}
          </p>
          <button
            onClick={() => navigate("/testcase")}
            className={`testcase-button fade-item ${
              isVisible ? "visible delay-4" : ""
            }`}
          >
            {t("button")}
          </button>
        </div>
        <div className="testcase-section__image">
          <img src={testcaseImg} alt="Testcase møte" />
        </div>
      </div>
    </section>
  );
}

export default TestcaseSection;
