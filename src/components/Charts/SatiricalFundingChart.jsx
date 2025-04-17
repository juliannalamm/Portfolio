import React from "react";
import { motion } from "framer-motion";

const SatiricalFundingChart = () => {
  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (i) => ({
      width: ["0%", `${[80, 65, 50][i]}%`],
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.3 },
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-20 px-6">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        NIH Funding in Reproductive Health (2020–2024)
      </h2>

      <div className="space-y-6 text-white">
        {["Female Fertility", "IVF Research", "Endometriosis"].map((label, i) => (
          <div key={label} className="flex items-center">
            <span className="w-40 text-sm font-medium text-right mr-4">{label}</span>
            <motion.div
              className="h-6 rounded-xl bg-blue-400"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={barVariants}
            />
          </div>
        ))}

        {/* Satirical entry */}
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-right mr-4">
            Male Infertility
          </span>
          <div className="h-6 flex items-center text-pink-400 text-sm font-mono pl-2">
            ¯\\_(ツ)_/¯
          </div>
        </div>
      </div>

      <p className="mt-8 text-center italic text-gray-400">
        We don’t fund it. We don’t track it. But we treat it—
        <span className="text-white font-semibold">through her</span>.
      </p>
      <p className="mt-2 text-center text-xs text-gray-500">
        * Actually, we do track it... less than 2% of reproductive health research funding in the U.S. goes to male infertility.
      </p>
    </div>
  );
};

export default SatiricalFundingChart;
