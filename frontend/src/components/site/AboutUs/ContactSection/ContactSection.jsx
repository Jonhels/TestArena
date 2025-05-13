import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import contactTranslations from "./contactTranslations";
import useScrollFadeInOnce from "../../../../hooks/useScrollFadeInOnce";

import peder from "../../../../assets/images/peder.png";
import tom from "../../../../assets/images/tom.png";
import mari from "../../../../assets/images/mari.png";

import "./ContactSection.css";

function ContactSection() {
  const { language } = useContext(LanguageContext);
  const t = contactTranslations[language];
  const [ref, isVisible] = useScrollFadeInOnce(0.3);

  const contacts = [
    {
      name: t.peder.name,
      title: t.peder.title,
      email: t.peder.email,
      image: peder,
    },
    {
      name: t.tom.name,
      title: t.tom.title,
      email: t.tom.email,
      image: tom,
    },
    {
      name: t.mari.name,
      title: t.mari.title,
      email: t.mari.email,
      image: mari,
    },
  ];

  return (
    <section
      ref={ref}
      className={`contact-section ${isVisible ? "fade-in-visible" : ""}`}
    >
      <h2 className="contact-section__title">{t.title}</h2>
      <div className="contact-section__grid">
        {contacts.map((person, i) => (
          <div className="contact-card fade-item" key={i}>
            <img
              src={person.image}
              alt={person.name}
              className="contact-card__image"
            />
            <h3>{person.name}</h3>
            <p className="contact-card__role">{person.title}</p>
            <a href={`mailto:${person.email}`} className="contact-card__email">
              {person.email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactSection;
