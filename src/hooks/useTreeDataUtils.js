import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, UPDATE_DRAGGING_STATE } from "../features/taskSlice";
import { UPDATE_TOGGLE_COLLAPSE } from "../features/globalSlice";
import { isDefined } from "../helpers/utils";
import useGlobalState from "./useGlobalState";

const useTreeDataUtils = (props) => {
  const taskState = useSelector(getTasks);
  const dispatch = useDispatch();
  const { fetchToggleCollapse } = useGlobalState();

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

  const levelInTree = (taskId, originTask, includeOrigin) => {
    if (!originTask) return getPath(taskId).length - 1;
    // Grabbing full path
    // eg, ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
    const fullPath = getPath(taskId);
    // let say origin task is 'task-3'
    // origin index of 'task-3' is "2"
    // finding the index of the origin task
    const originIndex = fullPath.findIndex((c) => c === originTask);
    // we will get the level from origin Task
    // by using fullPath.length - 1 - originIndex
    if (includeOrigin) return fullPath.length - 1 - originIndex;

    // Removing originTask by subtracting 1
    return fullPath.length - 1 - originIndex - 1;
  };

  const getExpandedTreeArr = (dragFrom, config = {}) => {
    // include = 'complete' or = 'incomplete'
    const treeArr = [];
    const { forTaskId, filters = {} } = config;
    // console.log(config);
    // grab the filters

    const filterKeys = Object.keys(filters);

    if (!forTaskId) {
      taskState.taskOrder.map((taskId) => {
        push(taskId);
      });
    } else {
      taskState.tasks[forTaskId].childTasks.map((childTaskId) =>
        push(childTaskId)
      );
    }

    function push(taskId) {
      const task = curTask(taskId);

      let filtered = doIt(filters, filterKeys, task);
      if (filtered) treeArr.push(taskId);
      else return;

      if (fetchToggleCollapse(dragFrom, taskId)) {
        taskState.tasks[taskId].childTasks.map((childTaskId) => {
          push(childTaskId);
        });
      }
    }

    return treeArr;
  };

  function doIt(obj, keys, task) {
    let filtered = true;
    const filterByKey = (obj, keys, task) => {
      const providedKeys = Object.keys(obj);
      keys.forEach((key) => {
        if (!providedKeys.includes(key)) {
          filtered = false;
          return;
        }
        if (typeof obj[key] === "object") {
          return filterByKey(obj[key], Object.keys(obj[key]), task[key]);
        } else if (JSON.stringify(obj[key]) !== JSON.stringify(task[key])) {
          // console.log(obj[key], task[key]);
          filtered = false;
        }
      });
    };
    filterByKey(obj, keys, task);
    return filtered;
  }

  // let testPass = filterKeys.every(
  //   (filterKey) => task[filterKey] === filters[filterKey]
  // );
  // if (testPass) treeArr.push(taskId);

  const getPrevItemInExpandedTree = (taskId, dragFrom, originTask) => {
    const expandedTree = getExpandedTreeArr(dragFrom, "incomplete", {
      forTaskId: originTask,
    });
    const targetIndex = expandedTree.findIndex((c) => c === taskId);
    return expandedTree[targetIndex - 1];
  };

  const curTask = (taskId) => taskState.tasks[taskId];

  /**
   *
   * @param taskId
   * @param filters {Object}
   * @returns {boolean}
   */
  const hasChildTasks = (taskId, filters) => {
    const children = [];
    curTask(taskId).childTasks.forEach((childTaskId) => {
      if (!filters) return children.push(childTaskId);
      if (doIt(filters, Object.keys(filters), curTask(childTaskId))) {
        children.push(childTaskId);
      }
    });
    return Boolean(children.length);
    // if (!filter || filter === "all") {
    //   return Boolean(curTask(taskId).childTasks.length);
    // }
    // if (filter === "complete") {
    //   const hasCompletedTask = curTask(taskId).childTasks.find(
    //     (c) => curTask(c).status.completed
    //   );
    //   return Boolean(hasCompletedTask);
    // }
    // if (filter === "incomplete") {
    //   const hasCompletedTask = curTask(taskId).childTasks.find(
    //     (c) => !curTask(c).status.completed
    //   );
    //   return Boolean(hasCompletedTask);
    // }
  };

  const onExpandToggle = (dragFrom, taskId, expandIt) => (force) => {
    // Handling the case if the task handle has no child tasks
    if (curTask(taskId).childTasks.length === 0 && !force) return;

    // let expanded = !taskState.tasks[taskId].expandCount > 0;
    let expanded = !fetchToggleCollapse(dragFrom, taskId);
    if (isDefined(expandIt)) expanded = expandIt;

    dispatch(
      UPDATE_TOGGLE_COLLAPSE({
        dragFrom,
        taskId,
        expanded,
      })
    );
  };

  const allTaskIds = () => Object.keys(taskState.tasks);

  const getCompletedTasks = () =>
    allTaskIds().filter((taskId) => curTask(taskId).status.completed);

  const setDragState = (dragState) => {
    dispatch(UPDATE_DRAGGING_STATE(dragState));
  };

  return {
    getExpandedTreeArr,
    getPrevItemInExpandedTree,
    getCompletedTasks,
    getPath,
    hasChildTasks,
    getDragState,
    levelInTree,
    onExpandToggle,
    setDragState,
    taskState,
  };
};

export default useTreeDataUtils;
