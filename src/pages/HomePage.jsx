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
            Hi! Nice to meet you, and welcome to my portfolio. I hold a B.S. in Biochemistry from UC Berkeley and a Master’s in Computer Science from Fordham University.
            My work integrates science, technology, and design—spanning machine learning–based object tracking, interactive story-driven data visualizations, and API-driven tools that track and flag rental price changes following emergencies.
            Whether in machine learning, data analysis, or full-stack development, my projects share a common thread: leveraging data-driven solutions to tackle socially impactful challenges.

          </p>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid />


    </div>
  );
};

export default HomePage;