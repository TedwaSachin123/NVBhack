import React from "react";
import "./index.css";
import MainQuestion from "./MainQuestion";
import Sidebar from "../blockvoice/Sidebar"

function Index() {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
      <Sidebar />
        <MainQuestion />
      </div>
    </div>
  );
}

export default Index;
