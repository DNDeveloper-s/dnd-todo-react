import React from "react";
import SideBar from "./SideBar/SideBar";
import DashboardHeader from "./DashboardHeader";
import AddTask from "./Task/AddTask/AddTask";
import DndList from "./Task/DndList";
import DetailsBar from "./DetailsBar/DetailsBar";

// Components Imports

// Images Imports

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-main dashboard_wrapper">
        <DashboardHeader />
        <AddTask />
        <DndList />
      </div>
      <DetailsBar />
    </div>
  );
};

export default Dashboard;
