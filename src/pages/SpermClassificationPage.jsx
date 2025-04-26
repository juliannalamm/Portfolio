import React from "react";
import KeyHighlights from "../components/SpermClassificationHighlights";
import SpermHero from "../components/SpermHero";
import MetricViewer from "../components/FeatureEngineering";
import Clustering from "../components/Clustering";
import FlowChart from "../components/FlowChart";
import Dashboard from '../components/Dashboard';
import { Scroll } from "lucide-react";
import ScrollamaIntro from "../components/ScrollyTellIntro";
import ScrollamaResults from "../components/ScrollyTellResults";
import ScrollamaMethods from "../components/ScrollyTellMethods";
import MethodsHero from "../components/MethodsHero";
import HeroCloud from "../components/HeroCloud";



const SpermTrackClassification = () => {
  return (
    <>
      {/* Hero Section - Fullscreen, No Padding Issues */}

      <SpermHero />

      {/* Main Content Section - Now Has Padding */}
      {/* <section className="flex flex-col items-center justify-center min-h-screen bg-lightblue px-6 py-16"> */}
        {/* Key Highlights Section
        <KeyHighlights />

        <div className="mt-10 w-full max-w-8xl">
          <MetricViewer />
        </div>
        <div className="mt-10 w-full max-w-8xl">
          <Clustering />

          <FlowChart />
        </div> */}
      {/* </section> */}


      <ScrollamaIntro />
      <MethodsHero />
      <ScrollamaMethods />
      <HeroCloud/>
      <Dashboard />
      <ScrollamaResults />
      {/* <ScrollamaDemo /> */}
      {/* <ScrollamaDemoTwo/> */}
      

      {/* Back Button */}
      <div className="mt-6">
        <a
          href="/"
          className="text-blue-500 hover:underline text-lg"
        >
          ← Back to Home
        </a>
      </div>

    </>
  );
};

export default SpermTrackClassification;