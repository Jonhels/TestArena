import "./AboutUs.css";
import AboutHero from "../../../components/site/AboutUs/AboutHero/AboutHero";
import PartnerSection from "../../../components/site/common/PartnerSection/PartnerSection";
import TestarenaIntro from "../../../components/site/AboutUs/TestarenaIntro/TestarenaIntro";
import BusinessNeedSection from "../../../components/site/AboutUs/BusinessNeedSection/BusinessNeedSection";
import ProjectDevelopment from "../../../components/site/AboutUs/ProjectDevelopment/ProjectDevelopment";
import ContactSection from "../../../components/site/AboutUs/ContactSection/ContactSection";
import Faq from "../../../components/site/AboutUs/Faq/Faq";
import ContactBanner from "../../../components/site/common/ContactBanner/ContactBanner";

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
