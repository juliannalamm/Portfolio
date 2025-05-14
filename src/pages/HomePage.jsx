import React from "react";

import MainHero from "../components/MainHero";
import ProjectGrid from "../components/ProjectGrid";

import { Table } from "lucide-react";

const HomePage = () => {
  return (
    <div>

      <MainHero /> {/* Clean, centered about section */}

      <ProjectGrid /> {/* Your portfolio or project showcase */}
    </div>
  );
};

export default HomePage;
