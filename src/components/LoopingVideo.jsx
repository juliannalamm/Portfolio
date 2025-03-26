import React, { useRef, useEffect } from "react";

const LoopingVideo = ({ src, title, playbackRate = 0.4, loopTime = 10, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Set playback rate
    video.playbackRate = playbackRate;

    // Define a handler for looping
    const handleTimeUpdate = () => {
      if (video.currentTime >= loopTime) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [playbackRate, loopTime]);

  return (
    <video ref={videoRef} className={className} controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default LoopingVideo;
