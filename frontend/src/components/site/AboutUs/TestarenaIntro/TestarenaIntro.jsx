import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import testarenaIntroTranslations from "./testarenaIntroTranslations";
import quoteImg from "../../../../assets/icons/quote.svg";
import useScrollFadeInOnce from "../../../../hooks/useScrollFadeInOnce";
import "./TestarenaIntro.css";

function TestarenaIntro() {
  const { language } = useContext(LanguageContext);
  const t = testarenaIntroTranslations[language];
  const [ref, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={ref}
      className={`testarena-intro ${isVisible ? "fade-in-visible" : ""}`}
    >
      <div className="testarena-intro__box">
        <h3 className="testarena-intro__title">{t.title}</h3>
        <p className="testarena-intro__text">{t.paragraph1}</p>
        <p className="testarena-intro__text">{t.paragraph2}</p>
      </div>

      <div className="testarena-intro__quote-wrapper">
        <img
          src={quoteImg}
          alt="quote"
          className="testarena-intro__quote-icon"
        />
        <blockquote className="testarena-intro__quote">
          <p>{t.quote}</p>
          <footer className="testarena-intro__author">
            –{" "}
            <strong>
              <em>{t.author}</em>
            </strong>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export default TestarenaIntro;
