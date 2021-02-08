import React, { useEffect } from "react";
import { withRouter } from "react-router";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import { constants } from "../../../../helpers/constants";
import ListItem from "./ListItem";
import DropTargetForTask from "./DropTargetForTask";
import { classNames, getDataViaParams } from "../../../../helpers/utils";
import "./DNDList.scss";
import useTasks from "../../../../hooks/useTasks";
import useFocus from "../../../../hooks/useFocus";
import useSortTasks from "../../../../hooks/useSortTasks";
import useApi from "../../../../api/useApi";
import CompletedTaskSvg from "../../../UI/CompletedTaskSvg";

const DNDList = (props) => {
  const {
    getExpandedTreeArr,
    getCompletedTasks,
    taskState,
    getDragState,
    setDragState,
  } = useTreeDataUtils();
  const { fetchActiveTask, updateStatus, updateTask, curTask } = useTasks();
  const {postWithAuthToken} = useApi();
  const { getAlLTasksUnderId, sortTasksByDate, typeByParams } = useSortTasks();
  const { focusId, setFocusId } = useFocus(null);

  const {
    match: { params },
  } = props;

  const treeOfIncompleteTasks = getExpandedTreeArr(constants.DRAG_FROM.MAIN, {
    myTaskScope: getDataViaParams(params, getAlLTasksUnderId).data.taskIds,
    filters: getDataViaParams(params, getAlLTasksUnderId).filters,
  });

  // useEffect(() => {
  //   //   console.log('[DndList.js || Line no. 30 ....]', treeOfIncompleteTasks);
  //   //   treeOfIncompleteTasks.treeArr.map((taskId, index) => {
  //   //     console.log(taskState.tasks[taskId]);
  //   //   })
  //   // });

  function onDropToCompleteSection(draggedItem) {
    updateStatus(draggedItem.id, true);
  }

  function onTitleClick(taskId) {
    props.history.push(props.match.url + "/" + taskId);
  }

  function onTitleBlur(taskId) {
    if(curTask(taskId).contentIsUnsaved) {
      postWithAuthToken(constants.ENDPOINTS.UPDATE_TASK, {taskId, content: curTask(taskId).content})
        .then(res => {
          console.log(res);
          updateTask({taskId, contentIsUnsaved: false, temp: true});
        })
        .catch(e => console.log(e));
    }
  }

  const sortedArrOfCompletedTasks = sortTasksByDate(
    getExpandedTreeArr(constants.DRAG_FROM.MAIN, {
      myTaskScope: getDataViaParams(params, getAlLTasksUnderId).data.taskIds,
      filters: {
        ...getDataViaParams(params, getAlLTasksUnderId).filters,
        projectId:
          typeByParams(params).type !== "all" ? typeByParams(params).id : "",
        status: { completed: true },
      },
      noChildTasks: true,
    }).treeArr
  );

  // return (
  //   <p>Cool</p>
  // )
  return (
    <>
      <div
        className="dnd_list-container"
        style={{
          height: treeOfIncompleteTasks.treeArr.length * constants.ITEM_HEIGHT,
          transition: "height 0.3s cubic-bezier(0, 0.86, 0.61, 1.15) 0s",
        }}
      >
        {treeOfIncompleteTasks.treeArr.map((taskId, index) => {
          return (
            <ListItem
              config={{
                itemType: constants.ITEM_TYPES.TASK,
                noTreeStyle: params.scopeId === "trash",
                dragFrom: constants.DRAG_FROM.MAIN,
              }}
              key={taskId}
              index={index}
              baseArr={treeOfIncompleteTasks.baseItemsArr}
              filters={getDataViaParams(params, getAlLTasksUnderId).filters}
              active={fetchActiveTask() === taskId}
              item={taskState.tasks[taskId]}
              startsDragging={setDragState}
              onTitleClick={onTitleClick}
              onTitleBlur={onTitleBlur}
              focusId={focusId}
              setFocusId={setFocusId}
            />
          )
        })}
      </div>
      <div
        className="dnd_list-container completed empty"
        style={{
          marginTop: treeOfIncompleteTasks.length > 0 ? "40px" : 0,
          height: getCompletedTasks().length * constants.ITEM_HEIGHT,
          transition: "all .2s ease-in-out",
        }}
      >
        {
          <>
            {sortedArrOfCompletedTasks.length === 0 ? (
              <div className="textCenter">
                <CompletedTaskSvg style={{width: '12rem', height: '12rem'}}/>
                <p className="mt-20 black-40">Drop Completed tasks here...</p>
              </div>
            ) : (
              sortedArrOfCompletedTasks.map((taskId, index) => (
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
                  onTitleBlur={onTitleBlur}
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
