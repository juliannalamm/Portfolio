

const videoData = [
    { mp4: "/videos/tracks/straightline.mp4", text: "A clear, forward trajectory with high linearity and velocity, indicating efficient, directed motion toward an egg." , caption: "Straight Line Progressive Movement"},
    { mp4: "/videos/tracks/progressive.mp4", text: "A wavy, somewhat erratic path with moderate velocity and lower linearity. These sperm move forward but with frequent directional changes or head wobble, often falling short of progressive criteria.", caption: "Intermediate Movement" },
    { mp4: "/videos/tracks/starspin.mp4", text: "Highly vigorous, erratic motion with sharp turns, tight circular paths, and sudden directional shifts — a behavior typically associated with capacitated sperm preparing for egg penetration.", caption: "Hyperactivated Movement" },
  ];
  
  const TrackVideoGrid = () => {
    return (
      <div className="mt-5max-w-6xl mx-auto">
        {/* Title Above the Grid */}
        <h2 className="text-2xl font-bold text-center text-burgundy mb-8">
          Three Types of Motile Sperm Motility
        </h2>
  
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoData.map((video, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              {/* Video with overlay */}
              <div className="relative group w-full h-[300px] bg-black rounded-lg  overflow-hidden">
                <video
                  className="w-full h-full object-cover bg-black rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={video.mp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
  
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <p className="text-white text-sm font-bold text-center px-4">{video.text}</p>
                </div>
              </div>
  
              {/* Caption */}
              <p className="text-sm text-center text-burgundy">{video.caption}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  
  export default TrackVideoGrid;
  