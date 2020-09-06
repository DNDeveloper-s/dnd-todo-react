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

  const levelInTree = (taskId, originTask, includeOrigin) => {
    if(!originTask)
      return getPath(taskId).length - 1;
    // Grabbing full path
    // eg, ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
    const fullPath = getPath(taskId);
    // let say origin task is 'task-3'
    // origin index of 'task-3' is "2"
    // finding the index of the origin task
    const originIndex = fullPath.findIndex(c => c === originTask);
    // we will get the level from origin Task
    // by using fullPath.length - 1 - originIndex
    if(includeOrigin)
      return fullPath.length - 1 - originIndex;

    // Removing originTask by subtracting 1
    return fullPath.length - 1 - originIndex - 1;
  };

  const getExpandedTreeArr = (dragFrom, include = 'all', config = {}) => {
    // include = 'complete' or = 'incomplete'
    const treeArr = [];
    const {forTaskId, onlySubTasks} = config;
    // console.log(config);

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

    return treeArr;
  };


  const curTask = (taskId) => taskState.tasks[taskId];

  /**
   *
   * @param taskId
   * @param filter {String}
   * @returns {boolean}
   */
  const hasChildTasks = (taskId, filter: ['all', 'complete', 'incomplete']) => {
    if(!filter || filter === 'all') {
      return Boolean(curTask(taskId).childTasks.length);
    }
    if(filter === 'complete') {
      const hasCompletedTask = curTask(taskId).childTasks.find(c => curTask(c).status.completed);
      return Boolean(hasCompletedTask);
    }
    if(filter === 'incomplete') {
      const hasCompletedTask = curTask(taskId).childTasks.find(c => !curTask(c).status.completed);
      return Boolean(hasCompletedTask);
    }
  };

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
  };

  const allTaskIds = () => Object.keys(taskState.tasks);

  const getCompletedTasks = () => allTaskIds().filter(taskId => curTask(taskId).status.completed);

  const setDragState = (dragState) => {
    dispatch(UPDATE_DRAGGING_STATE(dragState));
  }

  return {
    getExpandedTreeArr,
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
