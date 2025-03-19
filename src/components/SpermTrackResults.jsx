import React from "react";

const SpermTrackResults = () => {
    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* adjust size of card here*/}
            <div className="max-w-10xl w-full grid md:grid-cols-2 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-300">
                
                {/* Left Side: Text Content (White Background) */}
                <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
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
                    {/* Section Line */}
                    <div className="border-b border-gray-400 my-6"></div>

                </div>

                {/* Right Side: Video (Pale Blue Background) */}
                <div className="bg-blue-100 flex flex-col items-center justify-center p-6">
                    <div className="grid grid-cols-5 gap-2 max-w-7xl mx-auto">
    
                    {/* Column Headers */}
                    {[
                        "YOLOv11s Prediction", "YOLOv8s + Focus Prediction",
                        "YOLOv8s + P2 Prediction", "YOLOv8s Prediction", "Ground Truth Labels"
                    ].map((title, index) => (
                    <div key={index} className="text-center font-bold text-gray-900 bg-gray-300 p-2 rounded">
                        {title}
                    </div>
                    ))}
    
                    {/* Image Rows (Example Paths) */}
                {[...Array(5)].map((_, rowIndex) => (
            <>
                <img key={`yolov11s_pred_${rowIndex}`} src={`/images/YOLOV11s/prediction_${rowIndex}.jpg`} className="w-full h-auto rounded shadow-md" />
                <img key={`yolov8s_focus_pred_${rowIndex}`} src={`/images/yolov8s_focus_pred_${rowIndex}.jpg`} className="w-full h-auto rounded shadow-md" />
                <img key={`yolov8s_p2_pred_${rowIndex}`} src={`/images/yolov8s_p2_pred_${rowIndex}.jpg`} className="w-full h-auto rounded shadow-md" />
                <img key={`yolov8s_pred_${rowIndex}`} src={`/images/yolov8s_pred_${rowIndex}.jpg`} className="w-full h-auto rounded shadow-md" />
                <img key={`labels_${rowIndex}`} src={`/images/labels_${rowIndex}.jpg`} className="w-full h-auto rounded shadow-md" />
            </>
            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpermTrackResults;