import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import faqTranslations from "./faqTranslations";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import "./Faq.css";

function Faq() {
  const { language } = useContext(LanguageContext);
  const t = faqTranslations[language];
  const [ref, isVisible] = useScrollFadeInOnce(0.3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section ref={ref} className={`faq ${isVisible ? "fade-in-visible" : ""}`}>
      <h2 className="faq__title">FAQ</h2>

      {isMobile ? (
        <ul className="faq__accordion">
          {t.questions.map((item, index) => (
            <li
              key={index}
              className={`faq__accordion-item ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => toggleIndex(index)}
            >
              <div className="faq__accordion-header">
                <span>{item.question}</span>
                <span className="faq__icon">
                  {index === activeIndex ? "−" : "+"}
                </span>
              </div>
              {index === activeIndex && (
                <div className="faq__accordion-content">
                  <p>{item.answer}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="faq__container">
          <ul className="faq__tabs">
            {t.questions.map((item, index) => (
              <li
                key={index}
                className={`faq__tab ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span>{item.question}</span>
                <span className="faq__icon">
                  {index === activeIndex ? "−" : "+"}
                </span>
              </li>
            ))}
          </ul>
          <div className="faq__content">
            <h3>{t.questions[activeIndex].question}</h3>
            <p>{t.questions[activeIndex].answer}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Faq;
