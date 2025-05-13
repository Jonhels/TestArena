import { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../../components/site/Home/Hero/Hero";
import PartnerSection from "../../../components/site/common/PartnerSection/PartnerSection";
import TestcaseSection from "../../../components/site/common/TestCaseSection/TestCaseSection";
import ProcessSection from "../../../components/site/common/ProcessSection/ProcessSection";
import ChallengeSection from "../../../components/site/Home/ChallengeSection/ChallengeSection";
import OfferSection from "../../../components/site/Home/OfferSection/OfferSection";
import NetworkSection from "../../../components/site/Home/NetworkSection/NetworkSection";
import ContactBanner from "../../../components/site/common/ContactBanner/ContactBanner";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <main className={`home ${fadeIn ? "fade-in" : ""}`}>
      <Hero />
      <PartnerSection />
      <TestcaseSection />
      <ChallengeSection />
      <ProcessSection />
      <OfferSection />
      <NetworkSection />
      <ContactBanner />
    </main>
  );
};

export default Home;
