import { useFormContext } from "react-hook-form";
import { useContext, useState } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import translations from "./stepTwoProductInfoTranslations";
import PropTypes from "prop-types";
import "./StepTwoProductInfo.css";

const StepTwoProductInfo = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const { language } = useContext(LanguageContext);
  const t = translations[language.toLowerCase()] || translations.no;

  const [activeTooltip, setActiveTooltip] = useState(null);
  const toggleTooltip = (field) => {
    setActiveTooltip((prev) => (prev === field ? null : field));
  };

  const onValid = () => onNext();

  const productDescription = watch("productDescription") || "";
  const partnerDescription = watch("partnerDescription") || "";
  const storageDescription = watch("storageDescription") || "";

  return (
    <form className="form-step" onSubmit={handleSubmit(onValid)} noValidate>
      <h2 className="form-step-title">{t.title}</h2>

      {/* Tittel */}
      <div className="form-field-wrapper">
        <label htmlFor="productTitle" className="form-label">
          {t.productTitle}*
        </label>
        <input
          id="productTitle"
          className="form-input"
          type="text"
          placeholder={t.productTitle}
          aria-invalid={!!errors.productTitle}
          aria-describedby={
            errors.productTitle ? "productTitle-error" : undefined
          }
          {...register("productTitle", { required: t.errors.productTitle })}
        />
        {errors.productTitle && (
          <p id="productTitle-error" className="form-error">
            {errors.productTitle.message}
          </p>
        )}
      </div>

      {/* Produktbeskrivelse */}
      <div className="form-field-wrapper">
        <label htmlFor="productDescription" className="form-label">
          {t.productDescription}
          <span
            className={`info-icon ${
              activeTooltip === "productDescription" ? "active" : ""
            }`}
            role="button"
            tabIndex="0"
            onClick={() => toggleTooltip("productDescription")}
            onKeyDown={(e) =>
              ["Enter", " "].includes(e.key)
                ? toggleTooltip("productDescription")
                : null
            }
          >
            ?<span className="tooltip">{t.tooltips.productDescription}</span>
          </span>
        </label>
        <textarea
          id="productDescription"
          className="form-textarea"
          placeholder={t.productDescription}
          maxLength={150}
          {...register("productDescription")}
        />
        <p className="char-count">{productDescription.length} av 150</p>
      </div>

      {/* Utviklingsstatus */}
      <div className="option-group">
        <p className="option-group-title">{t.developmentStage}*</p>
        {t.stages.map((stage) => (
          <label key={stage} className="option-item">
            <input
              type="radio"
              value={stage}
              {...register("developmentStage", {
                required: t.errors.developmentStage,
              })}
            />
            {stage}
          </label>
        ))}
        {errors.developmentStage && (
          <p className="form-error">{errors.developmentStage.message}</p>
        )}
      </div>

      {/* Produkttyper */}
      <div className="option-group">
        <p className="option-group-title">{t.productType}*</p>
        {t.types.map((type) => (
          <label key={type} className="option-item">
            <input
              type="checkbox"
              value={type}
              {...register("productType", {
                required: t.errors.productType,
              })}
            />
            {type}
          </label>
        ))}
        {errors.productType && (
          <p className="form-error">{errors.productType.message}</p>
        )}
      </div>

      {/* Samarbeidspartner */}
      <div className="form-field-wrapper">
        <label htmlFor="partnerDescription" className="form-label">
          {t.partnerDescription}
          <span
            className={`info-icon ${
              activeTooltip === "partnerDescription" ? "active" : ""
            }`}
            role="button"
            tabIndex="0"
            onClick={() => toggleTooltip("partnerDescription")}
            onKeyDown={(e) =>
              ["Enter", " "].includes(e.key)
                ? toggleTooltip("partnerDescription")
                : null
            }
          >
            ?
            <span className="tooltip">
              Beskriv behov for samarbeid og hvilken kompetanse dere har – som
              teknisk erfaring, testkapasitet eller fagkunnskap.
            </span>
          </span>
        </label>
        <textarea
          id="partnerDescription"
          className="form-textarea"
          placeholder={t.partnerDescription}
          maxLength={750}
          {...register("partnerDescription")}
        />
        <p className="char-count">{partnerDescription.length} av 750</p>
      </div>

      {/* Lagring */}
      <div className="form-field-wrapper">
        <label htmlFor="storageDescription" className="form-label">
          {t.storageDescription}
          <span
            className={`info-icon ${
              activeTooltip === "storageDescription" ? "active" : ""
            }`}
            role="button"
            tabIndex="0"
            onClick={() => toggleTooltip("storageDescription")}
            onKeyDown={(e) =>
              ["Enter", " "].includes(e.key)
                ? toggleTooltip("storageDescription")
                : null
            }
          >
            ?
            <span className="tooltip">
              Beskriv hvordan løsningen håndterer data – hvor det lagres og hvem
              som har tilgang.
            </span>
          </span>
        </label>
        <textarea
          id="storageDescription"
          className="form-textarea"
          placeholder={t.storageDescription}
          maxLength={150}
          {...register("storageDescription")}
        />
        <p className="char-count">{storageDescription.length} av 150</p>
      </div>

      {/* Eierskap */}
      <div className="form-field-wrapper">
        <label htmlFor="projectOwner" className="form-label">
          {t.projectOwner}
        </label>
        <input
          id="projectOwner"
          className="form-input"
          type="text"
          placeholder={t.projectOwner}
          {...register("projectOwner")}
        />
      </div>

      {/* Klar til bruk */}
      <div className="option-group">
        <p className="option-group-title">{t.readyToUse}</p>
        <label className="option-item">
          <input type="radio" value="yes" {...register("readyToUse")} />
          {t.yes}
        </label>
        <label className="option-item">
          <input type="radio" value="no" {...register("readyToUse")} />
          {t.no}
        </label>
      </div>

      {/* Navigasjon */}
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

StepTwoProductInfo.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default StepTwoProductInfo;
