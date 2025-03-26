import React, { useRef, useEffect, useState } from "react";
import LoopingVideo from "./LoopingVideo"; // Adjust the path accordingly

const trackerVideos = {
    ByteTrack: [
        {
            title: "Baseline - ByteTrack",
            src: "/videos/12custom_bytetrack_compressed.mp4",
            description:
                "Baseline ByteTrack struggles to maintain persistent ID's, particularly for objects that suddenly change speed or direction.",
        },
        {
            title: "Custom - ByteTrack",
            src: "/videos/12bytetrack_compressed.mp4",
            description:
                "Reducing the matching threshold and increasing the track buffer visually improves ByteTrack's ability to maintain persistent ID's although not as effective as BoT-SORT.",
        },
    ],
    "BoT-SORT": [
        {
            title: "Baseline - BoT-SORT",
            src: "/videos/12botsort_compressed.mp4",
            description: "This is the baseline performance using BoT-SORT.",
        },
        {
            title: "Custom - BoT-SORT",
            src: "/videos/12custom_botsort_compressed.mp4",
            description:
                "This is the custom configuration using BoT-SORT.",
        },
    ],
};

const SpermTrackResults = () => {
    const videoRefs = useRef([]);
    const [selectedTracker, setSelectedTracker] = useState("ByteTrack");

    // Clear refs and update playback rate & looping for new videos when tracker changes
    useEffect(() => {
        // Clear previous refs
        videoRefs.current = [];

        // When new videos are rendered, wait a tick for them to be in the DOM
        setTimeout(() => {
            videoRefs.current.forEach((video) => {
                if (video) {
                    // Set playback rate
                    video.playbackRate = 0.1;

                    // Define a timeupdate listener for smooth looping
                    const handleTimeUpdate = () => {
                        if (video.currentTime >= 10) {
                            video.currentTime = 0;
                        }
                    };

                    video.addEventListener("timeupdate", handleTimeUpdate);

                    // Optional: Clean up listener when the video is unmounted
                    // (React will remove the DOM element when switching trackers)
                    video._cleanupTimeUpdate = () => {
                        video.removeEventListener("timeupdate", handleTimeUpdate);
                    };
                }
            });
        }, 0);
    }, [selectedTracker]);

    // Optionally, cleanup listeners when the component unmounts
    useEffect(() => {
        return () => {
            videoRefs.current.forEach((video) => {
                if (video && video._cleanupTimeUpdate) {
                    video._cleanupTimeUpdate();
                }
            });
        };
    }, []);

    return (
        <>
            {/* Detection Results Section */}
            <section
                id="detection-results"
                className="flex justify-center px-4 md:px-8 lg:px-12 mt-16"
            >
                <div className="max-w-10xl w-full rounded-sm overflow-hidden">
                    <div className="bg-skyblue p-10 md:p-14 flex flex-col">
                        <h3 className="text-2xl font-semibold text-burgundy mb-3 text-center">
                            Detection Model Results
                        </h3>
                        <p className="text-lg leading-relaxed text-burgundy mb-6 text-center">
                            The following table presents the performance of different YOLO-based
                            models for sperm detection.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-lightblue text-left rounded-lg">
                                <thead className="bg-lightblue burgundy">
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
                                        <td className="p-4">
                                            YOLOv5s{" "}
                                            <a
                                                href="https://www.nature.com/articles/s41597-023-02173
                        href="https://www.nature.com/articles/s41597-023-02173-4"
                                                className="text-blue-500"
                                            >
                                                (Thambawita et al.)
                                            </a>
                                        </td>
                                        <td className="p-4">0.4292</td>
                                        <td className="p-4">0.2560</td>
                                        <td className="p-4">0.2102</td>
                                        <td className="p-4">0.0567</td>
                                    </tr>
                                    {/* ... other rows ... */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tracker Performance Section */}
            <section
                id="tracker-performance"
                className="flex justify-center px-4 md:px-8 lg:px-12 mt-16"
            >
                <div className="max-w-7xl w-full bg-blue-100 rounded-sm overflow-hidden p-10 md:p-14">
                    <h2 className="text-2xl font-semibold text-burgundy mb-6 text-center">
                        Tracker Performance Comparison
                    </h2>
                    <div className="flex flex-wrap gap-10 justify-center mb-6">
                        {Object.keys(trackerVideos).map((tracker) => (
                            <button
                                key={tracker}
                                onClick={() => setSelectedTracker(tracker)}
                                className={`px-10 py-3 rounded-full text-m font-semibold transition ${selectedTracker === tracker
                                        ? "bg-orangebright text-white"
                                        : "bg-burgundy text-white hover:bg-orangebright"
                                    }`}
                            >
                                {tracker}
                            </button>
                        ))}
                    </div>

                    <p className="text-lg text-burgundy leading-relaxed mb-6 text-center">
                        Two tracking methods were tested to improve the sperm tracking pipeline.
                        Custom modifications were made to improve performance in high-occlusion
                        environments, ensuring better identity preservation over time.
                        <div className="border-b border-burgundy my-8"></div>
                        {selectedTracker === "ByteTrack" ? (
                            <>
                                <strong>ByteTrack</strong> tracks objects by filtering low-confidence
                                detections for stability. In our custom adjustments, we reduced the{" "}
                                <strong>matching threshold</strong> and increased the{" "}
                                <strong>track buffer</strong> to handle occlusion-driven sudden bounding
                                box changes. It is simple, fast, and uses IoU matching and a basic Kalman filter.
                            </>
                        ) : (
                            <>
                                <strong>BoT-SORT</strong> is an enhanced version of SORT (Simple Online
                                and Realtime Tracking) that incorporates ReID embeddings, improved Kalman
                                filter tuning, and appearance-based matching. It is more robust to occlusions
                                and offers better long-term identity consistency when ReID is enabled.
                            </>
                        )}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-6 w-full">
                        {trackerVideos[selectedTracker].map((video, idx) => (
                            <div key={`${selectedTracker}-${idx}`} className="flex flex-col items-center text-center">
                                <h3 className="text-md font-semibold text-burgundy mb-2 text-center">
                                    {video.title}
                                </h3>
                                <LoopingVideo
                                    src={video.src}
                                    className="w-full max-w-md h-auto rounded-sm"
                                />
                                <p className="mt-2 text-center mt-6 text-burgundy">{video.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SpermTrackResults;
