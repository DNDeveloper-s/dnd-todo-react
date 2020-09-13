import React from "react";
import LabelIcon from "../../../icons/LabelIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";

// Components Imports

// Images Imports

const SideBarDropDownItem = ({ item }) => {
  return (
    <div className="dashboard-sidebar-dropdown-item">
      {item.type === "label" && (
        <div className="dashboard-sidebar-dropdown-item-icon">
          <LabelIcon fill={item.color} />
        </div>
      )}
      {item.type === "project" && (
        <div className="dashboard-sidebar-dropdown-item-icon">
          <ProjectsIcon scale={0.8} fill={item.color} />
        </div>
      )}
      <div className="dashboard-sidebar-dropdown-item-label">
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default SideBarDropDownItem;
