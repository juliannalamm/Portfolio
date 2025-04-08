import { User } from "lucide-react";

const fertilityData = {
  Fertile: 4,
  Subfertile: 16,
};

const fertilityColors = {
  Fertile: "text-green-500",
  Subfertile: "text-yellow-500",
};

const FertilityWaffleChart = () => {
  const statuses = [];

  for (const [status, count] of Object.entries(fertilityData)) {
    statuses.push(...Array(count).fill(status));
  }

  return (
    <div className="grid grid-cols-4 gap-2 p-5">
      {statuses.map((status, index) => (
        <User
          key={index}
          className={`w-10 h-10 ${fertilityColors[status]} transition-all`}
        />
      ))}
    </div>
  );
};

export default FertilityWaffleChart;
