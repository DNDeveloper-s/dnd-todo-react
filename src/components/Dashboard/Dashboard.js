import React, {useEffect, useState} from "react";
import SideBar from "./SideBar/SideBar";
import DashboardHeader from "./DashboardHeader";
import AddTask from "./Task/AddTask";
// import TaskColumn from "./Task/TaskColumn";
// import {DragDropContext} from "react-beautiful-dnd";
import DndList from "./Task/DndList";

// Components Imports

// Images Imports

const Dashboard = (props) => {


  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-main dashboard_wrapper">
        <DashboardHeader/>
        <AddTask/>
        <DndList />
      </div>
      {/*<DetailsBar />*/}
    </div>
  );
};

export default Dashboard;
