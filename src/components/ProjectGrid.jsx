import React from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  { 
    title: "YOLO Sperm Tracking and Detection",
    date: "Machine Learning Project utilizing custom CNN's, Python, YOLO and more",
    videoSrc: "/videos/compressed_video.mp4", 
    link: "/sperm-track"
  },
  { 
    title: "Unsupervised Motility Classification",
    date: "Data Visualization using Plotly, D3, Scrollama, and advanced web-dev techniques",
    videoSrc: "/videos/tracks/starspin.mp4",
    link: "/projects/sperm-classification"
  },
  { 
    title: "Gouger: Anti-gouging detection app",
    date: "Full-Stack Web-Application",
    imgSrc: "/images/gougerscreenshot.png",
    link: "https://gouger-git-main-juliannalamms-projects.vercel.app" // external link
  }
];

export default function ProjectGrid() {
  const navigate = useNavigate();

  const handleClick = (e, link) => {
    if (link.startsWith("http")) {
      // External link — allow default browser behavior
      return;
    }

    e.preventDefault();

    if (link.startsWith("#")) {
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Internal navigation via React Router
      navigate(link);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="bg-lightblue text-grenadine py-16 px-6">
      <h2 className="text-4xl font-semibold text-grenadine mb-8">Latest Projects</h2>

      <div className="grid grid-cols-1 text-burgundy sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 max-w-8xl mx-auto">
        {projects.map((project, index) => (
          <a 
            key={index} 
            href={project.link} 
            onClick={(e) => handleClick(e, project.link)}
            target={project.link.startsWith("http") ? "_blank" : "_self"}
            rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block group border-t border-grenadine/50 pt-8 cursor-pointer"
          >
            <div className="w-full h-[300px] overflow-hidden mb-4">
              {project.videoSrc ? (
                <video 
                  src={project.videoSrc} 
                  className="w-full h-full object-cover rounded-lg "
                  autoPlay 
                  loop 
                  muted
                  playsInline
                />
              ) : (
                <img 
                  src={project.imgSrc} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg "
                />
              )}
            </div>

            <h3 className="text-lg font-semibold group-hover:text-orangebright transition-colors">
              {project.title}
            </h3>

            <p className="text-burgundy/80 text-sm mt-1">{project.date}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
