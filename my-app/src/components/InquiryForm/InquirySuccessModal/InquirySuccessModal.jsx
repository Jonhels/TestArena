import { useContext } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../../context/LanguageContext";
import inquirySuccessModalTranslations from "./inquirySuccessModalTranslations";
import "./InquirySuccessModal.css";

const InquirySuccessModal = ({ onClose }) => {
  const { language } = useContext(LanguageContext);
  const t =
    inquirySuccessModalTranslations[language?.toLowerCase()] ||
    inquirySuccessModalTranslations.no;

  return (
    <div className="modal-overlay">
      <div className="modal-box animate-in">
        <button className="modal-close" onClick={onClose} aria-label="Lukk">
          &times;
        </button>
        <div className="modal-icon" role="img" aria-label={t.alt}>
          &#10003;
        </div>
        <h2 className="modal-title">{t.title}</h2>
        <p className="modal-text">{t.text}</p>
        <button className="modal-button" onClick={onClose}>
          {t.close}
        </button>
      </div>
    </div>
  );
};

InquirySuccessModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default InquirySuccessModal;
