import {useDispatch, useSelector} from "react-redux";
import {getTasks, UPDATE_ACTIVE_TASK, UPDATE_TASK} from "../features/taskSlice";
import {useState} from "react";

const useTasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(getTasks);

  function updateTask(updatedObj) {
    dispatch(UPDATE_TASK({...updatedObj}))
  }

  const updateActiveTask = taskId => {
    dispatch(UPDATE_ACTIVE_TASK({taskId}))
  }

  const fetchTaskState = () => taskState;

  const fetchActiveTask = () => taskState.actions.activeTask;

  const curTask = taskId => taskState.tasks[taskId];

  return {curTask, fetchActiveTask, fetchTaskState, updateActiveTask, updateTask};
}

export default useTasks;
