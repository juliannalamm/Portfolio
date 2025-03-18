import React from "react";

const SpermTrackMethods= () => {
    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* adjust size of card here*/}
            <div className="max-w-10xl w-full grid md:grid-cols-2 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-300">
                
                {/* Left Side: Text Content (White Background) */}
                <div className="bg-blue-100 flex flex-col items-center p-6">
                
                {/* Section Title */}
                <div className="p-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                        YOLO Model Configurations & Training Setup
                    </h2>

                    {/* Detection Training Preamble */}
                    <p className="text-lg text-gray-800 leading-relaxed mt-4">
                        Detection training was conducted on <strong>1× NVIDIA L40 GPU (48GB VRAM)</strong>. 
                        Due to computational constraints, <strong>YOLO "s" (small)</strong> was chosen to balance 
                        computational complexity with accuracy. The base model includes:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-800 leading-relaxed mt-3 space-y-1">
                        <li><strong>225 layers</strong></li>
                        <li><strong>11,166,560 parameters</strong></li>
                        <li><strong>11,166,544 gradients</strong></li>
                        <li><strong>28.8 GFLOPs</strong></li>
                    </ul>
                    
                    <p className="text-lg text-gray-800 leading-relaxed mt-4">
                        Five main experiments were conducted to assess the detection of sperm classes using 
                        YOLO's CNN architecture with an <strong>80/20 train/val split</strong>. A brief explanation 
                        of the architectures and custom adjustments are shown in the table to the right. All base models 
                        were trained using default YOLO hyperparameters and 8 data loaders, while custom architectures 
                        (YOLOv8s + Focus, YOLOv8s + P2) used previously tuned hyperparameters.
                    </p>
                </div>
                
                </div>
                
                {/* Right Side: Video (Pale Blue Background) */}
                <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
                <table className="w-full bg-white text-left border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-200 text-gray-900">
                                <tr>
                                    <th className="p-4">Model</th>
                                    <th className="p-4">Adjustments</th>
                                    <th className="p-4">Rationale for Small Object Detection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv5s</td>
                                    <td className="p-4">Base architecture</td>
                                    <td className="p-4">Benchmark model to verify replication of prior study results (VISEM study).</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s</td>
                                    <td className="p-4">Base architecture</td>
                                    <td className="p-4">Baseline model, <strong>not optimized for small object detection</strong>. Used as a control.</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + Focus</td>
                                    <td className="p-4"><strong>Focus layer</strong> replaces the second, third, and fourth Conv layers with Focus layer whose functionality preserves fine-grained detail by performing a <strong>"space-to-depth"</strong> transformation.</td>
                                    <td className="p-4">Helps <strong>preserve small details</strong> in low-resolution images (640x480).</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv8s + P2</td>
                                    <td className="p-4"> Introduced an extra P2 Concatenation layer into the detection to incorporate P2 Conv layer into the backbone </td>
                                    <td className="p-4">Lower stride (stride =4) allows P2 feature map to capture finer spatial features improving detection of small objects like sperm.</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4">YOLOv11s</td>
                                    <td className="p-4"> Newly released base architecture</td>
                                    <td className="p-4">Latest YOLO variant claiming reduced inference times. Expected to offer <strong>faster training and inference</strong> with potential performance trade-offs.</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </section>
    );
};

export default SpermTrackMethods;