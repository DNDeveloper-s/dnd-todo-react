import React from "react";
import "./dashboardSideBar.css";
import InboxIcon from "../../../icons/InboxIcon";
import RgbCalendarIcon from "../../../icons/RgbCalendarIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";
import CaretDownIcon from "../../../icons/CaretDownIcon";
import LabelsIcon from "../../../icons/LabelsIcon";
import SideBarDropDown from "./SideBarDropDown";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import { getToday } from "../../CalendarPicker/helpers";
import { Link } from "react-router-dom";
import useLabels from "../../../hooks/useLabels";
import useProjects from "../../../hooks/useProjects";
import CalendarIcon from "../../../icons/CalendarIcon";

// Components Imports

// Images Imports

const SideBar = (props) => {
  const { fetchLabelState } = useLabels();
  const { fetchProjectState } = useProjects();
  // const [filters] = useFilters();

  return (
    <div className="dashboard-sidebar">
      <Link to={"/app/inbox"}>
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <InboxIcon />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Inbox</p>
          </div>
        </div>
      </Link>
      <Link to={"/app/today"}>
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
      <Link to={"/app/calendar"}>
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <CalendarIcon fill="#fff" />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Calendar</p>
          </div>
        </div>
      </Link>
      <Link to={"/app/upcoming"}>
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
          items={fetchProjectState().projects}
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
                <CaretDownIcon fill={"#fff"} />
              </div>
            </>
          )}
        />
      </div>
      <div className="dashboard-sidebar-item dropdown">
        <SideBarDropDown
          items={fetchLabelState().labels}
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
                <CaretDownIcon fill={"#fff"} />
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
