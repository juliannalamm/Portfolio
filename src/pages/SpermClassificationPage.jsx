import React, { useEffect, useState } from "react";
import KeyHighlights from "../components/SpermClassificationHighlights";
import SpermHero from "../components/SpermHero";
import Dashboard from "../components/Dashboard";
import ScrollamaIntro from "../components/ScrollyTellIntro";
import ScrollamaResults from "../components/ScrollyTellResults";
import ScrollamaMethods from "../components/ScrollyTellMethods";
import MethodsHero from "../components/MethodsHero";
import HeroCloud from "../components/HeroCloud";
import MobileScrollSection from "../components/Mobile/MobileScrollSection";

const MobileOnly = ({ children }) => <div className="block md:hidden">{children}</div>;
const DesktopOnly = ({ children }) => <div className="hidden md:block">{children}</div>;

const SpermTrackClassification = () => {
  const [keyHighlightsReady, setKeyHighlightsReady] = useState(false);

  useEffect(() => {
    // Wait a moment before rendering other content
    const timeout = setTimeout(() => setKeyHighlightsReady(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <SpermHero />
      <KeyHighlights />

      {keyHighlightsReady && (
        <>
          <MobileOnly>
            <MobileScrollSection />
          </MobileOnly>

          <DesktopOnly>
            <ScrollamaIntro />
            <MethodsHero />
            <ScrollamaMethods />
            <HeroCloud />
            <Dashboard />
            <ScrollamaResults />
          </DesktopOnly>
        </>
      )}

      <div className="mt-6">
        <a href="/" className="text-blue-500 hover:underline text-lg">
          ← Back to Home
        </a>
      </div>
    </>
  );
};

export default SpermTrackClassification;
