import React from "react";

const projects = [
  { 
    title: "YOLO Sperm Tracking and Detection",
    imgSrc: "/gifs/spermtrack.gif",  
    link: "#sperm-track-section", 
    isGif: true 
  },
  { 
    title: "Unsupervised Motility Classification",
    imgSrc: "/images/kmeans.png", 
    link: "/projects/kmeans", 
    isGif: false
  },
  { 
    title: "Gouger: Anti-gouging detection web-app",
    imgSrc: "/images/gougerIcon.png", 
    link: "/projects/gouger",
    isIcon: true 
  }
];

export default function ProjectGrid({ onImageClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 w-full max-w-10xl mx-auto">
      {projects.map((project, index) => (
        <div
          key={index}
          className="cursor-pointer group bg-gray-100 rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 w-full max-w-[500px] mx-auto"
          onClick={() => onImageClick(project.link)}
        >
          {/* Image Section */}
          <div className="w-full h-[220px] overflow-hidden rounded-lg">
            <img
              src={project.imgSrc}
              alt={project.title}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                project.isIcon ? "object-contain p-6 bg-white" : ""
              }`}
            />
          </div>

          {/* Title & Description */}
          <div className="p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">{project.title}</p>
            <p className="text-sm text-gray-600 mt-2">
              {project.description || "A brief description of the project."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}