import React from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Gouger: Anti-gouging detection app",
    date: "Full-Stack Web-Application",
    stack: "React, Node.js, Tailwind CSS, RentCast API, Google Places API, AWS S3",
    imgSrc: "/images/gougerscreenshot.png",
    link: "https://gouger-git-main-juliannalamms-projects.vercel.app"
  },
  {
    title: "Automated Fertility Assessment",
    date: "Interactive scrollytelling and sperm motility visualization",
    stack: "React, D3, Framer Motion, Three.js, Tailwind CSS, GSAP, Scrollama, Tableau, Python",
    videoSrc: "/videos/tracks/starspin.mp4",
    link: "/projects/sperm-classification"
  },
  {
    title: "YOLO Sperm Tracking and Detection",
    date: "Custom object tracking leveraging YOLOv8, custom CNN, and BoT-SORT",
    stack: "Python, YOLOv8, OpenCV, Pandas, CometML",
    videoSrc: "/videos/compressed_video.mp4",
    link: "/sperm-track"
  }
];

export default function ProjectGrid() {
  const navigate = useNavigate();

  const handleClick = (e, link) => {
    if (link.startsWith("http")) return;
    e.preventDefault();

    if (link.startsWith("#")) {
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
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
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={project.imgSrc}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                />
              )}
            </div>

            <h3 className="text-lg font-semibold group-hover:text-orangebright transition-colors">
              {project.title}
            </h3>

            <p className="text-burgundy/80 text-sm mt-1">{project.date}</p>
            {project.stack && (
              <p className="text-burgundy/70 text-xs mt-1 italic">
                Tech Stack: {project.stack}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
