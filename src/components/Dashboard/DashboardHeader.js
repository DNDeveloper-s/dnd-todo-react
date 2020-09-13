import React, { useEffect } from "react";
import CommentsFillIcon from "../../icons/CommentsFillIcon";
import DotsMenuHorizontal from "../../icons/DotsMenuHorizontal";
import useSortTasks from "../../hooks/useSortTasks";
import { getDataViaParams } from "../../helpers/utils";

// Components Imports

// Images Imports

const DashboardHeader = (props) => {
  const { getAlLTasksUnderId } = useSortTasks();
  const {
    match: { params },
  } = props;

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-group">
        <div className="dashboard-header-title">
          <p>{getDataViaParams(params, getAlLTasksUnderId).data.content}</p>
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
