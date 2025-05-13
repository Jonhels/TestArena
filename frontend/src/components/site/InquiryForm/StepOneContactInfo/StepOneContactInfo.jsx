import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import translations from "./stepOneContactTranslations";
import "./StepOneContactInfo.css";
import PropTypes from "prop-types";

const StepOneContactInfo = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const { language } = useContext(LanguageContext);
  const t = translations[language.toLowerCase()] || translations.no;

  const onValid = () => {
    onNext();
  };

  return (
    <form className="form-step" onSubmit={handleSubmit(onValid)}>
      <h2 className="form-step-title">{t.title}</h2>
      <div className="form-step-grid">
        <div className="form-column">
          <div className="form-field-wrapper">
            <label htmlFor="companyName" className="form-label">
              {t.companyName}*
            </label>
            <input
              id="companyName"
              type="text"
              autoComplete="organization"
              placeholder={t.companyName}
              className="form-input"
              aria-invalid={!!errors.companyName}
              aria-describedby={
                errors.companyName ? "companyName-error" : undefined
              }
              {...register("companyName", {
                required: t.errors.companyName,
              })}
            />
            {errors.companyName && (
              <p id="companyName-error" className="form-error">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="companyCity" className="form-label">
              {t.city}
            </label>
            <input
              id="companyCity"
              type="text"
              autoComplete="address-level2"
              placeholder={t.city}
              className="form-input"
              {...register("companyCity")}
            />
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="companyWebsite" className="form-label">
              {t.website}
            </label>
            <input
              id="companyWebsite"
              type="url"
              autoComplete="url"
              placeholder={t.website}
              className="form-input"
              {...register("companyWebsite")}
            />
          </div>
        </div>

        <div className="form-column">
          <div className="form-field-wrapper">
            <label htmlFor="contactName" className="form-label">
              {t.contactName}*
            </label>
            <input
              id="contactName"
              type="text"
              autoComplete="name"
              placeholder={t.contactName}
              className="form-input"
              aria-invalid={!!errors.contactName}
              aria-describedby={
                errors.contactName ? "contactName-error" : undefined
              }
              {...register("contactName", {
                required: t.errors.contactName,
              })}
            />
            {errors.contactName && (
              <p id="contactName-error" className="form-error">
                {errors.contactName.message}
              </p>
            )}
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="contactEmail" className="form-label">
              {t.email}*
            </label>
            <input
              id="contactEmail"
              type="email"
              autoComplete="email"
              placeholder={t.email}
              className="form-input"
              aria-invalid={!!errors.contactEmail}
              aria-describedby={
                errors.contactEmail ? "contactEmail-error" : undefined
              }
              {...register("contactEmail", {
                required: t.errors.contactEmailRequired,
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: t.errors.contactEmailInvalid,
                },
              })}
            />
            {errors.contactEmail && (
              <p id="contactEmail-error" className="form-error">
                {errors.contactEmail.message}
              </p>
            )}
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="contactPhone" className="form-label">
              {t.phone}*
            </label>
            <input
              id="contactPhone"
              type="tel"
              autoComplete="tel"
              placeholder={t.phone}
              className="form-input"
              aria-invalid={!!errors.contactPhone}
              aria-describedby={
                errors.contactPhone ? "contactPhone-error" : undefined
              }
              {...register("contactPhone", {
                required: t.errors.contactPhone,
              })}
            />
            {errors.contactPhone && (
              <p id="contactPhone-error" className="form-error">
                {errors.contactPhone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="form-button-row">
        <button type="submit" className="form-next-button">
          {t.next}
        </button>
      </div>
    </form>
  );
};

StepOneContactInfo.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default StepOneContactInfo;
