import React from "react";
import { withRouter } from "react-router";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import { constants } from "../../../../helpers/constants";
import ListItem from "./ListItem";
import DropTargetForTask from "./DropTargetForTask";
import { classNames } from "../../../../helpers/utils";
import "./DNDList.scss";
import useTasks from "../../../../hooks/useTasks";
import useFocus from "../../../../hooks/useFocus";

const DNDList = (props) => {
  const {
    getExpandedTreeArr,
    getCompletedTasks,
    taskState,
    getDragState,
    setDragState,
  } = useTreeDataUtils();
  const { fetchActiveTask, updateStatus } = useTasks();
  const { focusId, setFocusId } = useFocus(null);

  function onDropToCompleteSection(draggedItem) {
    updateStatus(draggedItem.id, true);
  }

  function onTitleClick(taskId, event) {
    props.history.push(props.match.url + "/" + taskId);
  }

  return (
    <>
      <div
        className="dnd_list-container"
        style={{
          height:
            getExpandedTreeArr(constants.DRAG_FROM.MAIN, "incomplete").length *
            constants.ITEM_HEIGHT,
          transition: "height 0.3s cubic-bezier(0, 0.86, 0.61, 1.15) 0s",
        }}
      >
        {getExpandedTreeArr(constants.DRAG_FROM.MAIN, "incomplete").map(
          (taskId, index) => (
            <ListItem
              config={{
                itemType: constants.ITEM_TYPES.TASK,
                dragFrom: constants.DRAG_FROM.MAIN,
              }}
              key={taskId}
              index={index}
              filter="incomplete"
              active={fetchActiveTask() === taskId}
              item={taskState.tasks[taskId]}
              startsDragging={setDragState}
              onTitleClick={onTitleClick}
              focusId={focusId}
              setFocusId={setFocusId}
            />
          )
        )}
      </div>
      <div
        className="dnd_list-container completed empty"
        style={{
          height: getCompletedTasks().length * constants.ITEM_HEIGHT,
        }}
      >
        {
          <>
            {getCompletedTasks().length === 0 ? (
              <p>Hey, Lets wrap up some tasks.</p>
            ) : (
              getCompletedTasks().map((taskId, index) => (
                <ListItem
                  config={{
                    itemType: constants.ITEM_TYPES.TASK,
                    noTreeStyle: true,
                    dragFrom: constants.DRAG_FROM.COMPLETED,
                  }}
                  startsDragging={setDragState}
                  key={taskId}
                  index={index}
                  active={fetchActiveTask() === taskId}
                  item={taskState.tasks[taskId]}
                  onTitleClick={onTitleClick}
                />
              ))
            )}
            <div
              className={classNames("dnd_list-container--drop-area", {
                isDragging:
                  getDragState().isDragging &&
                  getDragState().dragItem.dragFrom !== "completed",
              })}
            >
              <DropTargetForTask onDrop={onDropToCompleteSection} />
            </div>
          </>
        }
      </div>
    </>
  );
};

export default withRouter(DNDList);
