import React from "react";
import SideBar from "./SideBar/SideBar";
import DashboardHeader from "./DashboardHeader";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import DetailsBar from "./DetailsBar/DetailsBar";

// Components Imports

// Images Imports

const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-main dashboard_wrapper">
        <DashboardHeader/>
        <AddTask/>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
      </div>
      <DetailsBar />
    </div>
  );
};

export default Dashboard;
