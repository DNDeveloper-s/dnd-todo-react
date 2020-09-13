import React, { useEffect, useRef } from "react";
import CommentsFillIcon from "../../icons/CommentsFillIcon";
import DotsMenuHorizontal from "../../icons/DotsMenuHorizontal";
import { constants } from "../../helpers/constants";

// Components Imports

// Images Imports
const dataAccToParams = {
  ["all-today"]: { header: "Today" },
  ["all-calendar"]: { header: "Calendar" },
  ["all-week"]: { header: "Next 7 days" },
  ["all-trash"]: { header: "Trash" },
};

const getDataViaParams = ({ typeId, scopeId }) => {
  if (typeId === "all")
    return dataAccToParams[typeId + constants.SEPARATOR + scopeId].header;
  return "Damn";
};

const DashboardHeader = (props) => {
  const {
    match: { params },
  } = props;

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-group">
        <div className="dashboard-header-title">
          <p>{getDataViaParams(params)}</p>
        </div>
      </div>
      <div className="dashboard-header-group">
        <div className="dashboard-header-icon">
          <CommentsFillIcon />
        </div>
        <div className="dashboard-header-icon">
          <DotsMenuHorizontal />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
