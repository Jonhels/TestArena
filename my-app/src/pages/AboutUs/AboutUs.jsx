import "./AboutUs.css";
import AboutHero from "../../components/AboutHero/AboutHero";
import PartnerSection from "../../components/PartnerSection/PartnerSection";
import TestarenaIntro from "../../components/TestarenaIntro/TestarenaIntro";
import BusinessNeedSection from "../../components/BusinessNeedSection/BusinessNeedSection";
import ProjectDevelopment from "../../components/ProjectDevelopment/ProjectDevelopment";
import ContactSection from "../../components/ContactSection/ContactSection";
import Faq from "../../components/Faq/Faq";
import ContactBanner from "../../components/ContactBanner/ContactBanner";

const AboutUs = () => {
  return (
    <div className="about-us">
      <AboutHero />
      <PartnerSection />
      <TestarenaIntro />
      <BusinessNeedSection />
      <ProjectDevelopment />
      <ContactSection />
      <Faq />
      <ContactBanner />
    </div>
  );
};

export default AboutUs;
