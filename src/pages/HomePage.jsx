import React from "react";
import TableauReport from "tableau-react";

import ProjectGrid from "../components/ProjectGrid";
import { Table } from "lucide-react";

const HomePage = () => {


  // Replace with your actual Tableau Public URL
  const tableauUrl =
    "https://public.tableau.com/views/Book2_17439735185420/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"


  const options = {
    height: 600,
    width: 1000,
    hideTabs: true
    // You can add other vizCreate options here if desired:
    // https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record
  };



  return (
    <div>
      <section className="section-spacing flex justify-center mt-10">
        <div className="bg-gray-100 rounded-2xl p-8 max-w-3xl w-full text-center">
          <img
            src="/images/Julianna.jpg"
            alt="Julianna Lamm"
            className="w-64 h-64 rounded-full mx-auto mb-6 shadow-lg object-cover object-top aspect-square"
          />
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Julianna Lamm</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Hi! Nice to meet you, and welcome to my portfolio. I’m a machine learning researcher
            with a background in biochemistry, AI, and data science. My work spans diverse fields,
            from computer vision-based sperm cell detection and tracking to developing a price gouging
            detection web application aimed at mitigating rental spikes during natural disasters.
            Despite the variety, my projects share a common thread—leveraging data-driven solutions
            to tackle socially impactful challenges.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid />

      <div className="flex justify-center mt-8">
        <TableauReport
          url={tableauUrl}
             // optional
          // Overwrite default query params (optional)
          // The defaults are '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
        />
      </div>


    </div>
  );
};

export default HomePage;