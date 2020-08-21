import React from "react";
import "./dashboardSideBar.css";
import InboxIcon from "../../../icons/InboxIcon";
import RgbCalendarIcon from "../../../icons/RgbCalendarIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";
import CaretDownIcon from "../../../icons/CaretDownIcon";
import LabelsIcon from "../../../icons/LabelsIcon";
import FiltersIcon from "../../../icons/FiltersIcon";
import SideBarDropDown from "./SideBarDropDown";
import useProjects from "../../../hooks/useProjects";
import useLabels from "../../../hooks/useLabels";
import useFilters from "../../../hooks/useFilters";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import {getToday} from "../../CalendarPicker/helpers";
import {useSelector} from "react-redux";
import {getAllLabels} from "../../../features/labelSlice";

// Components Imports

// Images Imports

const SideBar = (props) => {
  // const [projects] = useProjects();
  // const [labels] = useLabels();
  const labels = useSelector(getAllLabels);
  // const [filters] = useFilters();

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar-item">
        <div className="dashboard-sidebar-item-icon">
          <InboxIcon />
        </div>
        <div className="dashboard-sidebar-item-label">
          <p>Inbox</p>
        </div>
      </div>
      <div className="dashboard-sidebar-item">
        <div className="dashboard-sidebar-item-icon">
          <CalendarWithDate fill={'#ffffff'} date={getToday().day} textColor={'#363636'} />
        </div>
        <div className="dashboard-sidebar-item-label">
          <p>Today</p>
        </div>
      </div>
      <div className="dashboard-sidebar-item">
        <div className="dashboard-sidebar-item-icon">
          <RgbCalendarIcon />
        </div>
        <div className="dashboard-sidebar-item-label">
          <p>Upcoming</p>
        </div>
      </div>
      {/*<div className="dashboard-sidebar-item dropdown">*/}
      {/*  <SideBarDropDown*/}
      {/*    items={projects}*/}
      {/*    toggle_menu={(visible) => (*/}
      {/*      <>*/}
      {/*        <div className="dashboard-sidebar-item-icon">*/}
      {/*          <ProjectsIcon />*/}
      {/*        </div>*/}
      {/*        <div className="dashboard-sidebar-item-label">*/}
      {/*          <p>Projects</p>*/}
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
