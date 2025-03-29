import { useState } from "react";
import { BlockMath } from "react-katex";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const metrics = [
  {
    name: "VSL",
    definition:
      "VSL is determined by finding the straight-line distance between the first and last points of the trajectory and correcting for time. This value then gives the net space gain within the observation period.",
    equation:
      "VSL = \\frac{D(p_1, p_N) \\times \\text{FrameRate}}{(N-1)} \\times \\mu",
      variableExplanation: (
        <>
          Where <InlineMath math="D(p_1, p_N)" /> is the distance between the first and last points, FrameRate is the number of frames per second, N is the total number of frames, and μ is the scaling factor.
        </>
      ),    diagram: "/images/kinematics.png",
  },
  {
    name: "VCL",
    definition:
      "VCL is the distance traveled by the spermatozoon along its curvilinear paths and is calculated by finding the sum of the distances along the trajectory then correcting for time. It refers to the total distance that the sperm head covers in the observation period.",
    equation:
      "VCL = \\sum D(p_t, p_{t+1}) \\times \\frac{\\text{FrameRate}}{(N-1)} \\times \\mu",
        variableExplanation: (
            <>
                Where <InlineMath math="D(p_t, p_{t+1})" /> is the distance between two consecutive points on the trajectory., FrameRate is the number of frames per second, N is the total number of frames, and μ is the scaling factor.
            </>
      ),
    diagram: "/images/kinematics.png",
  },
  {
    name: "VAP",
    definition:
      "VAP is the distance traveled in the average direction of movement, corrected for time.",
    equation:
      "VAP = \\sum D(q_t, q_{t+1}) \\times \\frac{\\text{FrameRate}}{(N-w)} \\times \\mu",
        variableExplanation: (
            <>
            Where <InlineMath math="D(q_t, q_{t+1})" /> is the distance between two points on the average path (moving average). w is a specified window for moving average and,μ is the unit scaling factor.
        </>
      ),
    diagram: "/images/kinematics.png",
  },
  {
    name: "LIN",
    definition:
    "LIN is a comparison of the straight-line and curvilinear paths. It is an expression of the relationship between the two-dimensional projection of the three-dimensional path taken by the spermatozoon (i.e., curvilinear path) and its net space gain.", 
    equation: "LIN = \\left( \\frac{VSL}{VCL} \\right) \\times 100",
  },
  {
    name: "WOB",
    definition:
      "WOB is the relationship between the WOB is the expression of the relationship between the average and curvilinear paths and curvilinear paths.",
    equation: "WOB = \\left( \\frac{VAP}{VCL} \\right) \\times 100",
  },
  {
    name: "STR",
    definition:
    "STR is a comparison of the straight-line and average paths and gives an indication of the relationship between the net space gain and the general trajectory of the spermatozoon.",    
    equation: "STR = \\left( \\frac{VSL}{VAP} \\right) \\times 100",
  },
  {
    name: "ALH Mean",
    definition:
      "ALH Mean is an approximation of the flagellar beat envelope.",
    equation:
      "ALH_{mean} or ALH_{Max} = \\text{Scale Factor} \\times \\frac{\\sum \\text{(Distances between } S_t \\text{ and } S)}{\\text{Count}}",
      variableExplanation: (
        <>
        Where <InlineMath math="S_t"/> is a segment of the actual trajectory. <InlineMath math="S"/> is a segment of the smoothed trajectory. μ is the microns per pixel conversion factor and Count is the segments analyzed for each trajectory.
    </>
  ),
    diagram: "/images/kinematics.png",
  },
  {
    name: "Hyperactivation",
    definition:
      "Hyperactivation is defined as covering less forward distance relative to their vigor, displaying large deviations of the head from the path of movement and angles >90 degrees between adjacent points.",
    equation: " \\text{VCL} > 150 \\mu m , \\text{LIN} < 50% , \\text{ALH} > 7",
    diagram: "/images/hyperactivated.png",
  },
];

export default function MetricViewer() {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);

  return (
    <section className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
      <div className="max-w-8xl w-full bg-skyblue rounded-sm overflow-hidden p-10 md:p-14">
        <h2 className="text-4xl font-extrabold text-burgundy leading-tight text-center">
          CASA Kinematic Metrics
        </h2>
        <div className="border-b border-burgundy my-8"></div>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {metrics.map((metric) => (
            <button
              key={metric.name}
              onClick={() => setSelectedMetric(metric)}
              className={`px-10 py-2 rounded-full text-m bg-burgundy font-semibold transition ${
                selectedMetric.name === metric.name
                  ? "bg-orangebright text-white"
                  : "bg-burgundy text-white hover:bg-orangebright"
              }`}
            >
              {metric.name}
            </button>
          ))}
        </div>
        <div className="bg-lightblue p-6 rounded-lg text-burgundy">
          <h3 className="text-xl font-semibold">{selectedMetric.name}</h3>
          <p className="mt-2 text-burgundy">{selectedMetric.definition}</p>
          <div className="mt-2 font-mono font-semibold text-burgundy">
            <BlockMath math={selectedMetric.equation} />
          </div>
           {/* Render Variable Explanation */}
          {selectedMetric.variableExplanation && (
            <p className="mt-2 text-burgundy">{selectedMetric.variableExplanation}</p>
          )}

          {/* Render the Diagram ONLY if it exists */}
          {selectedMetric.diagram && (
            <img
              src={selectedMetric.diagram}
              alt={`${selectedMetric.name} diagram`}
              className="mt-1 rounded-lg w-full max-w-md mx-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
}