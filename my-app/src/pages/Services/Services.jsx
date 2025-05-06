import "./Services.css";
import ServicesHero from "../../components/ServicesHero/ServicesHero";
import ServiceIntro from "../../components/ServiceIntro/ServiceIntro";
import IdeaSupport from "../../components/ IdeaSupport/ IdeaSupport";
import ProcessSection from "../../components/ProcessSection/ProcessSection";
import ServiceSkills from "../../components/ServiceSkills/ServiceSkills";
import ServiceResearch from "../../components/ServiceResearch/ServiceResearch";
import ServiceCollaboration from "../../components/ServiceCollaboration/ServiceCollaboration";
import TestCaseSection from "../../components/TestCaseSection/TestCaseSection";
import ContactBanner from "../../components/ContactBanner/ContactBanner";

const Services = () => {
  return (
    <div>
      <ServicesHero />
      <ServiceIntro />
      <IdeaSupport />
      <ProcessSection />
      <ServiceCollaboration />
      <ServiceSkills />
      <ServiceResearch />
      <TestCaseSection />
      <ContactBanner />
    </div>
  );
};

export default Services;
