import React from "react";
import KeyHighlights from "../components/SpermClassificationHighlights";
import SpermHero from "../components/SpermHero";
import Dashboard from '../components/Dashboard';
import ScrollamaIntro from "../components/ScrollyTellIntro";
import ScrollamaResults from "../components/ScrollyTellResults";
import ScrollamaMethods from "../components/ScrollyTellMethods";
import MethodsHero from "../components/MethodsHero";
import HeroCloud from "../components/HeroCloud";
import MobileScrollSection from "../components/Mobile/MobileScrollSection";


const MobileOnly = ({ children }) => <div className="block md:hidden">{children}</div>;
const DesktopOnly = ({ children }) => <div className="hidden md:block">{children}</div>;

const SpermTrackClassification = () => {
  return (
    <>
      {/* Always visible */}
      <SpermHero />
      <KeyHighlights/>

      {/* Show only on mobile */}
      <MobileOnly>
       <MobileScrollSection/>

      </MobileOnly>

      {/* Show everything else only on desktop */}
      <DesktopOnly>
        <ScrollamaIntro />
        <MethodsHero />
        <ScrollamaMethods />
        <HeroCloud />
        <Dashboard />
        <ScrollamaResults />
      </DesktopOnly>

      {/* Back Link */}
      <div className="mt-6">
        <a href="/" className="text-blue-500 hover:underline text-lg">
          ← Back to Home
        </a>
      </div>
    </>
  );
};

export default SpermTrackClassification;
