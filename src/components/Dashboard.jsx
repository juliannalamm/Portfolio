import React from "react";
import DashboardClusterChart from './Charts/DashboardClusterChart';

const Dashboard = () => {
  return (
    <section 
      className="w-full min-h-screen bg-burgundy flex flex-col items-center justify-center py-16"
    >
      <h1 className="text-6xl font-bold text-white mb-8 text-center">
        Interactive Clustering Dashboard
      </h1>
      <div className="w-full max-w-screen-xl mx-auto bg-white p-8">
        <DashboardClusterChart />
        
      </div>
    </section>
  );
};

export default Dashboard;
