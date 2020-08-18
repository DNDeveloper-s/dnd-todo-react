import React from 'react';
import "./dashboardDetailsBar.css";
import PriorityHighIcon from "../../../icons/PriorityHighIcon";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import CheckBox from "../../UI/CheckBox/CheckBox";

// Components Imports


// Images Imports

const DetailsBar = () => {

  return (
    <div className="dashboard-detailsBar">
      <div className="dashboard-detailsBar-header">
        <CheckBox onChange={() => null} />
        <div className="vertical_separator" />
        <div className="dashboard-detailsBar-header-title">
          <div className="dashboard-detailsBar-header-title-icon">
            <CalendarWithDate date={"15"} />
          </div>
          <div className="dashboard-detailsBar-header-title-label">
            <p>Today, Aug 18</p>
          </div>
        </div>
        <div className="dashboard-detailsBar-header-icon">
          <PriorityHighIcon/>
        </div>
      </div>
    </div>
  );
};

export default DetailsBar;
