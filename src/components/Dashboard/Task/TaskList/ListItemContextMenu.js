import React, {useState} from "react";
import { DELETE_TASK_NEW } from "../../../../features/taskSlice";
import ContextMenu from "../../../UI/ContextMenu/ContextMenu";
import HorizontalSelect from "../../../UI/HorizontalSelect/HorizontalSelect";
import { priorities, recurrences } from "../../../../helpers/data";
import { getPriorityByInd, jumpToDate } from "../../../../helpers/utils";
import useTasks from "../../../../hooks/useTasks";
import SubTaskIcon from "../../../../icons/SubTaskIcon";
import ProjectsIcon from "../../../../icons/ProjectsIcon";
import LabelIcon from "../../../../icons/LabelIcon";
import CopyIcon from "../../../../icons/CopyIcon";
import DeleteIcon from "../../../../icons/DeleteIcon";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import classes from "../../../UI/Dropdown/Dropdown.module.scss";
import useProjects from "../../../../hooks/useProjects";
import { useDispatch } from "react-redux";
import useApi from "../../../../api/useApi";
import {constants} from "../../../../helpers/constants";
import ConfirmationModal from "../../../UI/ConfirmationModal";
import ActivityIcon from "../../../../icons/ActivityIcon";
import TaskActivityModal from "../../../Actions/TaskActivityModal/TaskActivityModal";

const ListItemContextMenu = ({ listenerRef, item }) => {
  const [conModalData, setConModalData] = useState({data: null, show: false});
  const { updateTask, deleteTask, moveToProject } = useTasks();
  const { curProject, fetchAllProjectIds } = useProjects();
  const dispatch = useDispatch();
  const {postWithAuthToken} = useApi();
  const [showActivityModal, setShowActivityModal] = useState(false);

  function onPrioritySelect(priorityObj, setVisible) {
    updateTask({ taskId: item.id, priority: priorityObj.ind });
    setVisible(false);
  }

  function onRecurrenceSelect(recurrenceObj, setVisible) {
    setVisible(false);
    updateTask({
      taskId: item.id,
      startDate: jumpToDate(item, recurrenceObj.params).toISOString(),
    });
  }

  function onVerticalItemClick(action) {
    if (action === "delete") {
      deleteTask(item.id);
    }
  }

  function moveToProjectHandler(taskId, toProjectId) {
    moveToProject(taskId, toProjectId);
  }

  function deleteTaskHandler(taskId, setVisible) {
    setVisible(false);
    setConModalData({data: {taskId}, show: true});
  }

  function handleYes() {
    console.log('[ListItemContextMenu.js || Line no. 47 ....]', conModalData.data.taskId);

    postWithAuthToken(constants.ENDPOINTS.UPDATE_TASK, {taskId: conModalData.data.taskId, deleted: 1})
      .then(res => {
        console.log('[ListItemContextMenu.js || Line no. 52 ....]', res);
        dispatch(DELETE_TASK_NEW({taskId: conModalData.data.taskId}));
      })
      .catch(e => console.log(e));
  }

  function handleNo(setVisible) {
    setVisible(false);
  }

  function onShowActivityClick(setVisible) {
    setShowActivityModal(true);
    setVisible(false);
  }

  return (
    <>
      <ContextMenu listenerRef={listenerRef}>
        {(setVisible) => (
          <>
            <HorizontalSelect
              headerText="Date"
              activeItem={recurrences[2]}
              noActive={true}
              ItemComponent={() => {
                return recurrences.map((recurrence, index) => (
                  <div
                    key={recurrence.id}
                    className="recurrence-item ariaLabel"
                    aria-label={recurrence.label}
                    onClick={() => onRecurrenceSelect(recurrence, setVisible)}
                  >
                    <recurrence.IconComponent />
                  </div>
                ));
              }}
            />
            <HorizontalSelect
              items={priorities}
              headerText="Priority"
              activeItem={getPriorityByInd(item.priority)}
              onItemSelect={(d) => onPrioritySelect(d, setVisible)}
              allowAriaLabel
            />
            <div className="context-menu-item">
              <div className="context-menu-item-icon">
                <SubTaskIcon />
              </div>
              <div className="context-menu-item-label">
                <p>Add Subtask</p>
              </div>
            </div>
            <Dropdown
              ItemComponent={() =>
                fetchAllProjectIds(true).map((projectId) => (
                  <div
                    className="flex pv-10 ph-20 itemHoverEffect pointer"
                    onClick={() => moveToProjectHandler(item.id, projectId)}
                    key={projectId}
                  >
                    <div className="mr-20">
                      <ProjectsIcon fill={curProject(projectId).color} />
                    </div>
                    <div className="heading_6">
                      {curProject(projectId).content}
                    </div>
                  </div>
                ))
              }
              containerStyle={{
                width: "110%",
                maxHeight: "250px",
                overflow: "auto",
                padding: ".7rem 0",
              }}
              containerClassNames={[classes["horCenter"]]}
              handle={
                <div className="context-menu-item">
                  <div className="context-menu-item-icon">
                    <ProjectsIcon />
                  </div>
                  <div className="context-menu-item-label">
                    <p>Move to</p>
                  </div>
                </div>
              }
            />
            <div className="context-menu-item">
              <div className="context-menu-item-icon">
                <LabelIcon />
              </div>
              <div className="context-menu-item-label">
                <p>Tags</p>
              </div>
            </div>
            <div className="generic_separator" />
            <div className="context-menu-item">
              <div className="context-menu-item-icon">
                <CopyIcon />
              </div>
              <div className="context-menu-item-label">
                <p>Copy Task Link</p>
              </div>
            </div>
            <div className="context-menu-item" onClick={() => deleteTaskHandler(item.id, setVisible)}>
              <div className="context-menu-item-icon">
                <DeleteIcon />
              </div>
              <div className="context-menu-item-label">
                <p>Delete</p>
              </div>
            </div>
            <div className="generic_separator" />
            <div className="context-menu-item" onClick={() => onShowActivityClick(setVisible)}>
              <div className="context-menu-item-icon">
                <ActivityIcon />
              </div>
              <div className="context-menu-item-label">
                <p>Show Activities</p>
              </div>
            </div>
          </>
        )}
      </ContextMenu>
      <ConfirmationModal
        handleNo={handleNo}
        handleYes={handleYes}
        setShowModal={(arg) => setConModalData({data: conModalData.data, show: arg})}
        showModal={conModalData.show}
      />
      <TaskActivityModal
        onSave={() => null}
        showModal={showActivityModal}
        setShowModal={setShowActivityModal}
        task={item}
      />
    </>
  );
};

export default ListItemContextMenu;
