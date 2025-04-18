import React from "react";
import { motion } from "framer-motion";

const InfertilityFundingChart = () => {
  const animatedBar = (widthPercent, color, tooltip, label) => (
    <motion.div
      className={`h-6 rounded-xl ${color} relative group w-full flex items-center pl-2 text-white text-xs font-medium`}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: widthPercent, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>{label}</div>
      <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md z-10">
        {tooltip}
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-6">
      <h2 className="text-2xl font-bold text-burgundy mb-8 text-center">
        NIH Funding Disparities in Selected NIH Research Areas
      </h2>

      {/* Combined Funding Chart */}
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-right mr-4">Prostate Cancer</span>
          <div className="flex-1">
            {animatedBar("100%", "bg-orangebright", "$305M", "$305M")}
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-right mr-4">Female-fertility</span>
          <div className="flex-1">
            {animatedBar("66%", "bg-burgundy", "$200.3M", "$200.3M")}
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-right mr-4">Endometriosis</span>
          <div className="flex-1">
            {animatedBar("10%", "bg-burgundy", "$29M", "$29M")}
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-right mr-4">Male-fertility</span>
          <div className="flex-1">
            {animatedBar("5%", "bg-orangebright", "$15.5M", "$15.5M")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfertilityFundingChart;
