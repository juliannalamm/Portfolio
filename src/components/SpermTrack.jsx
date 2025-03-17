import React, { useRef, useEffect } from "react";

const SpermTrack = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4; // Slow video playback
        }
    }, []);

    return (
        <section id="sperm-track-section" className="bg-gray-100 section-spacing prose max-w-5xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
                Sperm Tracking and Detection Using YOLO
            </h2>

            {/* Flex Container for Video + Wrapped Intro Text */}
            <div className="flex flex-col md:flex-row items-start mt-6 gap-6">
                {/* Video Section (Left) */}
                <div className="w-full md:w-3/5 flex-shrink-0">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto rounded-lg shadow-lg"
                    >
                        <source src="/videos/12custom_botsort.webm" type="video/webm" />
                        <source src="/videos/12custom_botsort.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Wrapped Introduction Text (Right) */}
                <div className="w-full md:w-2/5">
                    <p className="text-lg leading-relaxed text-gray-700 text-justify">
                        This project utilizes <strong>YOLO (You Only Look Once)</strong>, a deep learning-based object detection model, 
                        to accurately track sperm cells in microscopic videos. Traditional sperm motility analysis methods are often manual, 
                        time-consuming, and subjective. By integrating <strong>real-time computer vision techniques</strong>, 
                        this system provides an automated and highly efficient approach to sperm detection, classification, and motility tracking.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SpermTrack;