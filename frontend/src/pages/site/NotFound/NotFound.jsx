import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import notFoundImg from "../../../assets/illustrations/not-found.webp";
import notFoundTranslations from "./notFoundTranslations";
import "./NotFound.css";

const NotFoundPage = () => {
  const { language } = useContext(LanguageContext);
  const t = notFoundTranslations[language];

  return (
    <div className="not-found-container">
      <img src={notFoundImg} alt="404 not found" className="not-found-image" />
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">{t.message}</p>
      <Link to="/" className="not-found-button">
        {t.button}
      </Link>
    </div>
  );
};

export default NotFoundPage;
