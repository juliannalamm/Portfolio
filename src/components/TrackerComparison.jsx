import React from "react";


const TrackerComparison = () => {
  return (
    <section id="tracker-comparison" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
      {/* Adjust size of card here */}
      <div className="max-w-10xl w-full bg-blue-100 rounded-lg overflow-hidden shadow-sm border border-gray-300 p-10 md:p-14">
        
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight text-center">
          Tracker Comparison: BoT-SORT vs. ByteTrack
        </h2>

        {/* Tracking Preamble */}
        <p className="text-lg text-gray-800 leading-relaxed mt-4">
          Two tracking methods were tested to improve the sperm tracking pipeline. 
          <strong>BoT-SORT</strong> leverages **Re-ID (appearance matching)** and **global motion compensation (GMC)**, while 
          <strong>ByteTrack</strong> relies on **confidence-based association** without Re-ID.
        </p>

        <p className="text-lg text-gray-800 leading-relaxed mt-4">
          Custom modifications were made to improve performance in high-occlusion environments, 
          ensuring better identity preservation over time. The following table outlines the key 
          differences and adjustments implemented.
        </p>

        {/* Section Line */}
        <div className="border-b border-gray-400 my-6"></div>

        {/* Table Section */}
        <h3 className="text-2xl font-semibold mb-4 text-center">Tracker Configurations</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-left border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="p-4 text-center">Feature</th>
                <th className="p-4 text-center">BoT-SORT (Baseline)</th>
                <th className="p-4 text-center">Custom BoT-SORT</th>
                <th className="p-4 text-center">ByteTrack (Baseline)</th>
                <th className="p-4 text-center">Custom ByteTrack</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Tracking Method</td>
                <td className="p-4">GMC + Kalman Filter</td>
                <td className="p-4">Enabled Re-ID for occlusion handling</td>
                <td className="p-4">High-confidence detection linking</td>
                <td className="p-4">Reduced matching threshold for better recall</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Re-ID (Appearance Matching)</td>
                <td className="p-4">Disabled</td>
                <td className="p-4">Enabled to maintain track continuity</td>
                <td className="p-4">Not used</td>
                <td className="p-4">No change</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Motion Compensation</td>
                <td className="p-4">Sparse Optical Flow</td>
                <td className="p-4">No change</td>
                <td className="p-4">None</td>
                <td className="p-4">No change</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Track Buffer</td>
                <td className="p-4">30 frames</td>
                <td className="p-4">Increased to 200 for long-term tracking</td>
                <td className="p-4">30 frames</td>
                <td className="p-4">Increased to 60</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Matching Threshold</td>
                <td className="p-4">Strict (0.9)</td>
                <td className="p-4">No change</td>
                <td className="p-4">Moderate (0.8)</td>
                <td className="p-4">Reduced to improve tracking recall</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Detection Confidence Threshold</td>
                <td className="p-4">Higher, filters weak detections</td>
                <td className="p-4">Lowered to capture more objects</td>
                <td className="p-4">Lower, accepts more detections</td>
                <td className="p-4">Further reduced for better tracking</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 text-center font-semibold">Overall Efficiency</td>
                <td className="p-4">Accurate but slower</td>
                <td className="p-4">Balanced precision & recall</td>
                <td className="p-4">Fastest, lightweight tracker</td>
                <td className="p-4">Improved recall at slight speed cost</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TrackerComparison;
