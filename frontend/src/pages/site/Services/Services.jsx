import "./Services.css";
import ServicesHero from "../../../components/site/Services/ServicesHero/ServicesHero";
import ServiceIntro from "../../../components/site/Services/ServiceIntro/ServiceIntro";
import IdeaSupport from "../../../components/site/Services/IdeaSupport/IdeaSupport";
import ProcessSection from "../../../components/site/common/ProcessSection/ProcessSection";
import ServiceSkills from "../../../components/site/Services/ServiceSkills/ServiceSkills";
import ServiceResearch from "../../../components/site/Services/ServiceResearch/ServiceResearch";
import ServiceCollaboration from "../../../components/site/Services/ServiceCollaboration/ServiceCollaboration";
import TestCaseSection from "../../../components/site/common/TestCaseSection/TestCaseSection";
import ContactBanner from "../../../components/site/common/ContactBanner/ContactBanner";

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
