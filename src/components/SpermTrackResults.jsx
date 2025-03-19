import React, { useRef, useEffect } from "react";

const SpermTrackResults = () => {
    const videoRefs = useRef([]);

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.playbackRate = 0.4; // Adjust playback speed if needed
            }
        });
    }, []);

    const handleLoadedMetadata = (video) => {
        if (video.duration > 10) {
            setInterval(() => {
                if (video.currentTime >= 10) {
                    video.currentTime = 0; // Restart video after 10 seconds
                }
            }, 1000);
        }
    };

    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* White and Blue Split Column */}
            <div className="max-w-10xl w-full grid md:grid-cols-2 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                
                {/* White Section - Detection Results */}
                <div className="bg-white p-10 md:p-14 flex flex-col">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">Detection Model Results</h3>
                    <p className="text-lg leading-relaxed text-gray-800 mb-6 text-center">
                        The following table presents the performance of different YOLO-based models for sperm detection.
                    </p>

                    {/* Results Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full bg-gray-100 text-left border border-gray-100 rounded-lg">
                            <thead className="bg-gray-200 text-gray-900">
                                <tr>
                                    <th className="p-4">Model</th>
                                    <th className="p-4">Precision</th>
                                    <th className="p-4">Recall</th>
                                    <th className="p-4">mAP@0.5</th>
                                    <th className="p-4">mAP@0.5:0.95</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv5s</td>
                                    <td className="p-4">0.4292</td>
                                    <td className="p-4">0.2560</td>
                                    <td className="p-4">0.2102</td>
                                    <td className="p-4">0.0567</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s</td>
                                    <td className="p-4">0.608</td>
                                    <td className="p-4">0.582</td>
                                    <td className="p-4">0.502</td>
                                    <td className="p-4">0.150</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + P2</td>
                                    <td className="p-4">0.578</td>
                                    <td className="p-4">0.586</td>
                                    <td className="p-4">0.479</td>
                                    <td className="p-4">0.143</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + Focus</td>
                                    <td className="p-4">0.600</td>
                                    <td className="p-4">0.549</td>
                                    <td className="p-4">0.450</td>
                                    <td className="p-4">0.125</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv11s</td>
                                    <td className="p-4">0.539</td>
                                    <td className="p-4">0.548</td>
                                    <td className="p-4">0.444</td>
                                    <td className="p-4">0.142</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Blue Section - Tracker Performance */}
                <div className="bg-blue-100 flex flex-col items-center p-10 md:p-14">
                    
                    {/* Section Title */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                        Tracker Performance Comparison
                    </h2>

                    <p className="text-lg text-gray-800 leading-relaxed mt-4 text-center">
                        Comparison of tracking performance using <strong>ByteTrack</strong> and <strong>BoT-SORT</strong> in both baseline and custom configurations.
                    </p>

                    {/* Grid Layout for Videos */}
                    <div className="grid grid-cols-2 gap-6 mt-6 w-full">
                        
                        {/* ByteTrack - Baseline */}
                        <div>
                            <h3 className="text-md font-semibold text-gray-900 mb-2 text-center">Baseline - ByteTrack</h3>
                            <video
                                ref={(el) => (videoRefs.current[0] = el)}
                                className="w-full max-w-md h-auto rounded-lg border border-gray-100"
                                controls
                                onLoadedMetadata={(e) => handleLoadedMetadata(e.target)}
                            >
                                <source src="/videos/12bytetrack_compressed.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Byte-Track - Custom */}
                        <div>
                            <h3 className="text-md font-semibold text-gray-900 mb-2 text-center">Custom -ByteTrack</h3>
                            <video
                                ref={(el) => (videoRefs.current[1] = el)}
                                className="w-full max-w-md h-auto rounded-lg  border border-gray-100"
                                controls
                                onLoadedMetadata={(e) => handleLoadedMetadata(e.target)}
                            >
                                <source src="/videos/12custom_bytetrack_compressed.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Bot-Sort - Baseline */}
                        <div>
                            <h3 className="text-md font-semibold text-gray-900 mb-2 text-center"> Baseline - BoT-SORT</h3>
                            <video
                                ref={(el) => (videoRefs.current[2] = el)}
                                className="w-full max-w-md h-auto rounded-lg  border-gray-100"
                                controls
                                onLoadedMetadata={(e) => handleLoadedMetadata(e.target)}
                            >
                                <source src="/videos/12botsort_compressed.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* BoT-SORT - Custom */}
                        <div>
                            <h3 className="text-md font-semibold text-gray-900 mb-2 text-center">Custom - BoT-SORT</h3>
                            <video
                                ref={(el) => (videoRefs.current[3] = el)}
                                className="w-full max-w-md h-auto rounded-lg  border border-gray-100"
                                controls
                                onLoadedMetadata={(e) => handleLoadedMetadata(e.target)}
                            >
                                <source src="/videos/12custom_botsort_compressed.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpermTrackResults;