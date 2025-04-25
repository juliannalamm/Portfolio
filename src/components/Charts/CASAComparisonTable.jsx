import React from 'react';

const CASAComparisonTable = () => {
  return (
    <div className="max-w-3xl w-full rounded-sm overflow-hidden">
      <div className="bg-skyblue p-6 md:p-4 flex flex-col">
        <h2 className="text-xl font-bold text-burgundy leading-tight text-center">
          CASA Results: John vs. Steve
        </h2>
        <p className="text-sm leading-relaxed text-burgundy mt-2 text-center">
          Comparison of sperm parameters between two individuals.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-lightblue text-left rounded-lg text-sm">
            <thead className="bg-lightblue text-burgundy">
              <tr>
                <th className="p-2">Parameter</th>
                <th className="p-2">John</th>
                <th className="p-2">Steve</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-burgundy">
                <td className="p-2">Volume (mL)</td>
                <td className="p-2">2.8</td>
                <td className="p-2">3.2</td>
              </tr>
              <tr className="border-t border-burgundy">
                <td className="p-2">Sperm Count (million)</td>
                <td className="p-2">431</td>
                <td className="p-2">428</td>
              </tr>
              <tr className="border-t border-burgundy">
                <td className="p-2">Concentration (million/mL)</td>
                <td className="p-2">19.6</td>
                <td className="p-2">21.9</td>
              </tr>
              <tr className="border-t border-burgundy">
                <td className="p-2">Motility (%)</td>
                <td className="p-2">50%</td>
                <td className="p-2">58%</td>
              </tr>
              <tr className="border-t border-burgundy">
                <td className="p-2">Morphology (%)</td>
                <td className="p-2">23%</td>
                <td className="p-2">26%</td>
              </tr>
              <tr className="border-t border-burgundy">
                <td className="p-2">Total Motility (%)</td>
                <td className="p-2">58%</td>
                <td className="p-2">62%</td>
              </tr>
              <tr className="border-t border-burgundy">
                <td className="p-2">Progressive Motility (%)</td>
                <td className="p-2">43%</td>
                <td className="p-2">45%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CASAComparisonTable;
