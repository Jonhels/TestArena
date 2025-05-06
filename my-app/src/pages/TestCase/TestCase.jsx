import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import testcaseTranslations from "./testcaseTranslations";
import "./TestCase.css";
import testcaseImg from "../../assets/images/meeting.png";
import edvardImg from "../../assets/images/edvard-dahl.png";
import { Link } from "react-router-dom";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";

function TestCase() {
  const { language } = useContext(LanguageContext);
  const t = (key) => testcaseTranslations[language][key] || key;

  const [ref, isVisible] = useScrollFadeInOnce(0.2);

  return (
    <div
      className={`testcase-article ${isVisible ? "fade-in-visible" : ""}`}
      ref={ref}
    >
      <div className="testcase-article__backlink fade-item delay-1">
        <Link to="/" className="back-button">
          <span className="back-button__icon">←</span>
          <span className="back-button__text">{t("back")}</span>
        </Link>
      </div>

      <div className="testcase-article__content">
        <h1 className="fade-item delay-1">{t("title")}</h1>
        <p className="lead fade-item delay-2">{t("intro")}</p>

        <div className="testcase-article__image-block fade-item delay-3">
          <img src={testcaseImg} alt={t("imageAlt")} />
          <span className="caption">{t("caption")}</span>
        </div>

        <section className="testcase-article__quote-section fade-item delay-4">
          <div className="quote-content">
            <p>
              <strong>{t("quoteName")}</strong> {t("quoteTitle")}
            </p>
            <p>{t("quote1")}</p>
            <p>{t("quote2")}</p>
            <p>
              <strong>{t("question")}</strong> {t("answer")}
            </p>
          </div>
          <div className="quote-image">
            <img src={edvardImg} alt={t("quoteName")} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default TestCase;
