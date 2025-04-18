import React from "react";
import { motion } from "framer-motion";

const SatiricalFundingChart = () => {
  const animatedBar = (widthPercent, color, tooltip) => (
    <motion.div
      className={`h-6 rounded-xl ${color} relative group`}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: widthPercent, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md z-10">
        {tooltip}
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-6">
      <h2 className="text-2xl font-bold text-burgundy mb-8 text-center">
        NIH Funding Disparities in Reproductive Health
      </h2>

      {/* Combined Chart */}
      <div className="space-y-6 text-burgundy">
        <div>

          <div className="flex items-center mb-2">
            <span className="w-40 text-sm font-medium text-right mr-4">OB/GYN</span>
            {animatedBar("95%", "bg-burgundy", "$436.6M")}
          </div>

          <div className="flex items-center mb-2">
            <span className="w-40 text-sm font-medium text-right mr-4">Urology</span>
            {animatedBar("5%", "bg-orangebright", "$22M")}
          </div>

        

          <p className="mt-2 text-xs text-gray-500 text-center italic">
          NIH funding for infertility research in 2023—filtered by the term 'Infertility'—shows a stark disparity between departments: Urology (typically addressing male infertility) 
          received just 5% of the total infertility funding, while OB/GYN departments (typically addressing female infertility) accounted for the vast majority.          
          <a
          href="https://www.fertstert.org/article/S0015-0282(23)01554-6/fulltext"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-300"
        >
          Source
        </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SatiricalFundingChart;
