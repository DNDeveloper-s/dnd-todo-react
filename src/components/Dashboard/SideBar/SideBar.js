import React, { useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
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
import ProjectModal from "../../Actions/ProjectModal";
import LabelModal from "../../Actions/LabelModal";
import DropdownNew from "../../UI/DropDownNew/DropdownNew";
import ContextMenu from "../../UI/ContextMenu/ContextMenu";

// Components Imports

// Images Imports

const contextMenuItems = {
  project: [
    { id: "context-menu-project-1", label: "Edit", action: "edit" },
    { id: "context-menu-project-2", label: "Share", action: "share" },
    { id: "context-menu-project-3", label: "Duplicate", action: "duplicate" },
    { id: "context-menu-project-4", label: "Close", action: "close" },
    { id: "context-menu-project-5", label: "Delete", action: "delete" },
  ],
};

const SideBar = (props) => {
  const { fetchLabelState } = useLabels();
  const { createProject, fetchProjectState, updateProject } = useProjects();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectProps, setProjectProps] = useState({});
  const [showLabelModal, setShowLabelModal] = useState(false);
  // const [filters] = useFilters();

  function onListItemClick(item) {
    props.history.push("/app/" + item.id + "/tasks");
  }

  function addLabelHandler() {
    // setShowModal(true);
  }

  function addProjectHandler() {
    console.log("Project add");
    setProjectProps({
      initialData: {},
      onSave: onSaveProject,
    });
    setShowProjectModal(true);
  }

  function onSaveProject(data) {
    console.log(data);
    createProject({ id: uuidV4(), color: data.color, content: data.name });
    setShowProjectModal(false);
  }

  function onSaveLabel(data) {
    console.log(data);
  }

  function handleUpdateProject(projectId, data) {
    console.log(data);
    updateProject({ projectId, color: data.color, content: data.name });
    setShowProjectModal(false);
  }

  function contextMenuItemHandle({ type, action, item }, setVisible) {
    console.log(type, action, item);
    if (type === "project" && action === "edit") {
      setProjectProps({
        initialData: { name: item.content, color: item.color },
        onSave: (data) => handleUpdateProject(item.id, data),
      });
      setShowProjectModal(true);
    }
    setVisible(false);
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
          contextMenu={{
            holderStyle: { minWidth: "14rem" },
            children: (item, setVisible) => (
              <div className="pv-10">
                {contextMenuItems.project.map((menuItems) => (
                  <div
                    className="pv-10 pl-20 itemHoverEffect pointer"
                    onClick={() =>
                      contextMenuItemHandle(
                        { type: "project", item, action: menuItems.action },
                        setVisible
                      )
                    }
                  >
                    <p>{menuItems.label}</p>
                  </div>
                ))}
              </div>
            ),
          }}
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
          contextMenu={{
            holderStyle: { minWidth: "14rem" },
            children: (item, setVisible) => (
              <div className="pv-10">
                {contextMenuItems.project.map((menuItems) => (
                  <div
                    className="pv-10 pl-20 itemHoverEffect pointer"
                    onClick={() =>
                      contextMenuItemHandle(
                        { type: "label", item, action: menuItems.action },
                        setVisible
                      )
                    }
                  >
                    <p>{menuItems.label}</p>
                  </div>
                ))}
              </div>
            ),
          }}
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
      <ProjectModal
        onSave={onSaveProject}
        showModal={showProjectModal}
        setShowModal={setShowProjectModal}
        {...projectProps}
      />
      <LabelModal
        onSave={onSaveLabel}
        setShowModal={setShowLabelModal}
        showModal={showLabelModal}
      />
    </div>
  );
};

export default withRouter(SideBar);
