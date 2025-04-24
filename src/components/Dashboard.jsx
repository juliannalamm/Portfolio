import React from "react";
import DashboardClusterChart from './Charts/DashboardClusterChart';

const Dashboard = () => {
  return (
    <section 
      className="w-full min-h-screen bg-black flex flex-col items-center justify-center py-16"
    >
  
      <div className="w-full max-w-screen-xl mx-auto bg-transparent p-8">
        <DashboardClusterChart />
        
      </div>
    </section>
  );
};

export default Dashboard;
