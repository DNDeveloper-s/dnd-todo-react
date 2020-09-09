import React, { useState } from "react";
import SideBar from "./SideBar/SideBar";
import DashboardHeader from "./DashboardHeader";
import AddTask from "./Task/AddTask/AddTask";
import DndList from "./Task/TaskList/DndList";
import DetailsBar from "./DetailsBar/DetailsBar";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import NoMatchedTask from "./Task/NoMatchedTask";
import CaretRightIcon from "../../icons/CaretRightIcon";
import { classNames } from "../../helpers/utils";
import useInitMinutes from "../../hooks/useInitMinutes";
import useTasks from "../../hooks/useTasks";
import useTriggers from "../../hooks/useTriggers";
import ReminderModal from "../ReminderModal/ReminderModal";
import TriggerReminder from "./TriggerReminder";
import "./dashboardMain.scss";

// Components Imports

// Images Imports

const Dashboard = (props) => {
  const [visible, setVisible] = useState(true);
  const { fetchTaskState } = useTasks();
  useInitMinutes({ taskState: fetchTaskState() });
  useTriggers();

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-main dashboard_wrapper">
        <Route path={"/app/inbox"}>
          <DashboardHeader />
          <AddTask />
          <DndList />
        </Route>
      </div>
      <div
        className={classNames("dashboard-detailsBar", {
          closed: !visible,
        })}
      >
        <div
          className={classNames("dashboard-detailsBar-toggle", {
            closed: !visible,
          })}
          onClick={() => setVisible(!visible)}
        >
          <CaretRightIcon />
        </div>
        <Switch>
          <Route exact path={"/app/inbox/:taskId"} component={DetailsBar} />
          <Route component={NoMatchedTask} />
        </Switch>
      </div>
      <TriggerReminder />
    </div>
  );
};

export default Dashboard;
