import React from 'react';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import CampaignDrops from './components/CampaignDrops';
import SubmitClips from './components/SubmitClips';
import EarningsSection from './components/EarningsSection';
import ImpactDivider from './components/ImpactDivider';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-outfit selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <LandingHero />
        
        {/* First Set of Features */}
        <CampaignDrops />
        <SubmitClips />
        <EarningsSection />

        <ImpactDivider />

        {/* Second Set of Features (as seen in image) */}
        <CampaignDrops />
        <SubmitClips />
        <EarningsSection />

        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
