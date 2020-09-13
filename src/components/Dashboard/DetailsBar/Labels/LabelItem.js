import React from "react";
import CloseIcon from "../../../../icons/CloseIcon";
import LabelIcon from "../../../../icons/LabelIcon";

const LabelItem = ({ label, onCloseClick }) => {
  return (
    <div
      className="dashboard-detailsBar-labelsList-labelItem"
      style={{ backgroundColor: label.color }}
    >
      <div
        className="dashboard-detailsBar-labelsList-labelItem-close_icon"
        onClick={() => onCloseClick(label.id)}
      >
        <CloseIcon fill={"#fff"} />
      </div>
      <div className="dashboard-detailsBar-labelsList-labelItem-icon">
        <LabelIcon fill={"#fff"} />
      </div>
      <div className="dashboard-detailsBar-labelsList-labelItem-title">
        <p>{label.content}</p>
      </div>
    </div>
  );
};

export default LabelItem;
