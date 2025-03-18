import React, { useRef, useEffect } from "react";

const SpermTrack = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4; // Slow video playback
        }
    }, []);

    return (
        <section id="sperm-track-section" className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 mt-16">
            {/* Title (Outside White Frame) */}
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-tight">
                Sperm Tracking & Detection Using YOLO
            </h2>

            {/* White Content Box */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                {/* Flex Container for Video + Wrapped Intro Text */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Video Section (Left) */}
                    <div className="w-full md:w-2/5 flex-shrink-0">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto rounded-lg border border-gray-300"
                        >
                            <source src="/videos/12custom_botsort.webm" type="video/webm" />
                            <source src="/videos/12custom_botsort.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Description (Right) */}
                    <div className="w-full md:w-3/5">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">About</h3>
                        <p className="text-lg leading-relaxed text-gray-800 text-left">
                            This project utilizes <strong className="text-gray-900">YOLO (You Only Look Once)</strong>, 
                            a deep learning-based object detection model, to accurately track sperm cells in microscopic videos. 
                            Traditional sperm motility analysis methods are often manual, time-consuming, and subjective.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-800 mt-4">
                            By integrating <strong className="text-gray-900">real-time computer vision techniques</strong>, 
                            this system provides an automated and highly efficient approach to sperm detection, classification, 
                            and motility tracking, enabling more precise fertility analysis.
                        </p>
                    </div>
                </div>
                 {/* Dataset Section */}
                 <div className="mt-10">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Dataset</h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                        This project leverages the <a href="https://zenodo.org/records/7293726" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">VISEM-Tracking dataset </a> 
                        provided by Simula Net, which contains manually annotated sperm tracking data.
                    </p>
                    
                    {/* Bullet Points */}
                    <ul className="list-disc list-inside text-lg text-gray-800 leading-relaxed mt-4 space-y-2">
                        <li>Video recordings of 30 seconds (comprising 29,196 frames from 20 participants).</li>
                        <li>Wet semen preparations with manually annotated bounding-box coordinates.</li>
                        <li>Includes sperm characteristics analyzed by domain experts.</li>
                        <li>Provides unlabeled video clips for easy access to self- or unsupervised learning methods.</li>
                    </ul>
                </div>
                {/* Methods Section */}
                <div className="overflow-x-auto mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Methods</h3>
                        <table className="w-full text-left border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-200 text-gray-900">
                                <tr>
                                    <th className="p-4">Model</th>
                                    <th className="p-4">Spatial Feature Extraction</th>
                                    <th className="p-4">Rationale for Small Object Detection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv5s</td>
                                    <td className="p-4">Standard convolutions</td>
                                    <td className="p-4">Benchmark model to verify replication of prior study results (VISEM study).</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s</td>
                                    <td className="p-4">Standard convolutions</td>
                                    <td className="p-4">Baseline model, <strong>not optimized for small object detection</strong>. Used as a control.</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + Focus</td>
                                    <td className="p-4"><strong>Focus layer</strong> preserves fine-grained detail by performing a <strong>"space-to-depth"</strong> transformation.</td>
                                    <td className="p-4">Helps <strong>preserve small details</strong> in low-resolution images (640x480).</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + P2</td>
                                    <td className="p-4">Adds an <strong>additional P2 feature extraction layer</strong>, introducing an extra <strong>stride=4</strong> convolution.</td>
                                    <td className="p-4"><strong>Lower stride captures finer spatial features</strong>, improving detection of small objects like sperm.</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv11s</td>
                                    <td className="p-4">Latest YOLO variant claiming reduced inference times.</td>
                                    <td className="p-4">Expected to offer <strong>faster training and inference</strong> with potential performance trade-offs.</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Results Section */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Results</h3>
                    <p className="text-lg leading-relaxed text-gray-800 mb-6">
                        The following table presents the performance of different YOLO-based models for sperm detection.
                    </p>

                    {/* Results Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border border-gray-300 rounded-lg shadow-md">
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
                                    <td className="p-4">0.576</td>
                                    <td className="p-4">0.573</td>
                                    <td className="p-4">0.438</td>
                                    <td className="p-4">0.119</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + Focus</td>
                                    <td className="p-4">0.600</td>
                                    <td className="p-4">0.549</td>
                                    <td className="p-4">0.450</td>
                                    <td className="p-4">0.125</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Results Summary */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Analysis & Next Steps</h3>
                        <p className="text-lg leading-relaxed text-gray-800">
                            The addition of the P2 layer was hypothesized to improve small object detection by reducing the stride 
                            and creating a finer-grained feature map. However, further investigation revealed that the majority of 
                            bounding box sizes for sperm in the dataset were around 16x16 pixels, which already falls within the **P3 layer** 
                            of YOLOv8's feature pyramid. As a result, the additional P2 layer did not contribute significantly to detection improvements.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-800 mt-4">
                            Additionally, evaluation of validation and training losses suggest overfitting may have played a role in limiting performance improvements. 
                            The Focus layer, designed to preserve spatial detail, showed promise in maintaining precision, but gains were marginal. Future work 
                            should explore the following adjustments:
                        </p>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-800 mt-4">
                            <li>Refining the Feature Pyramid Network (FPN) layers further enhance small object detection.</li>
                            <li>Experimenting with self-supervised pretraining to boost performance on limited datasets.</li>
                            <li>Applying data augmentation techniques such as synthetic sperm trajectories to improve generalization, 
                                potentially incorporating additional images from<a href="https://paperswithcode.com/dataset/mhsma" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> MHSMA (The Modified Human Sperm Morphology Analysis) 
                                </a> dataset</li>  
                            <li>Optimizing hyperparameters further to reduce overfitting and improve recall.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default SpermTrack;