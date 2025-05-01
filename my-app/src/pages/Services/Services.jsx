import "./Services.css";
import ServicesHero from "../../components/ServicesHero/ServicesHero";
import ServiceIntro from "../../components/ServiceIntro/ServiceIntro";
import ServiceSkills from "../../components/ServiceSkills/ServiceSkills";
import ServiceResearch from "../../components/ServiceResearch/ServiceResearch";
import ServiceCollaboration from "../../components/ServiceCollaboration/ServiceCollaboration";

const Services = () => {
  return (
    <div>
      <ServicesHero />
      <ServiceIntro />
      <ServiceSkills />
      <ServiceResearch />
      <ServiceCollaboration />
    </div>
  );
};

export default Services;
