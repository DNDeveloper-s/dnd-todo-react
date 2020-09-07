import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  CREATE_TASK,
  CREATE_TASK_ITEM,
  DELETE_TASK,
  DELETE_TASK_ITEM,
  UPDATE_ACTIVE_TASK,
  UPDATE_ITEM,
  UPDATE_STATUS,
  UPDATE_TASK,
} from "../features/taskSlice";
import useTreeDataUtils from "./useTreeDataUtils";
import { filterArr } from "../helpers/utils";
import {useEffect, useState} from "react";

const useTasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(getTasks);
  const { getPath } = useTreeDataUtils();

  function updateTask(updatedObj) {
    dispatch(UPDATE_TASK({ ...updatedObj }));
  }

  const updateActiveTask = (taskId) => {
    dispatch(UPDATE_ACTIVE_TASK({ taskId }));
  };

  const fetchItem = (taskId, itemId) => {
    let itemIndex = curTask(taskId).items.findIndex((c) => c.id === itemId);
    return curTask(taskId).items[itemIndex];
  };

  const fetchTaskState = () => taskState;

  const fetchActiveTask = () => taskState.actions.activeTask;

  const curTask = (taskId) => taskState.tasks[taskId];

  const parentTask = (taskId) =>
    taskState.tasks[taskState.tasks[taskId].parentTask];

  const createTask = (taskObj) => {
    dispatch(CREATE_TASK(taskObj));
  };

  const deleteTask = taskId => {
    dispatch(DELETE_TASK({taskId}));
  }

  const updateItem = (taskId, itemObj) => {
    dispatch(
      UPDATE_ITEM({
        taskId,
        ...itemObj,
      })
    );
  };

  const updateStatus = (taskId, completed) => {
    if (completed) {
      const taskArr = [];

      completeTaskRecursively(taskId);

      function completeTaskRecursively(taskId) {
        taskArr.push({ taskId: taskId, completed: true });

        curTask(taskId).childTasks.map(completeTaskRecursively);
      }

      taskArr.forEach((payload) => {
        dispatch(UPDATE_STATUS(payload));
      });
    } else {
      dispatch(
        UPDATE_STATUS({
          taskId,
          completed: false,
          curPath: getPath(taskId),
        })
      );
    }
  };

  const taskProgress = (taskId) => {
    const completedItems = curTask(taskId).items.filter(
      (item) => item.status === 1
    ).length;
    const totalItems = curTask(taskId).items.length;
    if (totalItems === 0) return 0;
    return (completedItems / totalItems) * 100;
  };

  const createTaskItem = (itemObj: {
    taskId: String,
    id: String,
    content: String,
    status: Number,
    createAfterItemId: String,
  }) => {
    dispatch(CREATE_TASK_ITEM(itemObj));
  };

  const deleteTaskItem = (obj: {taskId: String, itemId: String}) => {

    const itemArr = filterArr(curTask(obj.taskId).items);
    const curItemIndex = itemArr.findIndex(c => c.id === obj.itemId);
    if(curItemIndex === 0) return null;
    const lastItemId = curTask(obj.taskId).items[curItemIndex - 1].id;

    dispatch(DELETE_TASK_ITEM(obj));

    return lastItemId;
  }

  return {
    createTask,
    createTaskItem,
    curTask,
    deleteTask,
    deleteTaskItem,
    fetchActiveTask,
    fetchItem,
    fetchTaskState,
    parentTask,
    taskProgress,
    updateActiveTask,
    updateItem,
    updateStatus,
    updateTask,
  };
};

export default useTasks;
