import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import translations from "./stepFourSummaryTranslations";
import "./StepFourSummary.css";

const StepFourSummary = ({ onBack, onSubmit }) => {
  const { getValues } = useFormContext();
  const { language } = useContext(LanguageContext);
  const t = translations[language.toLowerCase()] || translations.no;

  const data = getValues();

  return (
    <div className="form-step">
      <h2 className="form-step-title">{t.title}</h2>
      <p className="form-step-subtitle">{t.subtitle}</p>

      {/* Kontaktinfo */}
      <div className="summary-section">
        <h3>{t.contactInfo}</h3>
        <div className="summary-columns">
          <div>
            <p>
              <strong>{t.companyName}:</strong> {data.companyName}
            </p>
            <p>
              <strong>{t.companyCity}:</strong> {data.companyCity}
            </p>
            <p>
              <strong>{t.companyWebsite}:</strong> {data.companyWebsite}
            </p>
          </div>
          <div>
            <p>
              <strong>{t.contactName}:</strong> {data.contactName}
            </p>
            <p>
              <strong>{t.contactEmail}:</strong> {data.contactEmail}
            </p>
            <p>
              <strong>{t.contactPhone}:</strong> {data.contactPhone}
            </p>
          </div>
        </div>
      </div>

      {/* Produktinfo */}
      <div className="summary-section">
        <h3>{t.productInfo}</h3>
        <p>
          <strong>{t.productTitle}:</strong> {data.productTitle}
        </p>
        <p>
          <strong>{t.productDescription}:</strong> {data.productDescription}
        </p>
        <p>
          <strong>{t.developmentStage}:</strong> {data.developmentStage}
        </p>
        <p>
          <strong>{t.productType}:</strong>{" "}
          {(data.productType || []).join(", ")}
        </p>
        <p>
          <strong>{t.partnerDescription}:</strong> {data.partnerDescription}
        </p>
        <p>
          <strong>{t.storageDescription}:</strong> {data.storageDescription}
        </p>
        <p>
          <strong>{t.projectOwner}:</strong> {data.projectOwner}
        </p>
        <p>
          <strong>{t.readyToUse}:</strong> {data.readyToUse}
        </p>
      </div>

      {/* Tilleggsinfo */}
      <div className="summary-section">
        <h3>{t.additionalInfo}</h3>
        <p>
          <strong>{t.userInvolvement}:</strong> {data.userInvolvement}
        </p>
        <p>
          <strong>{t.testingInfo}:</strong> {data.testingInfo}
        </p>
        <p>
          <strong>{t.marketInfo}:</strong> {data.marketInfo}
        </p>
        <p>
          <strong>{t.testedElsewhere}:</strong> {data.testedElsewhere}
        </p>
        <p>
          <strong>{t.explanationIfTested}:</strong> {data.explanationIfTested}
        </p>
        <p>
          <strong>{t.collaboration}:</strong> {data.collaboration}
        </p>
        <p>
          <strong>{t.otherComments}:</strong> {data.otherComments}
        </p>
        <p>
          <strong>{t.fileUploadLabel}:</strong>{" "}
          {data.attachment?.[0]?.name || "-"}
        </p>
      </div>

      {/* Navigasjon */}
      <div className="form-button-row">
        <button className="form-back-button" type="button" onClick={onBack}>
          {t.back}
        </button>
        <button className="form-next-button" type="button" onClick={onSubmit}>
          {t.submit}
        </button>
      </div>
    </div>
  );
};

StepFourSummary.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StepFourSummary;
