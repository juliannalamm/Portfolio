import React from "react";

const SpermTrackIntro = () => {
    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* adjust size of card here*/}
            <div className="max-w-10xl w-full grid md:grid-cols-2 rounded-lg overflow-hidden">
                
                {/* Left Side: Text Content (White Background) */}
                <div className="bg-lightblue p-10 md:p-14 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-burgundy leading-tight">
                        Sperm Tracking & Detection Using YOLO
                    </h2>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                        This project utilizes <strong className="text-burgundy">YOLO (You Only Look Once)</strong>, 
                        a deep learning-based object detection model, to track sperm cells in microscopic videos.
                        Traditional sperm motility analysis methods are often manual and subjective.
                    </p>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                        By integrating <strong className="text-burgundy">real-time computer vision techniques</strong>, 
                        this system provides an automated and highly efficient approach to sperm detection, classification, 
                        and motility tracking for more precise fertility analysis.
                    </p>

                    {/* Section Line */}
                    <div className="border-b border-burgundy my-6"></div>

                    {/* Dataset Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-burgundy mb-3">Dataset</h3>
                        <p className="text-lg text-burgundy leading-relaxed">
                            This project leverages the <a href="https://zenodo.org/records/7293726" 
                            target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            VISEM-Tracking dataset</a>, containing manually annotated sperm tracking data.
                        </p>
                        <ul className="list-disc list-inside text-lg text-burgundy leading-relaxed mt-4 space-y-2">
                        <li>Video recordings of 30 seconds (comprising 29,196 frames from 20 participants).</li>
                        <li>Wet semen preparations with manually annotated bounding-box coordinates.</li>
                        <li>Includes sperm characteristics analyzed by domain experts.</li>
                        <li>Provides unlabeled video clips for easy access to self- or unsupervised learning methods.</li>
                    </ul>
                    </div>
                </div>

                {/* Right Side: Video (Pale Blue Background) */}
                <div className="bg-skyblue flex flex-col items-center justify-center p-6">
                <h3 className="text-xl text-burgundy font-semibold mb-2">YOLOv8s Architecture</h3>
                    <img
                        src="/images/yoloarchitecture.png"
                        alt="YOLOv8s Architecture"
                        className="w-full max-w-md rounded-lg"
                    />
                    
                    {/* Explanation */}
                    <div className="text-burgundy text-lg leading-relaxed mt-4 px-6 text-center">
                        <p><strong>Backbone:</strong> Extracts features using Conv layers, C2F blocks, and SPPF.</p>
                        <p><strong>Conv Layers:</strong> The core building blocks of YOLO, convolutional layers extract spatial features such as edges, textures, and patterns while reducing image dimensions.</p>
                        <p><strong>C2F Blocks:</strong> A variant of CSPNet that enhances feature extraction by splitting and re-merging feature maps. It improves gradient flow and reduces redundant computations, making the model more efficient.</p>
                        <p><strong>Backbone → Neck → Head:</strong> The backbone extracts features, the neck enhances multi-scale learning, and the head predicts bounding boxes and class labels.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpermTrackIntro;