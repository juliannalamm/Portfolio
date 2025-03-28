import React from "react";

const SpermTrackMethods = () => {
    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* Main Container */}
            <div className="max-w-7xl w-full bg-lightblue rounded-sm overflow-hidden p-10 md:p-14">
                
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-burgundy leading-tight text-center">
                    Methods and Training Setup
                </h2>

                {/* Detection Training Preamble */}
                <p className="text-lg text-burgundy leading-relaxed mt-6">
                    Detection training was conducted on <strong>1× NVIDIA L40 GPU (48GB VRAM)</strong>. 
                    Due to computational constraints, <strong>YOLO "s" (small)</strong> was chosen to balance 
                    computational complexity with accuracy. The base model includes: 225 layers, 11,166,560 parameters,
                    11,166,544 gradients, and 28.8 GFLOPs.
                </p>
               

                <p className="text-lg text-burgundy leading-relaxed mt-6">
                    Five main experiments were conducted to assess the detection of sperm classes using 
                    YOLO's CNN architecture with an <strong>80/20 train/val split</strong>. A brief explanation 
                    of the architectures and custom adjustments are shown in the table below. All base models 
                    were trained using default YOLO hyperparameters and 8 data loaders, while custom architectures 
                    (YOLOv8s + Focus, YOLOv8s + P2) used previously tuned hyperparameters.
                </p>

                {/* Section Line */}
                <div className="border-b border-gray-400 my-8"></div>

                {/* Detection Model Configurations Table */}
                <h3 className="text-2xl font-semibold text-burgundy mb-6 text-center">Detection Model Configurations</h3>
                <div className="overflow-x-auto">
                    <table className="w-full bg-skyblue text-left text-burgundy rounded-sm">
                        <thead className="bg-skyblue burgundy">
                            <tr>
                                <th className="p-6 text-center">Model</th>
                                <th className="p-6 text-center">Adjustments</th>
                                <th className="p-6 text-center">Rationale for Small Object Detection</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className = "border-t border-burgundy">
                                <td className="p-6 text-center">YOLOv5s</td>
                                <td className="p-6">Base architecture</td>
                                <td className="p-6">Benchmark model to verify replication of prior study results (VISEM study).</td>
                            </tr>
                            <tr className = "border-t border-burgundy">
                                <td className="p-6 text-center">YOLOv8s</td>
                                <td className="p-6">Base architecture</td>
                                <td className="p-6">Baseline model, <strong>not optimized for small object detection</strong>. Used as a control.</td>
                            </tr>
                            <tr className = "border-t border-burgundy">
                                <td className="p-6 text-center">YOLOv8s + Focus</td>
                                <td className="p-6"><strong>Focus layer</strong> replaces early Conv layers with a space-to-depth transformation.</td>
                                <td className="p-6">Helps <strong>preserve small details</strong> in low-resolution images (640x480).</td>
                            </tr>
                            <tr className = "border-t border-burgundy">
                                <td className="p-6 text-center">YOLOv8s + P2</td>
                                <td className="p-6">Added P2 Concatenation to integrate low-level spatial features.</td>
                                <td className="p-6">Lower stride (stride = 4) improves detection of small objects like sperm.</td>
                            </tr>
                            <tr className = "border-t border-burgundy">
                                <td className="p-6 text-center">YOLOv11s</td>
                                <td className="p-6">Newly released base architecture</td>
                                <td className="p-6">Claims <strong>faster training and inference</strong> with potential performance trade-offs.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    
                   
                
                
            </div>
        </section>
    );
};

export default SpermTrackMethods;