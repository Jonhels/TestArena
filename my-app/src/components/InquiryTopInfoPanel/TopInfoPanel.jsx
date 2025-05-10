import React from "react";
import "./TopInfoPanel.css";

const TopInfoPanel = ({ data }) => {
  if (!data) {
    return <div>Laster henveldelse...</div>;
  }

  return (
    <div className="TopInfoPanelWrapper">
      <div>
        <h2>{data.title}</h2>
      </div>
    </div>
  );
};

export default TopInfoPanel;
