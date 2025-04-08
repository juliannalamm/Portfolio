const videoData = [
    { mp4: "/videos/tracks/straightline.mp4", text: "Straight Line Motion" },
    { mp4: "/videos/tracks/progressive.mp4", text: "Progressive Motion" },
    { mp4: "/videos/tracks/starspin.mp4", text: "Hyperactivated Motion" },
  ];
  
  const TrackVideoGrid = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {videoData.map((video, index) => (
          <div
            key={index}
            className="relative group w-full h-[300px] bg-black rounded-lg shadow-lg "
          >
            {/* Video */}
            <video
              className="w-full h-full object-cover bg-black"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={video.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
  
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <p className="text-white text-lg font-bold">{video.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TrackVideoGrid;
  