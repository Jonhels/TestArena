import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import serviceCollaborationTranslations from "./serviceCollaborationTranslations";
import useScrollFadeInOnce from "../../hooks/useScrollFadeInOnce";
import "./ServiceCollaboration.css";

function ServiceCollaboration() {
  const { language } = useContext(LanguageContext);
  const t = serviceCollaborationTranslations[language];
  const [ref, isVisible] = useScrollFadeInOnce(0.3);

  return (
    <section
      ref={ref}
      className={`service-collaboration ${isVisible ? "fade-in-visible" : ""}`}
    >
      <h2 className="service-collaboration__title">{t.title}</h2>
      <p className="service-collaboration__description">{t.description}</p>

      <div className="service-collaboration__content">
        <div className="service-collaboration__panels">
          <div className="collab-panel fade-item delay-1">
            <h3>{t.panel1.title}</h3>
            <p className="price">
              <span className="price__amount">12 500 kr</span>
              <span className="price__small">+ mva</span>
            </p>
            <ul>
              {t.panel1.features.map((feature, i) => (
                <li key={i}>
                  <span className="checkmark">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="collab-panel fade-item delay-2">
            <h3>{t.panel2.title}</h3>
            <p className="price">
              <span className="price__amount">22 500 kr</span>
              <span className="price__small">+ mva</span>
            </p>
            <ul>
              {t.panel2.features.map((feature, i) => (
                <li key={i}>
                  <span className="checkmark">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="collab-info fade-item delay-3">
          <h4>{t.info.title}</h4>
          <p>{t.info.text1}</p>
          <p>{t.info.text2}</p>
        </div>
      </div>
    </section>
  );
}

export default ServiceCollaboration;
