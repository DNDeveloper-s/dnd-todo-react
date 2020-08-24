import React from "react";
import "./dashboardSideBar.css";
import InboxIcon from "../../../icons/InboxIcon";
import RgbCalendarIcon from "../../../icons/RgbCalendarIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";
import CaretDownIcon from "../../../icons/CaretDownIcon";
import LabelsIcon from "../../../icons/LabelsIcon";
import FiltersIcon from "../../../icons/FiltersIcon";
import SideBarDropDown from "./SideBarDropDown";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import { getToday } from "../../CalendarPicker/helpers";
import { useSelector } from "react-redux";
import { getAllLabels } from "../../../features/labelSlice";
import { getAllProjects } from "../../../features/projectSlice";
import {Link} from "react-router-dom";

// Components Imports

// Images Imports

const SideBar = (props) => {
  const labels = useSelector(getAllLabels);
  const projects = useSelector(getAllProjects);
  // const [filters] = useFilters();

  return (
    <div className="dashboard-sidebar">
      <Link to={"/app/inbox"} >
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <InboxIcon />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Inbox</p>
          </div>
        </div>
      </Link>
      <Link to={"/app/today"} >
      <div className="dashboard-sidebar-item">
        <div className="dashboard-sidebar-item-icon">
          <CalendarWithDate
            fill={"#ffffff"}
            date={getToday().day}
            textColor={"#363636"}
          />
        </div>
        <div className="dashboard-sidebar-item-label">
          <p>Today</p>
        </div>
      </div>
      </Link>
      <Link to={"/app/upcoming"} >
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <RgbCalendarIcon />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Upcoming</p>
          </div>
        </div>
      </Link>
      <div className="dashboard-sidebar-item dropdown">
        <SideBarDropDown
          items={projects}
          toggle_menu={(visible) => (
            <>
              <div className="dashboard-sidebar-item-icon white">
                <ProjectsIcon />
              </div>
              <div className="dashboard-sidebar-item-label">
                <p>Projects</p>
              </div>
              <div
                className={[
                  "dashboard-sidebar-item-caret",
                  visible ? "visible" : "",
                ].join(" ")}
              >
                <CaretDownIcon />
              </div>
            </>
          )}
        />
      </div>
      <div className="dashboard-sidebar-item dropdown">
        <SideBarDropDown
          items={labels}
          toggle_menu={(visible) => (
            <>
              <div className="dashboard-sidebar-item-icon">
                <LabelsIcon />
              </div>
              <div className="dashboard-sidebar-item-label">
                <p>Labels</p>
              </div>
              <div
                className={[
                  "dashboard-sidebar-item-caret",
                  visible ? "visible" : "",
                ].join(" ")}
              >
                <CaretDownIcon />
              </div>
            </>
          )}
        />
      </div>
      {/*<div className="dashboard-sidebar-item dropdown">*/}
      {/*  <SideBarDropDown*/}
      {/*    items={filters}*/}
      {/*    toggle_menu={(visible) => (*/}
      {/*      <>*/}
      {/*        <div className="dashboard-sidebar-item-icon">*/}
      {/*          <FiltersIcon />*/}
      {/*        </div>*/}
      {/*        <div className="dashboard-sidebar-item-label">*/}
      {/*          <p>Filters</p>*/}
      {/*        </div>*/}
      {/*        <div*/}
      {/*          className={[*/}
      {/*            "dashboard-sidebar-item-caret",*/}
      {/*            visible ? "visible" : "",*/}
      {/*          ].join(" ")}*/}
      {/*        >*/}
      {/*          <CaretDownIcon />*/}
      {/*        </div>*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default SideBar;
