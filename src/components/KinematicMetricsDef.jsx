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

export default function KinematicMetricsDef() {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);

  return (
    <section className="flex justify-center px-4 md:px-6 lg:px-8 mt-10">
    <div className="w-full max-w-3xl bg-skyblue rounded-sm overflow-hidden p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-burgundy text-center leading-tight">
        CASA Kinematic Metrics
      </h2>
      <div className="border-b border-burgundy my-4 md:my-3"></div>

      <div className="flex flex-wrap gap-2 md:gap-2 justify-center mb-4 md:mb-3">
        {metrics.map((metric) => (
          <button
            key={metric.name}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 md:px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              selectedMetric.name === metric.name
                ? "bg-orangebright text-white"
                : "bg-burgundy text-white hover:bg-orangebright"
            }`}
          >
            {metric.name}
          </button>
        ))}
      </div>

      <div className="bg-lightblue p-4 md:p-5 rounded-lg text-burgundy text-sm">
        <h3 className="text-base font-semibold">{selectedMetric.name}</h3>
        <p className="mt-1">{selectedMetric.definition}</p>
        <div className="mt-2 font-mono font-semibold">
          <BlockMath math={selectedMetric.equation} />
        </div>
        {selectedMetric.variableExplanation && (
          <p className="mt-2">{selectedMetric.variableExplanation}</p>
        )}
        {selectedMetric.diagram && (
          <img
            src={selectedMetric.diagram}
            alt={`${selectedMetric.name} diagram`}
            className="mt-2 rounded max-w-[100px] mx-auto"
            />
        )}
      </div>
    </div>
  </section>
);
}