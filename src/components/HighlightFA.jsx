// components/HighlightFeatureEngineering.jsx
import { CheckCircle } from "lucide-react";

const HighlightFA = () => (
    <div className="bg-lightblue p-4 sm:p-5 md:p-6 rounded-lg">
    <div className="flex items-center space-x-2 sm:space-x-3">
      <CheckCircle className="text-orangebright w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      <h3 className="text-lg sm:text-xl font-semibold text-burgundy">
        Automating Fertility Sample Analysis
      </h3>
    </div>
    <div className="text-burgundy text-sm sm:text-base mt-3 pl-2">
      <p>This project improves fertility diagnostics by:</p>
      <ul className="list-disc pl-5 mt-1">
        <li>Using <b>bounding box tracking</b> for precise motion extraction</li>
        <li>Leveraging <b>machine learning</b> for objective sperm classification</li>
        <li>Reducing <b>human bias</b> and increasing efficiency in fertility assessment</li>
      </ul>
    </div>
  </div>
);

export default HighlightFA;
