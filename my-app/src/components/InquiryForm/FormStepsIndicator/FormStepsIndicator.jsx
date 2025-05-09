import PropTypes from "prop-types";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import translations from "./formStepsTranslations";
import "./FormStepsIndicator.css";

const FormStepsIndicator = ({ currentStep }) => {
  const { language } = useContext(LanguageContext);
  const steps = translations[language] || translations.no;

  return (
    <div className="form-steps-indicator">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={index} className="form-step-item">
            <div
              className={`step-circle ${
                isActive ? "active" : isCompleted ? "completed" : ""
              }`}
            />
            <p className={`step-label ${isActive ? "active" : ""}`}>{label}</p>
            {stepNum !== steps.length && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
};

FormStepsIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default FormStepsIndicator;
