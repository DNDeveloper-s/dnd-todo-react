import React from "react";
import LabelIcon from "../../../icons/LabelIcon";

// Components Imports

// Images Imports

const SideBarDropDownItem = ({ item }) => {
  return (
    <div className="dashboard-sidebar-dropdown-item">
      <div className="dashboard-sidebar-dropdown-item-icon">
        <LabelIcon fill={item.color}/>
      </div>
      <div className="dashboard-sidebar-dropdown-item-label">
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default SideBarDropDownItem;
