import React from "react";
import DashboardClusterChart from './Charts/DashboardClusterChart';

const Dashboard = () => {
  return (
    <section className="w-full min-h-screen bg-black py-16">
      {/* allow full-width children */}
      <div className="w-full bg-transparent px-7">
        <DashboardClusterChart />
      </div>
    </section>
  );
};

export default Dashboard;
