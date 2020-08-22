import React, {useState} from "react";
import "./dashboardDetailsBar.scss";
import PriorityHighIcon from "../../../icons/PriorityHighIcon";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import CheckBox from "../../UI/CheckBox/CheckBox";
import CaretDownIcon from "../../../icons/CaretDownIcon";
import CaretRightIcon from "../../../icons/CaretRightIcon";
import ListIcon from "../../../icons/ListIcon";
import ParagraphIcon from "../../../icons/ParagraphIcon";

// Components Imports

// Images Imports

const DetailsBar = () => {
  const [title, setTitle] = useState("");

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
          <PriorityHighIcon />
        </div>
      </div>
      <div className="dashboard-detailsBar-parent_task">
        <div className="dashboard-detailsBar-parent_task-title">
          <p>Parent Task</p>
        </div>
        <div className="dashboard-detailsBar-parent_task-icon">
          <CaretRightIcon />
        </div>
      </div>
      <div className="dashboard-detailsBar-title">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        <div className="dashboard-detailsBar-title-toggle_task_mode">
          <ParagraphIcon/>
        </div>
      </div>
      <div className="dashboard-detailsBar-desc">
        <textarea name="" id="" cols="30" rows="10" placeholder={"Description"} />
      </div>
    </div>
  );
};

export default DetailsBar;
