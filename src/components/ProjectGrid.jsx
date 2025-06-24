import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "End-to-End Cell Motility Analysis App",
    date: "Clustering multivariate time-series tracking data with Streamlit-based interface",
    stack: "Python, Pandas, Streamlit, Scikit-learn, Matplotlib",
    videoSrc: "/videos/streamlitApp.mp4",
    link: "https://juliannalamm-spermapp-streamlit-app-0avwqu.streamlit.app/"
  },
  {
    title: "Gouger: Real-Time Price Gouging Detection Tool",
    date: "Full-stack tool for identifying illegal rent hikes during natural disasters using historical pricing and HUD fair market data",
    stack: "React, Node.js, Tailwind CSS, RentCast API, Google Places API, AWS S3",
    imgSrc: "/images/gougerscreenshot.png",
    link: "https://gouger-git-main-juliannalamms-projects.vercel.app"
  },
  {
    title: "Beyond the Count: Visual Data Storytelling in Fertility Research",
    date: "Interactive scrollytelling dashboard exploring motion data from microscopic video",
    stack: "React, D3.js, Streamlit, Tableau, Framer Motion, GSAP, Python, CSS3",
    videoSrc: "/videos/tracks/starspin.mp4",
    link: "/projects/sperm-classification"
  },
  {
    title: "SpermTrack: YOLOv8 Object Detection and Tracking",
    date: "Custom YOLOv8 training and real-time tracking using BoT-SORT with annotated video output",
    stack: "Python, YOLOv8, OpenCV, Pandas, CometML, DeepSORT",
    imgSrc: "/images/detectionresults/YOLOv8s/labels.jpg",
    link: "/sperm-track"
  }
];

export default function ProjectGrid() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

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

  const scrollByCard = (direction) => {
    const cardWidth = scrollRef.current?.firstChild?.offsetWidth || 400;
    scrollRef.current.scrollBy({
      left: direction * (cardWidth + 24), // + gap (Tailwind: space-x-6 = 1.5rem = 24px)
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-lightblue text-grenadine py-20 px-6">
      <div className="max-w-8xl mx-auto">
      <h2 className="text-4xl font-semibold text-grenadine mb-8 pb-4 border-b-1 border-grenadine/80">Latest Projects</h2>

        {/* Mobile/Tablet: Normal grid with wrapping */}
        <div className="grid grid-cols-1 text-burgundy sm:grid-cols-2 md:hidden gap-8 gap-y-10 max-w-8xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              onClick={(e) => handleClick(e, project.link)}
              target={project.link.startsWith("http") ? "_blank" : "_self"}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block group border-t border-grenadine pt-8 cursor-pointer"
            >
              <div className="w-full h-[280px] overflow-hidden">
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: index === 0 ? 'center top' : 'center' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={project.imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold group-hover:text-orangebright transition-colors mb-3 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-burgundy/80 text-sm mb-4 leading-relaxed line-clamp-3">{project.date}</p>
                {project.stack && (
                  <p className="text-burgundy/70 text-xs italic leading-relaxed">
                    <span className="font-medium text-burgundy/80">Tech Stack:</span> {project.stack}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Desktop: Horizontal scrolling with arrows */}
        <div className="relative max-w-8xl mx-auto hidden md:block">
          {/* Scroll Controls */}
          <button
            onClick={() => scrollByCard(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-grenadine/90 hover:bg-grenadine text-white rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            aria-label="Scroll left"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollByCard(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-grenadine/90 hover:bg-grenadine text-white rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            aria-label="Scroll right"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-8 snap-x snap-mandatory px-4"
          >
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                onClick={(e) => handleClick(e, project.link)}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex-shrink-0 w-[calc(100vw/3-3rem)] snap-start group bg-skyblue/40  hover:shadow-xl transition-all duration-300 overflow-hidden "
              >
                <div className="w-full h-[280px] overflow-hidden">
                  {project.videoSrc ? (
                    <video
                      src={project.videoSrc}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: index === 0 ? 'center top' : 'center' }}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={project.imgSrc}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold group-hover:text-orangebright transition-colors mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-burgundy/80 text-sm mb-4 leading-relaxed line-clamp-3">{project.date}</p>
                  {project.stack && (
                    <p className="text-burgundy/70 text-xs italic leading-relaxed">
                      <span className="font-medium text-burgundy/80">Tech Stack:</span> {project.stack}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
