import { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import PartnerSection from "../../components/PartnerSection/PartnerSection";
import ProcessSection from "../../components/ProcessSection/ProcessSection";
import ChallengeSection from "../../components/ChallengeSection/ChallengeSection";
import OfferSection from "../../components/OfferSection/OfferSection";
import NetworkSection from "../../components/NetworkSection/NetworkSection";
import ContactBanner from "../../components/ContactBanner/ContactBanner";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <main className={`home ${fadeIn ? "fade-in" : ""}`}>
      <Hero />
      <PartnerSection />
      <ProcessSection />
      <ChallengeSection />
      <OfferSection />
      <NetworkSection />
      <ContactBanner />
    </main>
  );
};

export default Home;
