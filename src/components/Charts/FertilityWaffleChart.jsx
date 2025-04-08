import { User } from "lucide-react";
import { motion } from "framer-motion";

const fertilityData = {
  Fertile: 4,
  Subfertile: 16,
};

const fertilityColors = {
  Fertile: "text-green-500",
  Subfertile: "text-yellow-500",
};

const legendColors = {
  Fertile: "bg-green-500",
  Subfertile: "bg-yellow-500",
};

const FertilityWaffleChart = () => {
  const statuses = [];

  for (const [status, count] of Object.entries(fertilityData)) {
    statuses.push(...Array(count).fill(status));
  }

  return (
    <div className="p-5">
      {/* Waffle grid with animation */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {statuses.map((status, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <User
              className={`w-10 h-10 ${fertilityColors[status]} transition-all`}
            />
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {status}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        {Object.entries(fertilityData).map(([status]) => (
          <div key={status} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded ${legendColors[status]}`} />
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FertilityWaffleChart;
