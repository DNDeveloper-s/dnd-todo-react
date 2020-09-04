import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../components/ColorPicker/helpers/colors";
import { getRandomInt, removeItemByIdInArray } from "../helpers/utils";
import {constants} from "../helpers/constants";
import {isDefined} from "../helpers/utils";
import {update} from "smooth-scrollbar/geometry";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: {
      "task-1": {
        id: "task-1",
        schedule: {},
        priority: 0,
        projectId: null,
        labelIds: ["label-1", "label-2"],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my first task. Be Gentle",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: true,
        items: [
          { id: "1", content: "First Item", status: 0 },
          { id: "2", content: "Second Item", status: 0 },
          { id: "3", content: "Third Item", status: 0 },
        ],
        childTasks: ["task-2", "task-3"],
        parentTask: null,
        expandCount: 3,
      },
      "task-2": {
        id: "task-2",
        priority: 0,
        projectId: null,
        labelIds: ["label-3", "label-4"],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my second task. Never mind",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: ["task-4"],
        parentTask: "task-1",
        expandCount: 1,
      },
      "task-3": {
        id: "task-3",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my third task. I am improving",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-1",
        expandCount: 0,
      },
      "task-4": {
        id: "task-4",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my forth task. I feel confident now",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-2",
        expandCount: 0,
      },
      "task-5": {
        id: "task-5",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my fifth task. I can control this anyhow",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: ["task-6", "task-7", "task-8"],
        parentTask: null,
        expandCount: 0,
      },
      "task-6": {
        id: "task-6",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my sixth task, i guess. But does't matter now",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-5",
        expandCount: 0,
      },
      "task-7": {
        id: "task-7",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my forth tasks. I feel confident now",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-5",
        expandCount: 0,
      },
      "task-8": {
        id: "task-8",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my fifth tasks. I can control this anyhow",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-5",
        expandCount: 0,
      },
      "task-9": {
        id: "task-9",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my sixth tasks, i guess. But does't matter now",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: ["task-10", "task-11", "task-12"],
        parentTask: null,
        expandCount: 0,
      },
      "task-10": {
        id: "task-10",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my first tasks. Be Gentle",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-9",
        expandCount: 0,
      },
      "task-11": {
        id: "task-11",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my second tasks. Never mind",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-9",
        expandCount: 0,
      },
      "task-12": {
        id: "task-12",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my third tasks. I am improving",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: "task-9",
        expandCount: 0,
      },
      "task-13": {
        id: "task-13",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my first tasks. Be Gentle",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: null,
        expandCount: 0,
      },
      "task-14": {
        id: "task-14",
        priority: 0,
        projectId: "project-2",
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my second tasks. Never mind",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: null,
        expandCount: 0,
      },
      "task-15": {
        id: "task-15",
        priority: 0,
        projectId: null,
        labelIds: [],
        elClasses: [],
        status: { completed: false, prevPath: null },
        content: "This is my third tasks. I am improving",
        repeatFirstDate: JSON.stringify(new Date(2020, 8, 25)),
        inItemMode: false,
        items: [],
        childTasks: [],
        parentTask: null,
        expandCount: 0,
      },
    },
    taskOrder: ["task-1", "task-5", "task-9", "task-13", "task-14", "task-15"],
    actions: {
      dragState: {
        isDragging: false,
        dragItem: null
      },
      activeTask: null
    }
  },
  reducers: {
    UPDATE_WHOLE: (state, action) => {
      state.taskData = action.payload;
    },
    CREATE_TASK: (state, action) => {
      const taskItem = action.payload;
      state.taskData.tasks[taskItem.id] = {
        id: taskItem.id,
        status: {
          completed: false,
          prevColumnId: null,
        },
        labelIds: taskItem.labelIds || [],
        projectId: taskItem.projectId || null,
        elClasses: taskItem.elClasses,
        columnId: taskItem.columnId,
        priority: taskItem.priority,
        content: taskItem.content,
        createdTime: taskItem.createdTime,
        repeatFirstDate: taskItem.repeatFirstDate,
      };
      state.taskData.columns[taskItem.columnId].taskIds.splice(
        0,
        0,
        taskItem.id
      );
    },
    DELETE_TASK_BY_ID: (state, action) => {
      const { columnId, taskId } = action.payload;
      state.taskData.tasks[taskId] = undefined;
      // Removing Item from the array by an id
      state.taskData.columns[columnId].taskIds = removeItemByIdInArray(
        state.taskData.columns[columnId].taskIds,
        taskId
      );
    },
    UPDATE_TASK: (state, action) => {
      const { taskId, items, inItemMode, labelIds, title } = action.payload;
      const curTask = state.tasks[taskId];
      curTask.content = title || curTask.content;
      curTask.inItemMode = inItemMode !== undefined && inItemMode !== null ? inItemMode : curTask.inItemMode;
      curTask.items = items || curTask.items;
      curTask.labelIds = labelIds || curTask.labelIds;
    },
    TOGGLE_EXPAND: (state, action) => {
      const { taskId, expandCount } = action.payload;
      state.tasks[taskId].expandCount = expandCount;
    },
    DROP_TASK: (state, action) => {
      const { source, destination: dest, dropAsType, dragFrom } = action.payload;
      const draggedId = source.id;
      const droppedId = dest.id;

      // Handling the case if the task was moved from completed task
      if(dragFrom === constants.DRAG_FROM.COMPLETED) {
        state.tasks[draggedId].status.completed = false;
        state.tasks[draggedId].status.prevPath = null;
      }

      function addToInnerLevel() {
        // Adding to Inner Level
        // 1. Adding to Child Tasks
        const droppedToParentId = state.tasks[dest.path[dest.path.length - 2]].id;
        const droppedIndex = state.tasks[droppedToParentId].childTasks.findIndex((c) => c.toString() === dest.id);
        state.tasks[droppedToParentId].childTasks.splice(
          droppedIndex + 1,
          0,
          draggedId
        );
        // 2. Updating the expand Count
        const poppedDestPath = [...dest.path];
        poppedDestPath.pop();
        console.log(poppedDestPath);
        poppedDestPath.forEach((destId) => {
          state.tasks[destId].expandCount +=
            state.tasks[draggedId].expandCount + 1;
        });
        // 3. Updating the parent task
        state.tasks[draggedId].parentTask = droppedToParentId;
      }

      function removeFromInnerLevel() {
        // Removing from Inner Level
        const draggedFromParentId =
          state.tasks[source.path[source.path.length - 2]].id;
        const pastSiblingTasks = state.tasks[draggedFromParentId].childTasks;
        const draggedIndex = pastSiblingTasks.findIndex(
          (c) => c.toString() === draggedId
        );
        pastSiblingTasks.splice(draggedIndex, 1);
        // 2. Updating the expand Count
        const poppedSrcPath = [...source.path];
        poppedSrcPath.pop();
        console.log(poppedSrcPath);
        poppedSrcPath.forEach((srcId) => {
          state.tasks[srcId].expandCount -=
            state.tasks[draggedId].expandCount + 1;
        });
      }

      // Case 1 - Moving inside Top Level
      if (source.path.length === 1 && dest.path.length === 1) {
        // Removing Part
        // Removing from taskOrder
        if(dragFrom !== constants.DRAG_FROM.COMPLETED) {
          const draggedIndex = state.taskOrder.findIndex(
            (c) => c.toString() === draggedId
          );
          state.taskOrder.splice(draggedIndex, 1);
        }

        // Adding Part
        if (dropAsType === constants.DROP_AS_SIBLING) {
          const droppedIndex = state.taskOrder.findIndex(
            (c) => c.toString() === droppedId
          );
          state.taskOrder.splice(droppedIndex + 1, 0, draggedId);
        }
      }

      // Case 2 - Moving from Top Level to Inner Level
      else if (source.path.length === 1 && dest.path.length >= 2) {
        // Removing Part
        // Removing from taskOrder
        if(dragFrom !== constants.DRAG_FROM.COMPLETED) {
          const draggedIndex = state.taskOrder.findIndex(
            (c) => c.toString() === draggedId
          );
          state.taskOrder.splice(draggedIndex, 1);
        }

        // Adding Part
        if (dropAsType === constants.DROP_AS_SIBLING) {
          addToInnerLevel();
        }
      }

      // Case 3 - Moving from Inner Lever to Top Level
      else if (source.path.length >= 2 && dest.path.length === 1) {
        // Removing Part
        if(dragFrom !== constants.DRAG_FROM.COMPLETED) {
          removeFromInnerLevel();
        }

        // Adding Part
        if (dropAsType === constants.DROP_AS_SIBLING) {
          // Adding to Top Level
          // 1. Adding to Task Order
          const droppedIndex = state.taskOrder.findIndex(
            (c) => c.toString() === droppedId
          );
          state.taskOrder.splice(droppedIndex + 1, 0, draggedId);
          // 2. Updating the parent task
          state.tasks[draggedId].parentTask = null;
        }
      }

      // Case 4 - Moving inside Inner Level
      else if (source.path.length >= 2 && dest.path.length >= 2) {
        // Removing Part
        if(dragFrom !== constants.DRAG_FROM.COMPLETED) {
          removeFromInnerLevel();
        }

        // Adding Part
        if (dropAsType === constants.DROP_AS_SIBLING) {
          // Adding to Inner Level
          addToInnerLevel();
        }
      }

      // Handling case for dropping as child
      if (dropAsType === constants.DROP_AS_CHILD) {
        // Adding to childTasks array
        const droppedToParentId =
          state.tasks[dest.path[dest.path.length - 1]].id;
        state.tasks[droppedToParentId].childTasks.splice(0, 0, draggedId);
        // 2. Updating the expand Count
        const poppedDestPath = [...dest.path];
        console.log(poppedDestPath);
        poppedDestPath.forEach((destId) => {
          state.tasks[destId].expandCount +=
            state.tasks[draggedId].expandCount + 1;
        });
        // 3. Updating the parent task
        state.tasks[draggedId].parentTask = droppedToParentId;
      }
    },
    UPDATE_STATUS: (state, action) => {
      const {taskId, completed, prevPath} = action.payload;

      if(completed) {
        // Case 1. Inner Level
        // Removing from Inner Level
        const parentTaskId = state.tasks[taskId].parentTask;
        if(parentTaskId) {
          const pastSiblingTasks = state.tasks[parentTaskId].childTasks;
          const draggedIndex = pastSiblingTasks.findIndex(
            (c) => c.toString() === taskId
          );
          pastSiblingTasks.splice(draggedIndex, 1);

          // 2. Updating the expand Count
          const poppedSrcPath = [...prevPath];
          poppedSrcPath.pop();
          poppedSrcPath.forEach((srcId) => {
            // Here, We are preventing to update the expand count of the
            // task those are already completed
            // So, the tasks which is completed are being reset to "0" expand count
            if(state.tasks[srcId].status.completed) {
              state.tasks[srcId].expandCount = 0;
            } else {
              state.tasks[srcId].expandCount -=
                state.tasks[taskId].expandCount + 1;
            }
          });

          // Resetting the parent task of the completed task
          state.tasks[taskId].parentTask = null;
        }

        // Case 2. Top Level
        // Removing from Top Level
        if(!parentTaskId) {
          const draggedIndex = state.taskOrder.findIndex(
            (c) => c.toString() === taskId
          );
          state.taskOrder.splice(draggedIndex, 1);
        }

        state.tasks[taskId].status.completed = completed;
        state.tasks[taskId].status.prevPath = prevPath;
      }

      // Handling the case if the task is moving from completed to incomplete
      if(isDefined(completed) && !completed) {
        const {taskId, completed, prevPath} = action.payload;

        console.log(action.payload);

        // Case 1. the incomplete task to be moved to top level [Task Order]
        if(prevPath.length === 1) {
          state.taskOrder.splice(0, 0, taskId);
          state.tasks[taskId].status.completed = false;
          state.tasks[taskId].status.prevPath = null;
        }

        // Case 2. the incomplete task to be moved to inner level [ChildTasks]
        if(prevPath.length >= 2) {
          // eg, prevPath = ['task-1', 'task-2', 'task-3']
          // here 'task-3' is the currentTask
          // so we dont wanna go through this
          // so removing from the arr
          const poppedPrevPath = [...prevPath];
          poppedPrevPath.pop();

          // Now, looping through the array and we will stop where we will find the first completed task
          // And, we will add it to that one [first completed] on first place in its child tasks
          const resultArr = [];   // Result array will hold the items those are not completed and they will the child array of prevPath
          for(let i = 0; i < poppedPrevPath.length; i++) {
            const curTask = state.tasks[poppedPrevPath[i]];
            if(isDefined(curTask.status.completed) && !curTask.status.completed) resultArr.push(poppedPrevPath[i]);
            if(curTask.status.completed) break;
          }

          // Checking if the resultArr is empty
          // if its empty that does mean there is nothing to be add into a parent task
          // So will add it to the top to the top level [Task Order]
          if(resultArr.length === 0) {
            state.taskOrder.splice(0, 0, taskId);
          }

          // If result array has having some items in it
          // Then we will put our item into the last item's childTasks
          if(resultArr.length >= 1) {
            const targetTask = resultArr[resultArr.length - 1];

            // Adding to the childTasks Array on to the top
            state.tasks[targetTask].childTasks.splice(0, 0, taskId);
            state.tasks[taskId].parentTask = targetTask;

            // Updating the expand count of targetTask
            // And the parentTask of the upper level of this task
            // recursively
            updateExpandCount(targetTask);
            function updateExpandCount(taskId) {
              state.tasks[taskId].expandCount += 1;
              const parentTaskId = state.tasks[taskId].parentTask;
              if(isDefined(parentTaskId)) updateExpandCount(parentTaskId);
            }
          }
          state.tasks[taskId].status.completed = false;
          state.tasks[taskId].status.prevPath = null;

        }
      }
    },
    UPDATE_DRAGGING_STATE: (state, action) => {
      const {dragItem, isDragging} = action.payload;
      state.actions.dragState.isDragging = isDragging;
      state.actions.dragState.dragItem = dragItem;
    },
    UPDATE_ACTIVE_TASK: (state, action) => {
      const {taskId} = action.payload;
      state.actions.activeTask = taskId;
    }
  },
});

export const {
  CREATE_TASK,
  DELETE_TASK_BY_ID,
  UPDATE_TASK,
  UPDATE_WHOLE,
  DROP_TASK,
  UPDATE_DRAGGING_STATE,
  TOGGLE_EXPAND,
  UPDATE_ACTIVE_TASK,
  UPDATE_STATUS
} = taskSlice.actions;

export const getAllTasks = (state) => state.task;
export const getColumnOrder = (state) => state.task.taskOrder;
export const getTasks = (store) => store.task;

const taskReducer = taskSlice.reducer;

export default taskReducer;
