import React from "react";

import ProjectGrid from "../components/ProjectGrid";
import { Table } from "lucide-react";

const HomePage = () => {

  return (
    <div>
      <section className="section-spacing flex justify-center mt-10">
        <div className="bg-skyblue rounded-2xl p-8 max-w-3xl w-full text-center">
          <img
            src="/images/Julianna.jpg"
            alt="Julianna Lamm"
            className="w-64 h-64 rounded-full mx-auto mb-6 shadow-lg object-cover object-top aspect-square"
          />
          <h2 className="text-4xl font-bold text-burgundy mb-5">Julianna Lamm</h2>
          <p className="text-lg text-burgundy text-justify leading-relaxed">
            Hi! I’m glad you’re here and welcome to my portfolio. I hold a B.S. in Biochemistry from the University of California, Berkeley and a Master’s in Computer Science from Fordham University.

            My work integrates science, technology, and design, with projects ranging from machine learning–based object tracking and story-driven data visualizations to API-driven tools that monitor rental price changes after emergencies.

            Across machine learning, data analysis, and full-stack development, my focus remains the same: using data-driven solutions to tackle socially impactful challenges.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid />


    </div>
  );
};

export default HomePage;