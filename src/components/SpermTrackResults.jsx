import React, { useRef, useEffect, useState } from "react";
import LoopingVideo from "./LoopingVideo";
import DetectionComparison from "./DetectionComparison";



const trackerVideos = {
    ByteTrack: [
        {
            title: "Baseline - ByteTrack",
            src: "/videos/12custom_bytetrack_compressed.mp4",
            description: "Baseline ByteTrack struggles to maintain persistent ID's, particularly for objects that suddenly change speed or direction."
        },
        {
            title: "Custom - ByteTrack",
            src: "/videos/12bytetrack_compressed.mp4",
            description: "Reducing the matching threshold and increasing the track buffer visually improves ByteTrack's ability to maintain persistent ID's although not as effective as BoT-SORT."
        },
    ],
    "BoT-SORT": [
        {
            title: "Baseline - BoT-SORT",
            src: "/videos/12botsort_compressed.mp4",
            description: "This is the baseline performance using BoT-SORT."
        },
        {
            title: "Custom - BoT-SORT",
            src: "/videos/12custom_botsort_compressed.mp4",
            description: "This is the custom configuration using BoT-SORT."
        },
    ],
};

const SpermTrackResults = () => {
    const videoRefs = useRef([]);
    const [selectedTracker, setSelectedTracker] = useState("ByteTrack");

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.playbackRate = 0.4;

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
        <>
            { /* Detection Results Section */}
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
                                        <td className="p-4">YOLOv5s <a href="https://www.nature.com/articles/s41597-023-02173-4" className="text-blue-500">(Thambawita et al.)</a> </td>
                                        <td className="p-4">0.4292</td>
                                        <td className="p-4">0.2560</td>
                                        <td className="p-4">0.2102</td>
                                        <td className="p-4">0.0567</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="p-4">YOLOv8s-Conf@.25 <a href="https://ceur-ws.org/Vol-3658/paper21.pdf" className="text-blue-500"> (Nguyen et al.) </a> </td>
                                        <td className="p-4">0.5</td>
                                        <td className="p-4">0.638</td>
                                        <td className="p-4">0.506</td>
                                        <td className="p-4">0.191</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="p-4"> <strong>YOLOv8s-Conf@.25 (ours)</strong></td>
                                        <td className="p-4"><strong>0.608</strong></td>
                                        <td className="p-4"><strong>0.582</strong></td>
                                        <td className="p-4"><strong>0.534</strong></td>
                                        <td className="p-4"><strong>0.185</strong></td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="p-4">YOLOv8s + P2 (ours) </td>
                                        <td className="p-4">0.578</td>
                                        <td className="p-4">0.586</td>
                                        <td className="p-4">0.479</td>
                                        <td className="p-4">0.143</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="p-4">YOLOv8s + Focus (ours)</td>
                                        <td className="p-4">0.600</td>
                                        <td className="p-4">0.549</td>
                                        <td className="p-4">0.450</td>
                                        <td className="p-4">0.125</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="p-4">YOLOv11s (ours) </td>
                                        <td className="p-4">0.539</td>
                                        <td className="p-4">0.548</td>
                                        <td className="p-4">0.444</td>
                                        <td className="p-4">0.142</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* Section Line */}
                            <div className="border-b border-burgundy my-8"></div>

                            {/* Training Setup */}
                            <DetectionComparison />
                            {/* Section Line */}
                            <div className="border-b border-burgundy my-8"></div>

                            {/* Suggestions for Improvement */}
                            <section id="improvement-suggestions">
                                <h3 className="text-2xl font-semibold text-burgundy mb-3 text-center">
                                    Limitations and Suggested Improvements
                                </h3>

                                <ul className="list-disc list-inside text-lg text-burgundy leading-relaxed space-y-2">
                                    <li>
                                        Despite multiple architectural modifications, including Focus layers and custom detection heads, 
                                        performance gains were modest and key metrics eventually plateaued. 
                                        This suggests that YOLO-based architectures may be nearing their ceiling on this particular dataset.
                                    </li>
                                    <li>
                                        Signs of overfitting were observed in training vs. validation loss trends, 
                                        highlighting the need for stronger regularization and better generalization techniques.
                                    </li>
                                    <li>
                                        Dataset-specific factors—such as small object size, occlusions, and minimal visual variation—may limit the representational power of current models. 
                                        Enhanced data augmentation strategies, including synthetic sperm trajectories, could improve robustness.
                                    </li>
                                    <li>
                                        Feature pyramid optimization remains a promising avenue. Methods like dynamic FPN scaling or attention-based fusion could help recover spatial detail lost in deeper layers by dynamicaly assigning importance
                                        to various feature maps, enabling the network to focus on the most relevant information for a given task <a href = "https://openaccess.thecvf.com/content/CVPR2021/papers/Dai_Dynamic_Head_Unifying_Object_Detection_Heads_With_Attentions_CVPR_2021_paper.pdf" className = "text-blue-500">(Dai et al.)</a>.
                                    </li>
                                    <li>
                                        Transformer-based architectures offer a compelling alternative. Their ability to capture long-range spatial dependencies and preserve fine-grained features could improve detection in dense, small-object environments. Models like DETR or Swin Transformer may be especially suited for this task.
                                    </li>
                                    <li>
                                        In future work, I plan to deepen my understanding of transformer-based detection models and apply them to a follow-up project focused on spatiotemporal sperm tracking in video sequences.
                                    </li>
                                </ul>
                            </section>
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
                        Custom modifications were made to improve performance in high-occlusion environments, ensuring better identity preservation over time.
                        {/* Section Line */}
                        <div className="border-b border-burgundy my-8"></div>


                        {selectedTracker === "ByteTrack" ? (
                            <>
                                <strong> ByteTrack</strong> Tracks objects by filtering low-confidence detections for stability. In our custom adjustments,
                                we reduced the <strong>matching threshold</strong> and increased <strong>track buffer</strong> to handle occlusion driven sudden bounding
                                box changes. It is simple, fast and uses IoU matching and basic Kalman filter.
                            </>
                        ) : (
                            <>
                                <strong> BoT-SORT</strong> is an enhanced version of SORT (Simple Online and Realtime Tracking) and incorporates ReID embeddings,improved Kalman filter tuning,
                                and appearance based matching. It is more robust to occlusions and has better long-terem identity consistency when ReID is selected.
                            </>
                        )}
                    </p>

                    {/* Tracker Selector Buttons */}

                    {/* Grid Layout for Tracker Videos */}
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