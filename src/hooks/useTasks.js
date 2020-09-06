import {useDispatch, useSelector} from "react-redux";
import {CREATE_TASK, getTasks, UPDATE_ACTIVE_TASK, UPDATE_ITEM, UPDATE_STATUS, UPDATE_TASK} from "../features/taskSlice";
import useTreeDataUtils from "./useTreeDataUtils";

const useTasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(getTasks);
  const {getPath} = useTreeDataUtils();

  function updateTask(updatedObj) {
    dispatch(UPDATE_TASK({...updatedObj}))
  }

  const updateActiveTask = taskId => {
    dispatch(UPDATE_ACTIVE_TASK({taskId}))
  }

  const fetchItem = (taskId, itemId) => {
    let itemIndex = curTask(taskId).items.findIndex(c => c.id === itemId);
    return curTask(taskId).items[itemIndex];
  }

  const fetchTaskState = () => taskState;

  const fetchActiveTask = () => taskState.actions.activeTask;

  const curTask = taskId => taskState.tasks[taskId];

  const parentTask = taskId => taskState.tasks[taskState.tasks[taskId].parentTask];

  const createTask = (taskObj: {
    id: String,
    content: String,
    labelIds: Array,
    projectId: String,
    priority: Number,
  }) => {
    dispatch(CREATE_TASK(taskObj));;
  }

  const updateItem = (taskId, itemObj) => {
    dispatch(UPDATE_ITEM({
      taskId,
      ...itemObj
    }));
  }

  const updateStatus = (taskId, completed) => {
    if(completed) {
      const taskArr = [];

      completeTaskRecursively(taskId);

      function completeTaskRecursively(taskId) {
        taskArr.push({taskId: taskId, completed: true});

        curTask(taskId).childTasks.map(completeTaskRecursively);
      }

      taskArr.forEach(payload => {
        dispatch(UPDATE_STATUS(payload));
      })
    } else {
      dispatch(UPDATE_STATUS({
        taskId,
        completed: false,
        curPath: getPath(taskId)
      }));
    }
  }

  return {createTask, curTask, fetchItem, parentTask, fetchActiveTask, fetchTaskState, updateActiveTask, updateItem, updateStatus, updateTask};
}

export default useTasks;
