import React, {useState} from "react";
import "./dashboardDetailsBar.scss";
import PriorityHighIcon from "../../../icons/PriorityHighIcon";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import CheckBox from "../../UI/CheckBox/CheckBox";
import CaretRightIcon from "../../../icons/CaretRightIcon";
import ParagraphIcon from "../../../icons/ParagraphIcon";
import DescriptionEditor from "./DescriptionEditor";
import {useSelector} from "react-redux";
import {getAllLabels} from "../../../features/labelSlice";
import CheckListItemHandle from "./CheckListItemHandle";
import LabelsWrapper from "./Labels/LabelsWrapper";


const DetailsBar = () => {
  const [title, setTitle] = useState("Task title");
  const labels = useSelector(getAllLabels);

  const labelsArr = labels.entities.map((labelId) => {
    const label = labels.data[labelId];
    return {
      id: label.id,
      name: label.content,
      avatar: "",
      color: label.color,
      icon: label.icon,
      type: "label",
    };
  });

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
          <p>Parent task</p>
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
        <DescriptionEditor labelsData={labelsArr}/>
      </div>
      <div className="dashboard-detailsBar-innerItems">
        <CheckListItemHandle />
      </div>
      <div className="dashboard-detailsBar-labelsList">
        <LabelsWrapper labels={labelsArr}/>
      </div>
    </div>
  );
};

export default DetailsBar;
