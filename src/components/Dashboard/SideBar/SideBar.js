import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./dashboardSideBar.scss";
import InboxIcon from "../../../icons/InboxIcon";
import RgbCalendarIcon from "../../../icons/RgbCalendarIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";
import CaretDownIcon from "../../../icons/CaretDownIcon";
import LabelsIcon from "../../../icons/LabelsIcon";
import SideBarDropDown from "./SideBarDropDown";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import { getToday } from "../../CalendarPicker/helpers";
import useLabels from "../../../hooks/useLabels";
import useProjects from "../../../hooks/useProjects";
import CalendarIcon from "../../../icons/CalendarIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import AppModal from "../../UI/AppModal/AppModal";
import AppButton from "../../UI/AppButton";
import ColorPicker from "../../ColorPicker/ColorPicker";

// Components Imports

// Images Imports

const SideBar = (props) => {
  const { fetchLabelState } = useLabels();
  const { fetchProjectState } = useProjects();
  const [showModal, setShowModal] = useState(false);
  // const [filters] = useFilters();

  function onListItemClick(item) {
    props.history.push("/app/" + item.id + "/tasks");
  }

  function addLabelHandler() {
    console.log("Label add");
    setShowModal(true);
  }

  function addProjectHandler() {
    console.log("Project add");
  }

  return (
    <div className="dashboard-sidebar">
      <Link to={"/app/inbox/tasks"}>
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <InboxIcon />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Inbox</p>
          </div>
        </div>
      </Link>
      <Link to={"/app/all/today"}>
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
      <Link to={"/app/all/calendar"}>
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <CalendarIcon fill="#fff" />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Calendar</p>
          </div>
        </div>
      </Link>
      <Link to={"/app/all/week"}>
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <RgbCalendarIcon />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Next 7 days</p>
          </div>
        </div>
      </Link>
      <div className="dashboard-sidebar-item dropdown">
        <SideBarDropDown
          items={fetchProjectState().projects}
          onItemClick={onListItemClick}
          footer={{
            content: "Add Project",
            onClick: addProjectHandler,
          }}
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
          onItemClick={onListItemClick}
          footer={{
            content: "Add Label",
            onClick: addLabelHandler,
          }}
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
      <Link to={"/app/all/trash"}>
        <div className="dashboard-sidebar-item">
          <div className="dashboard-sidebar-item-icon">
            <DeleteIcon fill="#fff" />
          </div>
          <div className="dashboard-sidebar-item-label">
            <p>Trash</p>
          </div>
        </div>
      </Link>
      <AppModal
        showIt={showModal}
        setShowIt={setShowModal}
        onClose={() => null}
      >
        {() => (
          <div className="nothing but modal">
            <div className="heading_4">
              <p>Add Project</p>
            </div>
            <div className="generic_input lightFont mv-20">
              <input type="text" placeholder="Project Name" />
            </div>
            <ColorPicker />
            <div className="flex mt-40">
              <AppButton
                primary
                label="Create"
                style={{ marginRight: "10px" }}
              />
              <AppButton label="Cancel" />
            </div>
          </div>
        )}
      </AppModal>
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

export default withRouter(SideBar);
