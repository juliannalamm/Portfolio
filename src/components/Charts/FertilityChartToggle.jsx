import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import FertilityChart from './FertilityChart';

const FertilityChartToggle = () => {
  const [chartData, setChartData] = useState(null);
  const [normalization, setNormalization] = useState('minmax');

  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        const pointsData = data.filter(row => {
          const val = row.Centroid?.toString().trim().toLowerCase();
          return val === "false" || val === "";
        });

        const clusters = pointsData.map(row => row.Subcluster?.trim());
        const participant = pointsData.map(row => row.participant);

        const fertilityMetrics = {};
        const metricKeys = [
          'Sperm vitality (%)',
          'Normal spermatozoa (%)',
          'Head defects (%)',
          'Midpiece and neck defects (%)',
          'Tail defects (%)',
          'Cytoplasmic droplet (%)',
          'Teratozoospermia index',
          'Progressive motility (%)',
          'Non progressive sperm motility (%)',
          'Immotile sperm (%)',
          'High DNA stainability, HDS (%)',
          'DNA fragmentation index, DFI (%)'
        ];

        metricKeys.forEach(metric => {
          fertilityMetrics[metric] = pointsData.map(row => parseFloat(row[metric]));
        });

        setChartData({ clusters, participant, ...fertilityMetrics });
      }
    });
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (

    <section className="w-full min-h-screen bg-lightblue flex flex-col items-center justify-center">
    <div className="w-full max-w-screen-xl mx-auto bg-transparent p-8">
  
      <div className="w-full mb-6">
        <select
          className="border p-2 rounded bg-transparent text-black w-full sm:w-64"
          value={normalization}
          onChange={(e) => setNormalization(e.target.value)}
        >
          <option value="minmax">Min-Max</option>
          <option value="zscore">Z-Score</option>
          
        </select>
      </div>
  
      {/* Provide fixed height only here */}
      <div className="w-full h-[600px]">
        <FertilityChart chartData={chartData} normalization={normalization} />
      </div>
  
    </div>
  </section>
  );

};

export default FertilityChartToggle;
