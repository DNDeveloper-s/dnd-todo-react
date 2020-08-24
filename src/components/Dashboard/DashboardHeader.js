import React from 'react';
import CommentsFillIcon from "../../icons/CommentsFillIcon";
import DotsMenuHorizontal from "../../icons/DotsMenuHorizontal";
import "./dashboardMain.css";

// Components Imports


// Images Imports

const DashboardHeader = () => {

    return (
        <div className="dashboard-header">
            <div className="dashboard-header-group">
                <div className="dashboard-header-title">
                    <p>Inbox</p>
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
