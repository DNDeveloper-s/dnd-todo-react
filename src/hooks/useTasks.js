import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  CREATE_TASK,
  CREATE_TASK_ITEM,
  DELETE_TASK,
  DELETE_TASK_ITEM,
  TRIGGER_REMINDER,
  UPDATE_ACTIVE_TASK,
  UPDATE_ITEM,
  UPDATE_STATUS,
  UPDATE_TASK,
  UPDATE_TRIGGERS,
} from "../features/taskSlice";
import useTreeDataUtils from "./useTreeDataUtils";
import { filterArr, isDefined, isTriggerDuration } from "../helpers/utils";

const useTasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(getTasks);
  const { getPath } = useTreeDataUtils();

  const fetchTriggers = () => taskState.actions.triggers;

  function updateTask(updatedObj) {
    dispatch(UPDATE_TASK({ ...updatedObj }));
  }

  const updateActiveTask = (taskId) => {
    dispatch(UPDATE_ACTIVE_TASK({ taskId }));
  };

  const updateTriggers = (taskId) => {
    dispatch(UPDATE_TRIGGERS({ taskId }));
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

  const deleteTask = (taskId) => {
    const taskArr = getTaskArrObjRecursive(taskId, { deleted: 1 });
    taskArr.forEach((taskObj) => {
      updateTask(taskObj);
    });
  };

  const updateItem = (taskId, itemObj) => {
    dispatch(
      UPDATE_ITEM({
        taskId,
        ...itemObj,
      })
    );
  };

  const getTaskArrObjRecursive = (taskId, obj) => {
    const taskArr = [];

    completeTaskRecursively(taskId);

    function completeTaskRecursively(taskId) {
      taskArr.push({ taskId, ...obj });

      curTask(taskId).childTasks.map(completeTaskRecursively);
    }

    return taskArr;
  };

  const updateStatus = (taskId, completed) => {
    if (completed) {
      const taskArr = getTaskArrObjRecursive(taskId, { completed: true });

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

  const deleteTaskItem = (obj: { taskId: String, itemId: String }) => {
    const itemArr = filterArr(curTask(obj.taskId).items);
    const curItemIndex = itemArr.findIndex((c) => c.id === obj.itemId);
    if (curItemIndex === 0) return null;
    const lastItemId = curTask(obj.taskId).items[curItemIndex - 1].id;

    dispatch(DELETE_TASK_ITEM(obj));

    return lastItemId;
  };

  const remindNow = (toRemindList) => {
    console.log("toRemindList", toRemindList);
    toRemindList.forEach((reminderObj) => {
      // Checking if the reminder is already in the queue
      const isInQueue = fetchTriggers().some((c) => c === reminderObj.taskId);
      // if not in queue
      if (!isInQueue) {
        dispatch(
          TRIGGER_REMINDER({
            reminderId: reminderObj.id,
            taskId: reminderObj.taskId,
          })
        );
      }
    });
  };

  const allTaskIds = () => Object.keys(taskState.tasks);

  const triggerReminder = () => {
    const taskIdsWithReminder = allTaskIds().filter(
      (c) => isDefined(curTask(c).reminders) && curTask(c).reminders.length > 0
    );
    const toRemindList = [];
    taskIdsWithReminder.forEach((taskId) => {
      let shouldBeTriggered = { isTrigger: false, id: null };
      const task = curTask(taskId);
      for (let i = 0; i < task.reminders.length; i++) {
        const reminder = task.reminders[i];
        shouldBeTriggered = {
          isTrigger: isTriggerDuration(task.startDate, reminder.trigger),
          id: reminder.id,
          taskId: task.id,
        };
        if (shouldBeTriggered.isTrigger) break;
      }
      if (shouldBeTriggered.isTrigger) toRemindList.push(shouldBeTriggered);
    });
    remindNow(toRemindList);
  };

  return {
    createTask,
    createTaskItem,
    curTask,
    deleteTask,
    deleteTaskItem,
    fetchActiveTask,
    fetchItem,
    fetchTaskState,
    fetchTriggers,
    parentTask,
    taskProgress,
    triggerReminder,
    updateActiveTask,
    updateItem,
    updateStatus,
    updateTask,
    updateTriggers,
  };
};

export default useTasks;
