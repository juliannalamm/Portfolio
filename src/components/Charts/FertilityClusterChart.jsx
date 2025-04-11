import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import AllClustersFertilityBoxPlot from './AllClusterFertilityChart';

const FertilityClusterChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        // Only use rows that are NOT centroids
        const pointsData = data.filter(row => {
          const val = row.Centroid ? row.Centroid.toString().trim().toLowerCase() : "";
          return val === "false" || val === "";
        });

        // Base metadata
        const clusters = pointsData.map(row => row.Subcluster ? row.Subcluster.trim() : "");
        const participant = pointsData.map(row => row.participant);

        // Fertility metrics only
        const fertilityMetrics = {
          "Sperm vitality (%)": [],
          "Normal spermatozoa (%)": [],
          "Head defects (%)": [],
          "Midpiece and neck defects (%)": [],
          "Tail defects (%)": [],
          "Cytoplasmic droplet (%)": [],
          "Teratozoospermia index": [],
          "Progressive motility (%)": [],
          "Non progressive sperm motility (%)": [],
          "Immotile sperm (%)": [],
          "High DNA stainability, HDS (%)": [],
          "DNA fragmentation index, DFI (%)": []
          // Skip 'Fertile' and 'Fertility Status' since they're categorical
        };

        pointsData.forEach(row => {
          for (const metric in fertilityMetrics) {
            const value = row[metric];
            fertilityMetrics[metric].push(
              isNaN(parseFloat(value)) ? value : parseFloat(value)
            );
          }
        });

        setChartData({
          clusters,
          participant,
          ...fertilityMetrics
        });
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  if (!chartData?.clusters) return <div>Loading fertility chart...</div>;

  return (
    <section className="w-full min-h-screen bg-lightblue flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-screen-xl mx-auto bg-transparent p-8">
        <AllClustersFertilityBoxPlot chartData={chartData} />
      </div>
    </section>
  );
};

export default FertilityClusterChart;
