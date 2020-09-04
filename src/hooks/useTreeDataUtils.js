import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, UPDATE_DRAGGING_STATE, UPDATE_STATUS } from "../features/taskSlice";
import {UPDATE_TOGGLE_COLLAPSE} from "../features/globalSlice";
import { isDefined } from "../helpers/utils";
import {constants} from "../helpers/constants";
import useGlobalState from "./useGlobalState";

const useTreeDataUtils = (props) => {
  const taskState = useSelector(getTasks);
  const dispatch = useDispatch();
  const {fetchToggleCollapse} = useGlobalState();

  const getDragState = () => taskState.actions.dragState;

  const getPath = (taskId) => {
    const path = [];

    // Recursive Function
    push(taskId, taskState);

    function push(taskId) {
      path.splice(0, 0, taskId);
      if (taskState.tasks[taskId].parentTask) {
        push(taskState.tasks[taskId].parentTask);
      }
    }
    return path;
  };

  const levelInTree = (taskId) => {
    return getPath(taskId).length - 1;
  };

  const getExpandedTreeArr = (dragFrom, include = 'all', config = {}) => {
    // include = 'complete' or = 'incomplete'
    const treeArr = [];
    const {forTaskId, onlySubTasks} = config;
    console.log(config);

    if(!forTaskId) {
      taskState.taskOrder.map((taskId) => {
        push(taskId);
      });
    } else {
      taskState.tasks[forTaskId].childTasks.map(childTaskId => push(childTaskId));
    }

    function push(taskId, onlySubTasksInner) {
      if(include !== 'all') {
        if(include === 'complete' && curTask(taskId).status.completed) treeArr.push(taskId);
        else if(include === 'incomplete' && !curTask(taskId).status.completed) {
          treeArr.push(taskId);
        }
        else return;
      } else if(include === 'all') {
        treeArr.push(taskId);
      }
      // if (taskState.tasks[taskId].expandCount > 0) {
      //   taskState.tasks[taskId].childTasks.map((childTaskId) => {
      //     push(childTaskId);
      //   });
      // }
      if(fetchToggleCollapse(dragFrom, taskId)) {
        taskState.tasks[taskId].childTasks.map((childTaskId) => {
          push(childTaskId);
        });
      }
    }

    console.log(treeArr);

    return treeArr;
  };

  const curTask = (taskId) => taskState.tasks[taskId];

  const hasChildTasks = (taskId) => Boolean(curTask(taskId).childTasks.length);

  const onExpandToggle = (dragFrom, taskId, expandIt) => () => {
    // Handling the case if the task handle has no child tasks
    if (curTask(taskId).childTasks.length === 0) return;

    // let expanded = !taskState.tasks[taskId].expandCount > 0;
    let expanded = !fetchToggleCollapse(dragFrom, taskId);
    if (isDefined(expandIt)) expanded = expandIt;

    dispatch(UPDATE_TOGGLE_COLLAPSE({
      dragFrom,
      taskId,
      expanded
    }))
    // const path = getPath(taskId);
    // const reversedPath = path.reverse();
    // const childCountOfToggledTask = taskState.tasks[taskId].childTasks.length;
    //
    // const childExpandedCount = taskState.tasks[taskId].childTasks
    //   .map((childTaskId) => taskState.tasks[childTaskId].expandCount)
    //   .reduce((total, sum) => total + sum);
    //
    // reversedPath.map((pathTaskId) => {
    //   let expandCount = taskState.tasks[pathTaskId].expandCount;
    //   expanded
    //     ? (expandCount += childExpandedCount + childCountOfToggledTask)
    //     : (expandCount -= childExpandedCount + childCountOfToggledTask);
    //
    //   dispatch(
    //     TOGGLE_EXPAND({
    //       taskId: pathTaskId,
    //       expandCount: expandCount,
    //     })
    //   );
    // });
  };

  const allTaskIds = () => Object.keys(taskState.tasks);

  const getCompletedTasks = () => allTaskIds().filter(taskId => curTask(taskId).status.completed);

  const completeTask = taskId => {
    const taskArr = [];

    completeTaskRecursively(taskId);

    function completeTaskRecursively(taskId) {
      taskArr.push({taskId: taskId, completed: true, prevPath: getPath(taskId)});

      curTask(taskId).childTasks.map(completeTaskRecursively);
    }

    taskArr.forEach(payload => {
      dispatch(UPDATE_STATUS(payload));
    })
  }

  const inCompleteTask = taskId => {
    dispatch(UPDATE_STATUS({
      taskId,
      completed: false,
      prevPath: curTask(taskId).status.prevPath
    }));
  }

  const setDragState = (dragState) => {
    dispatch(UPDATE_DRAGGING_STATE(dragState));
  }

  return {
    completeTask,
    getExpandedTreeArr,
    getCompletedTasks,
    getPath,
    hasChildTasks,
    inCompleteTask,
    getDragState,
    levelInTree,
    onExpandToggle,
    setDragState,
    taskState,
  };
};

export default useTreeDataUtils;
