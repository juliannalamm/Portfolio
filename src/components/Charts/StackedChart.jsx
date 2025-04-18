import React from "react";
import { motion } from "framer-motion";
import pregnancyIcon from "../../assets/pregnancy_stick.png";

const StackedChart = () => {
  const total = 360;
  const segments = [
    { label: "Male Factor", color: "#f472b6", angle: 120 },
    { label: "Female Factor", color: "#60a5fa", angle: 120 },
    { label: "Both / Unknown", color: "#9ca3af", angle: 120 },
  ];

  const radius = 80;
  const center = 100;

  const generateArc = (startAngle, angle, color, delay) => {
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);
    const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

    return (
      <motion.path
        key={color}
        d={path}
        stroke={color}
        strokeWidth={16}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay }}
      />
    );
  };

  let start = 0;

  return (
    <div className="w-full max-w-md mx-auto mt-20 px-6">
      <h2 className="text-2xl font-bold text-burgundy mb-8 text-center">
        Causes of Infertility in Couples
      </h2>

      <div className="relative w-[200px] h-[200px] mx-auto">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {segments.map((seg, i) => {
            const arc = generateArc(start, seg.angle, seg.color, i * 0.3);
            start += seg.angle;
            return arc;
          })}
        </svg>
        <img
          src={pregnancyIcon}
          alt="Pregnancy Test Icon"
          className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="mt-4 space-y-2 text-sm text-center">
        <p className="text-pink-400 font-medium">Male Factor ~33%</p>
        <p className="text-blue-400 font-medium">Female Factor ~33%</p>
        <p className="text-gray-400 font-medium">Both / Unknown ~33%</p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600 italic max-w-xl mx-auto">
        Overall, one-third of infertility cases are caused by male reproductive issues, one-third by female reproductive issues,
        and one-third by both or by unknown factors.
      </p>
    </div>
  );
};

export default StackedChart;
