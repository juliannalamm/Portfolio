import React from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  { 
    title: "YOLO Sperm Tracking and Detection",
    date: "03.10.2025",
    imgSrc: "/gifs/spermtrack.gif",
    link: "/sperm-track" // Updated for React Router navigation
  },
  { 
    title: "Unsupervised Motility Classification",
    date: "02.19.2025",
    imgSrc: "/images/kmeans.png",
    link: "/projects/kmeans"
  },
  { 
    title: "Gouger: Anti-gouging detection app",
    date: "01.23.2025",
    imgSrc: "/images/gouger.png",
    link: "/projects/gouger"
  }
];

export default function ProjectGrid() {
  const navigate = useNavigate(); //  React Router navigation hook

  const handleClick = (e, link) => {
    e.preventDefault();

    if (link.startsWith("#")) {
      // ✅ Smooth scrolling for in-page anchors
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      //  Use React Router for internal navigation
      navigate(link);
    }
  };

  return (
    <section className="bg-gray-100 text-gray-700 py-16 px-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">Latest Projects</h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <a 
            key={index} 
            href={project.link} 
            onClick={(e) => handleClick(e, project.link)}
            className="block group border-t border-gray-700 pt-6 cursor-pointer"
          >
            {/* Project Image */}
            <div className="w-full h-[300px] overflow-hidden mb-4">
              <img 
                src={project.imgSrc} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Project Title */}
            <h3 className="text-lg font-semibold group-hover:text-gray-300 transition-colors">
              {project.title}
            </h3>

            {/* Project Date */}
            <p className="text-gray-500 text-sm mt-1">{project.date}</p>
          </a>
        ))}
      </div>
    </section>
  );
}