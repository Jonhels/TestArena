import { useFormContext } from "react-hook-form";
import { useContext, useState } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import translations from "./stepThreeAdditionalInfoTranslations";
import PropTypes from "prop-types";
import "./StepThreeAdditionalInfo.css";

const StepThreeAdditionalInfo = ({ onNext, onBack }) => {
  const { register, watch } = useFormContext();
  const { language } = useContext(LanguageContext);
  const t = translations[language.toLowerCase()] || translations.no;

  const selectedFile = watch("attachment");
  const [activeTooltip, setActiveTooltip] = useState(null);
  const toggleTooltip = (field) => {
    setActiveTooltip((prev) => (prev === field ? null : field));
  };

  const renderTooltipIcon = (fieldKey) => (
    <span
      className={`info-icon ${activeTooltip === fieldKey ? "active" : ""}`}
      role="button"
      tabIndex="0"
      onClick={() => toggleTooltip(fieldKey)}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) toggleTooltip(fieldKey);
      }}
    >
      ?<span className="tooltip">{t.tooltips?.[fieldKey]}</span>
    </span>
  );

  return (
    <form
      className="form-step"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="form-step-title">{t.title}</h2>

      {/* User Involvement */}
      <div className="form-field-wrapper">
        <label htmlFor="userInvolvement" className="form-label">
          {t.userInvolvement}
          {renderTooltipIcon("userInvolvement")}
        </label>
        <textarea
          id="userInvolvement"
          className="form-textarea"
          placeholder={t.userInvolvement}
          maxLength={150}
          {...register("userInvolvement")}
        />
      </div>

      {/* Testing Info */}
      <div className="form-field-wrapper">
        <label htmlFor="testingInfo" className="form-label">
          {t.testingInfo}
          {renderTooltipIcon("testingInfo")}
        </label>
        <textarea
          id="testingInfo"
          className="form-textarea"
          placeholder={t.testingInfo}
          maxLength={150}
          {...register("testingInfo")}
        />
      </div>

      {/* Market Info */}
      <div className="form-field-wrapper">
        <label htmlFor="marketInfo" className="form-label">
          {t.marketInfo}
          {renderTooltipIcon("marketInfo")}
        </label>
        <textarea
          id="marketInfo"
          className="form-textarea"
          placeholder={t.marketInfo}
          maxLength={150}
          {...register("marketInfo")}
        />
      </div>

      {/* Tested Elsewhere */}
      <div className="option-group">
        <p className="option-group-title">{t.testedElsewhere}</p>
        <label className="option-item">
          <input type="radio" value="yes" {...register("testedElsewhere")} />
          {t.yes}
        </label>
        <label className="option-item">
          <input type="radio" value="no" {...register("testedElsewhere")} />
          {t.no}
        </label>
      </div>

      {/* Explanation */}
      <div className="form-field-wrapper">
        <label htmlFor="explanationIfTested" className="form-label">
          {t.explanationIfTested}
        </label>
        <textarea
          id="explanationIfTested"
          className="form-textarea"
          placeholder={t.explanationIfTested}
          maxLength={150}
          {...register("explanationIfTested")}
        />
      </div>

      {/* Collaboration */}
      <div className="option-group">
        <p className="option-group-title">{t.collaboration}</p>
        <label className="option-item">
          <input type="radio" value="yes" {...register("collaboration")} />
          {t.yes}
        </label>
        <label className="option-item">
          <input type="radio" value="no" {...register("collaboration")} />
          {t.no}
        </label>
      </div>

      {/* Other Comments */}
      <div className="form-field-wrapper">
        <label htmlFor="otherComments" className="form-label">
          {t.otherComments}
        </label>
        <textarea
          id="otherComments"
          className="form-textarea"
          placeholder={t.otherComments}
          maxLength={150}
          {...register("otherComments")}
        />
      </div>

      {/* Attachment */}
      <div className="form-field-wrapper">
        <label htmlFor="attachment" className="form-label">
          {t.fileUploadLabel}
          {renderTooltipIcon("fileUploadLabel")}
        </label>
        <input
          id="attachment"
          type="file"
          className="form-input"
          {...register("attachment")}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
        />
        {selectedFile?.[0] && (
          <p className="char-count file-upload-selected">
            {selectedFile[0].name}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="form-button-row">
        <button type="button" className="form-back-button" onClick={onBack}>
          {t.back}
        </button>
        <button type="submit" className="form-next-button">
          {t.next}
        </button>
      </div>
    </form>
  );
};

StepThreeAdditionalInfo.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default StepThreeAdditionalInfo;
