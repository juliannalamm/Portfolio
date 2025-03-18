import React from "react";

const SpermTrackIntro = () => {
    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            <div className="max-w-10xl w-full grid md:grid-cols-2 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-300">
                
                {/* Left Side: Text Content (White Background) */}
                <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                        Sperm Tracking & Detection Using YOLO
                    </h2>
                    <p className="text-lg text-gray-800 leading-relaxed mt-4">
                        This project utilizes <strong className="text-gray-900">YOLO (You Only Look Once)</strong>, 
                        a deep learning-based object detection model, to track sperm cells in microscopic videos.
                        Traditional sperm motility analysis methods are often manual and subjective.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mt-4">
                        By integrating <strong className="text-gray-900">real-time computer vision techniques</strong>, 
                        this system provides an automated and highly efficient approach to sperm detection, classification, 
                        and motility tracking for more precise fertility analysis.
                    </p>

                    {/* Section Line */}
                    <div className="border-b border-gray-400 my-6"></div>

                    {/* Dataset Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Dataset</h3>
                        <p className="text-lg text-gray-800 leading-relaxed">
                            This project leverages the <a href="https://zenodo.org/records/7293726" 
                            target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            VISEM-Tracking dataset</a>, containing manually annotated sperm tracking data.
                        </p>
                    </div>
                </div>

                {/* Right Side: Video (Pale Blue Background) */}
                <div className="bg-blue-100 flex items-center justify-center p-6">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full max-w-lg h-auto rounded-lg border border-gray-300"
                    >
                        <source src="/videos/12custom_botsort.webm" type="video/webm" />
                        <source src="/videos/12custom_botsort.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            </div>
        </section>
    );
};

export default SpermTrackIntro;