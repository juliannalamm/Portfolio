import { useState } from "react";

const metrics = [
  {
    name: "VSL",
    definition:
      "VSL is determined by finding the straight-line distance between the first and last points of the trajectory and correcting for time.",
    equation: "VSL = D(p1, pN) × FrameRate / (N-1) × μ",
    diagram: "/path/to/VSL_diagram.png",
  },
  {
    name: "VCL",
    definition:
      "VCL is the total distance traveled by the sperm along its curvilinear path, corrected for time.",
    equation: "VCL = Σ D(pt, pt+1) × FrameRate / (N-1) × μ",
    diagram: "/path/to/VCL_diagram.png",
  },
  {
    name: "VAP",
    definition:
      "VAP is the distance traveled in the average direction of movement, corrected for time.",
    equation: "VAP = Σ D(qt, qt+1) × FrameRate / (N-w) × μ",
    diagram: "/path/to/VAP_diagram.png",
  },
  {
    name: "LIN",
    definition: "LIN is the ratio of VSL to VCL, representing movement linearity.",
    equation: "LIN = (VSL / VCL) × 100",
    diagram: "/path/to/LIN_diagram.png",
  },
  {
    name: "WOB",
    definition:
      "WOB is the relationship between the average and curvilinear paths.",
    equation: "WOB = (VAP / VCL) × 100",
    diagram: "/path/to/WOB_diagram.png",
  },
  {
    name: "STR",
    definition:
      "STR is a comparison of the straight-line and average paths, indicating trajectory regularity.",
    equation: "STR = (VSL / VAP) × 100",
    diagram: "/path/to/STR_diagram.png",
  },
  {
    name: "ALH Mean",
    definition:
      "ALH Mean is an approximation of the flagellar beat envelope.",
    equation: "ALHmean = Scale Factor × Σ(Distances between St and S) / Count",
    diagram: "/path/to/ALH_diagram.png",
  },
];

export default function MetricViewer() {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);

  return (
    <section className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
      {/* Main Container - Matches KeyHighlights Styling */}
      <div className="max-w-7xl w-full bg-blue-100 rounded-sm overflow-hidden p-10 md:p-14">
        
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-burgundy leading-tight text-center">
          CASA Kinematic Metrics
        </h2>

        {/* Section Line */}
        <div className="border-b border-burgundy my-8"></div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {metrics.map((metric) => (
            <button
              key={metric.name}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedMetric.name === metric.name
                  ? "bg-rose-300 text-black"
                  : "bg-rose-900 text-white hover:bg-gray-600"
              }`}
            >
              {metric.name}
            </button>
          ))}
        </div>

        {/* Metric Details Box - Matches the Card Style */}
        <div className="bg-blue-50 p-6 rounded-lg text-burgundy">
          <h3 className="text-xl font-semibold">{selectedMetric.name}</h3>
          <p className="mt-2 text-burgundy">{selectedMetric.definition}</p>
          <p className="mt-2 text-burgundy font-mono font-semibold">
            {selectedMetric.equation}
          </p>
          <img
            src={selectedMetric.diagram}
            alt={`${selectedMetric.name} diagram`}
            className="mt-4 rounded-lg w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}