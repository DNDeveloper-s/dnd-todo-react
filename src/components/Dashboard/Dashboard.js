import React, { useEffect, useState } from "react";
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
import useTriggers from "../../hooks/useTriggers";
import TriggerReminder from "./TriggerReminder";
import "./dashboardMain.scss";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../api/useApi";
import { constants } from "../../helpers/constants";
import { LOAD_SINGLE_TASK, LOAD_TASKS } from "../../features/taskSlice";
import { LOAD_PROJECTS } from "../../features/projectSlice";
import {
  LOAD_GLOBAL_DATA,
  LOAD_NOTIFICATIONS,
} from "../../features/globalSlice";
import { LOAD_LABELS } from "../../features/labelSlice";
import { UPDATE_USER_STATUS } from "../../features/socketSlice";
import AppLoadingPage from "../UI/AppLoadingPage";
import { getAuthState } from "../../features/authSlice";
import {
  disconnectSocket,
  initiateSocket,
  subscribeToCreateTask,
  subscribeToNotification,
  subscribeToTaskUpdate,
  subscribeToUserStatus,
} from "../../features/socket";

// Components Imports

// Images Imports

const Dashboard = (props) => {
  const [visible, setVisible] = useState(true);
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const { getWithAuthToken } = useApi();
  const [isReady, setIsReady] = useState(false);
  // const { fetchTaskState } = useTasks();
  // useInitMinutes({ taskState: fetchTaskState() });
  useTriggers();

  useEffect(() => {
    // Connecting to the socket.io
    initiateSocket(authState.token);

    subscribeToNotification((err, message) => {
      console.log("[Dashboard.js || Line no. 45 ....]", err, message);
      getWithAuthToken(constants.ENDPOINTS.GET_NOTIFICATIONS).then((res) => {
        console.log("[Dashboard.js || Line no. 38 ....]", res);
        if (res.data.type !== "error") {
          dispatch(LOAD_NOTIFICATIONS(res.data.notifications));
        }
      });
    });

    subscribeToUserStatus((err, { userId, status }) => {
      dispatch(UPDATE_USER_STATUS({ userId, status }));
    });

    subscribeToCreateTask(() => {
      getWithAuthToken(constants.ENDPOINTS.GET_APP_DATA).then((res) => {
        console.log("[Dashboard.js || Line no. 38 ....]", res);
        if (res.data.type !== "error") {
          dispatch(LOAD_TASKS(res.data.appData));
        }
      });
    });

    subscribeToTaskUpdate((err, { taskId }) => {
      getWithAuthToken(constants.ENDPOINTS.GET_TASK + "?taskId=" + taskId).then(
        (res) => {
          console.log("[Dashboard.js || Line no. 38 ....]", res);
          if (res.data.type !== "error") {
            dispatch(LOAD_SINGLE_TASK({ task: res.data.task }));
          }
        }
      );
    });

    loadAppData();

    function loadAppData() {
      getWithAuthToken(constants.ENDPOINTS.GET_APP_DATA).then((res) => {
        console.log("[Dashboard.js || Line no. 38 ....]", res);
        if (res.data.type !== "error") {
          dispatch(LOAD_TASKS(res.data.appData));
          dispatch(LOAD_PROJECTS(res.data.appData));
          dispatch(LOAD_LABELS(res.data.appData));
          dispatch(LOAD_GLOBAL_DATA(res.data.appData.global));
          dispatch(LOAD_NOTIFICATIONS(res.data.notifications));
        }
        setIsReady(true);
      });
      // .catch(e => console.log('[Dashboard.js || Line no. 40 ....]', e));
    }

    const onlineHandler = () => {
      console.log('[Dashboard.js || Line no. 107 ....]', 'You are online');
    };

    const offlineHandler = () => {
      console.log('[Dashboard.js || Line no. 107 ....]', 'You are offline');
    };

    window.addEventListener('online', onlineHandler);

    window.addEventListener('offline', offlineHandler);

    // CLEAN UP THE EFFECT
    return () => {
      disconnectSocket();

      window.removeEventListener('online', onlineHandler);

      window.removeEventListener('offline', offlineHandler);
    };
    //
  }, []);

  return isReady ? (
    <div className="dashboard">
      {isReady && <SideBar />}
      <div className="dashboard-main dashboard_wrapper">
        <Route
          path={"/app/:typeId/:scopeId"}
          render={(props) => (
            <>
              <DashboardHeader {...props} />
              <AddTask {...props} />
              {isReady && <DndList {...props} />}
            </>
          )}
        />
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
          <Route
            exact
            path={"/app/:typeId/:scopeId/:taskId"}
            component={DetailsBar}
          />
          <Route component={NoMatchedTask} />
        </Switch>
      </div>
      <TriggerReminder />
    </div>
  ) : (
    <AppLoadingPage />
  );
};

export default Dashboard;
