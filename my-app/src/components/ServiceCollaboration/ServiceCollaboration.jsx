import { useContext, useRef, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import serviceCollaborationTranslations from "./serviceCollaborationTranslations";
import "./ServiceCollaboration.css";

function ServiceCollaboration() {
  const { language } = useContext(LanguageContext);
  const t = serviceCollaborationTranslations[language];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`collaboration ${isVisible ? "fade-in" : ""}`}
    >
      <h2 className="collaboration__title">{t.title}</h2>
      <p className="collaboration__description">{t.description}</p>

      <div className="collaboration__content">
        <div className="collaboration__panel panel-blue">
          <h3>{t.panel1.title}</h3>
          <p className="price">{t.panel1.price}</p>
          <ul>
            {t.panel1.features.map((feature, index) => (
              <li key={index}>✔ {feature}</li>
            ))}
          </ul>
        </div>

        <div className="collaboration__panel panel-salmon">
          <h3>{t.panel2.title}</h3>
          <p className="price">{t.panel2.price}</p>
          <ul>
            {t.panel2.features.map((feature, index) => (
              <li key={index}>✔ {feature}</li>
            ))}
          </ul>
        </div>

        <div className="collaboration__info">
          <h4>{t.info.title}</h4>
          <p>{t.info.text}</p>
        </div>
      </div>
    </section>
  );
}

export default ServiceCollaboration;
