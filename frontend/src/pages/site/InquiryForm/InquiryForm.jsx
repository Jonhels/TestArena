import { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { LanguageContext } from "../../../context/LanguageContext";
import inquiryFormTranslations from "./inquiryFormTranslations";
import StepOneContactInfo from "../../../components/site/InquiryForm/StepOneContactInfo/StepOneContactInfo";
import StepTwoProductInfo from "../../../components/site/InquiryForm/StepTwoProductInfo/StepTwoProductInfo";
import StepThreeAdditionalInfo from "../../../components/site/InquiryForm/StepThreeAdditionalInfo/StepThreeAdditionalInfo";
import StepFourSummary from "../../../components/site/InquiryForm/StepFourSummary/StepFourSummary";
import FormStepsIndicator from "../../../components/site/InquiryForm/FormStepsIndicator/FormStepsIndicator";
import InquirySuccessModal from "../../../components/site/InquiryForm/InquirySuccessModal/InquirySuccessModal";
import Loader from "../../../components/common/Loader/Loader";
import "./InquiryForm.css";
import api from "../../../api/api";

const InquiryForm = () => {
  const { language } = useContext(LanguageContext);
  const methods = useForm();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = (key) =>
    inquiryFormTranslations[language.toLowerCase()]?.[key] ??
    inquiryFormTranslations["no"]?.[key] ??
    key;

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formValues = methods.getValues();
      const formData = new FormData();

      // Legg til alle felt
      for (const key in formValues) {
        if (Array.isArray(formValues[key])) {
          formValues[key].forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, formValues[key]);
        }
      }

      // Legg til vedlegg hvis det finnes
      if (formValues.attachment?.[0]) {
        formData.append("attachment", formValues.attachment[0]);
      }

      // Send forespørselen til serveren
      await api.post("/inquiries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowSuccess(true);
    } catch (error) {
      console.error("Feil ved innsending:", error);
      alert("Noe gikk galt under innsendingen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setStep(1);
    methods.reset();
  };

  return (
    <>
      {isSubmitting && <Loader message="Sender inn skjema..." />}

      <section className="inquiry-form-wrapper">
        <div className="inquiry-form-left">
          <div className="inquiry-form-header">
            <h1 className="inquiry-title">{t("title")}</h1>
            <p className="inquiry-subtitle">{t("description")}</p>
          </div>

          <FormProvider {...methods}>
            {step === 1 && <StepOneContactInfo onNext={handleNext} />}
            {step === 2 && (
              <StepTwoProductInfo onNext={handleNext} onBack={handleBack} />
            )}
            {step === 3 && (
              <StepThreeAdditionalInfo
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 4 && (
              <StepFourSummary onBack={handleBack} onSubmit={handleSubmit} />
            )}
          </FormProvider>

          {showSuccess && <InquirySuccessModal onClose={closeSuccessModal} />}
        </div>

        <div className="inquiry-form-right">
          <FormStepsIndicator currentStep={step} />
        </div>
      </section>
    </>
  );
};

export default InquiryForm;
