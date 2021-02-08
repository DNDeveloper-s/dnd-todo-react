import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, UPDATE_DRAGGING_STATE } from "../features/taskSlice";
import {getGlobalState, UPDATE_TOGGLE_COLLAPSE} from "../features/globalSlice";
import { isDefined } from "../helpers/utils";
import useGlobalState from "./useGlobalState";
import useApi from "../api/useApi";
import {constants} from "../helpers/constants";

const useTreeDataUtils = (props) => {
  const taskState = useSelector(getTasks);
  const globalState = useSelector(getGlobalState);
  const dispatch = useDispatch();
  const { fetchGlobalState, fetchToggleCollapse } = useGlobalState();
  const {postWithAuthToken} = useApi();

  const getDragState = () => taskState.actions.dragState;

  const getPath = (taskId, baseTaskIdsArr = false) => {
    const path = [];

    // Recursive Function
    push(taskId, taskState);

    function push(taskId) {
      path.splice(0, 0, taskId);
      if(!baseTaskIdsArr || baseTaskIdsArr.includes(taskState.tasks[taskId].parentTask)) {
        if (taskState.tasks[taskId].parentTask) {
          push(taskState.tasks[taskId].parentTask);
        }
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
    const {
      forTaskId,
      myTaskScope,
      filters = {},
      noTreeStyle,
      noChildTasks,
    } = config;
    // console.log(config);
    // grab the filters

    const filterKeys = Object.keys(filters);
    let baseItemsArr = [];

    if (!myTaskScope) {
      if (!forTaskId) {
        taskState.taskOrder.forEach((taskId) => {
          baseItemsArr.push(taskId);
          push(taskId);
        });
      } else {
        taskState.tasks[forTaskId].childTasks.forEach((childTaskId) => {
          baseItemsArr.push(childTaskId);
          push(childTaskId);
        });
      }
    } else if(noChildTasks) {
      allTaskIds().forEach((taskId) => {
        baseItemsArr.push(taskId);
        push(taskId);
      });
    } else {
      myTaskScope.forEach((taskId) => {
        baseItemsArr.push(taskId);
        push(taskId);
      });
    }

    function push(taskId) {
      const task = curTask(taskId);

      // if (!myTaskScope) {
      let filtered = doIt(filters, filterKeys, task);
      if (filtered) treeArr.push(taskId);
      else return;
      // } else treeArr.push(taskId);
      if (noTreeStyle) return;

      if (!noChildTasks && fetchToggleCollapse(dragFrom, taskId)) {
        taskState.tasks[taskId].childTasks.map((childTaskId) => {
          push(childTaskId);
        });
      }
    }

    return {treeArr, baseItemsArr};
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
    const expandedTree = getExpandedTreeArr(dragFrom, {
      forTaskId: originTask,
      filters: {status: {completed: false}}
    }).treeArr;
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

    postWithAuthToken(constants.ENDPOINTS.POST_APP_GLOBAL_DATA, {
        global: globalState,
        toggleCollapse: {dragFrom,
          taskId,
          expanded},
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));

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
