import React from "react";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <Link to="/activities">Activities</Link>
        <Link to="/filter">Filter</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;