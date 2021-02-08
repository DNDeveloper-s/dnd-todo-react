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
import ProjectModal from "../../Actions/ProjectModal";
import LabelModal from "../../Actions/LabelModal";
import { ObjectId } from "bson";
import useApi from "../../../api/useApi";
import { constants } from "../../../helpers/constants";
import ConfirmationModal from "../../UI/ConfirmationModal";
import CollaboratorModal from "../../Actions/CollaboratorModal/CollaboratorModal";
import {logMessage} from "../../../helpers/utils";
import {useSelector} from "react-redux";
import {getCurUser} from "../../../features/authSlice";

// Components Imports

// Images Imports

const contextMenuItems = {
  project: [
    { id: "context-menu-project-1", label: "Edit", action: "edit", role: "owner can_edit can_view" },
    { id: "context-menu-project-2", label: "Invite", action: "invite", role: "owner can_edit can_view" },
    { id: "context-menu-project-3", label: "Manage", action: "manage", role: "owner can_edit" },
    { id: "context-menu-project-4", label: "Close", action: "close", role: "owner can_edit can_view" },
    { id: "context-menu-project-5", label: "Delete", action: "delete", role: "owner can_edit can_view" },
  ],
};

const SideBar = (props) => {
  const { createLabel, fetchLabelState, updateLabel } = useLabels();
  const curUser = useSelector(getCurUser);
  const {
    createProject,
    deleteProject,
    fetchProjectState,
    updateProject,
  } = useProjects();
  const { postWithAuthToken } = useApi();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  const [projectProps, setProjectProps] = useState({ name: "", color: "" });
  const [labelProps, setLabelProps] = useState({ name: "", color: "" });
  const [collaboratorProps, setCollaboratorProps] = useState({ projectId: "" });
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [conModalData, setConModalData] = useState({ data: null, show: false });
  // const [filters] = useFilters();

  function onListItemClick(item) {
    props.history.push("/app/" + item.id + "/tasks");
  }

  function addLabelHandler() {
    console.log("Label add");
    setLabelProps({
      initialData: {},
      onSave: onSaveLabel,
    });
    setShowLabelModal(true);
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
    const projectId = new ObjectId().toString();
    createProject({ id: projectId, color: data.color, content: data.name });
    postWithAuthToken(constants.ENDPOINTS.CREATE_PROJECT, {
      id: projectId,
      color: data.color,
      content: data.name,
      taskIds: [],
    })
      .then((res) => {
        console.log("[SideBar.js || Line no. 69 ....]", res);
      })
      .catch((e) => console.log("[SideBar.js || Line no. 69 ....]", e));
    setShowProjectModal(false);
  }

  function onSaveLabel(data) {
    console.log(data);
    createLabel(data);
    setShowLabelModal(false);
  }

  function onInviteCollaborator(data) {
    console.log(data);
  }

  function handleUpdateProject(projectId, data) {
    console.log(data);
    updateProject({ projectId, color: data.color, content: data.name });
    postWithAuthToken(constants.ENDPOINTS.UPDATE_PROJECT, {
      projectId,
      color: data.color,
      content: data.name,
    })
      .then((res) => {
        logMessage('Fetched successfully', res);
      })
      .catch((e) => logMessage('Error in fetching!', e, true));
    setShowProjectModal(false);
  }

  function handleUpdateLabel(labelId, data) {
    console.log(data);
    updateLabel({ labelId, color: data.color, content: data.name });
    postWithAuthToken(constants.ENDPOINTS.UPDATE_LABEL, {
      labelId,
      color: data.color,
      content: data.name,
    })
      .then((res) => {
        logMessage('Fetched successfully', res);
      })
      .catch((e) => logMessage('Error in fetching!', e, true));
    setShowLabelModal(false);
  }

  function contextMenuItemHandle({ type, action, item }, setVisible) {
    if (type === "project" && action === "edit") {
      setProjectProps({
        initialData: { name: item.content, color: item.color },
        onSave: (data) => handleUpdateProject(item.id, data),
      });
      setShowProjectModal(true);
    } else if (type === "project" && action === "delete") {
      setConModalData({ data: item, show: true });
    }
    if (type === "label" && action === "edit") {
      console.log("[SideBar.js || Line no. 118 ....]", item);
      setLabelProps({
        initialData: { name: item.content, color: item.color },
        onSave: (data) => handleUpdateLabel(item.id, data),
      });
      setShowLabelModal(true);
    }
    if (type === "project" && action === "invite") {
      console.log(item);
      setShowCollaboratorModal(true);
      setCollaboratorProps({ projectId: item.id });
    }
    setVisible(false);
  }

  function handleYes(setVisible) {
    setVisible(false);
    postWithAuthToken(constants.ENDPOINTS.DELETE_PROJECT, {
      projectId: conModalData.data.id,
    })
      .then((res) => {
        console.log(res);
        deleteProject(conModalData.data.id);
      })
      .catch((e) => console.log(e));
  }

  function handleNo(setVisible) {
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
              <div className="pv-5">
                {contextMenuItems.project.map((menuItems) => {
                  // Showing upon the roles
                  let roles = menuItems.role.split(' ');
                  let cond = item.users.some(c => c.user._id === curUser._id && roles.includes(c.role));
                  if(cond) {
                    return (
                      <div
                        key={menuItems.label}
                        className="pv-10 pl-20 itemHoverEffect heading_6 pointer"
                        onClick={() =>
                          contextMenuItemHandle(
                            { type: "project", item, action: menuItems.action },
                            setVisible
                          )
                        }
                      >
                        <p>{menuItems.label}</p>
                      </div>
                    )
                  }
                })}
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
                    key={menuItems.action}
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
        {...labelProps}
      />
      <CollaboratorModal
        onSave={onInviteCollaborator}
        setShowModal={setShowCollaboratorModal}
        showModal={showCollaboratorModal}
        {...collaboratorProps}
      />
      <ConfirmationModal
        handleNo={handleNo}
        handleYes={handleYes}
        setShowModal={(arg) =>
          setConModalData({ data: conModalData.data, show: arg })
        }
        showModal={conModalData.show}
      />
    </div>
  );
};

export default withRouter(SideBar);
