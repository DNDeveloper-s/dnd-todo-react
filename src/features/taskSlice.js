import { createSlice } from "@reduxjs/toolkit";
import { removeItemByIdInArray } from "../helpers/utils";
import { constants } from "../helpers/constants";
import { isDefined } from "../helpers/utils";

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
        dragItem: null,
      },
      activeTask: null,
    },
  },
  reducers: {
    UPDATE_WHOLE: (state, action) => {
      state.taskData = action.payload;
    },
    CREATE_TASK: (state, action) => {
      const {
        id,
        content,
        priority,
        labelIds,
        projectId,
        createType,
        startDate,
        reminders,
        isFullDay,
      } = action.payload;
      const newTaskObj = {
        id,
        status: {
          completed: false,
          prevColumnId: null,
        },
        labelIds: labelIds || [],
        projectId: projectId || null,
        priority,
        content,
        inItemMode: false,
        items: [],
        childTasks: [],
        startDate,
        reminders,
        isFullDay,
      };

      // Case 1. If task has been added without any reference
      // so it will be added just to the top of the array in the top level
      if (!createType) {
        state.taskOrder.splice(0, 0, id);
      }

      // Case 2. If added as some extra info
      // like creating task with a reference
      // of its sibling or child
      if (createType) {
        const { path, as } = createType;
        // Here "path" is the tree path of the reference task
        // eg: ["task-1", "task-2"] is "path"
        // and "as" is the relation with the reference task
        // child or sibling
        // refTask is just the reference task
        // and grabbing the refTaskId from the path
        // its the last item in the path array
        const refTask = state.tasks[path[path.length - 1]];

        // Case 1. If added as sibling
        if (as === constants.AS_SIBLING) {
          // In case of sibling
          // There are two cases also

          // Case 1. When the reference task lies on the top level
          // Hence refTask won't have any parent task
          if (!refTask.parentTask) {
            // Get the index of the reference task on the top level [taskOrder]
            const refIndex = state.taskOrder.findIndex((c) => c === refTask.id);

            // and then add the newTask after the index of refTask to the top level [taskOrder]
            // Adding next to the refIndex, so adding "1"
            state.taskOrder.splice(refIndex + 1, 0, newTaskObj.id);
          }

          // Case 2. When the reference task lies somewhere in the inner level
          if (refTask.parentTask) {
            // Get the parent task of the reference task
            const parentOfRefTask = state.tasks[refTask.parentTask];

            // And get the index of the reference task
            const refTaskIndex = parentOfRefTask.childTasks.findIndex(
              (c) => c === refTask.id
            );

            // and then add the newTask to the parentTasks's childTasks array
            // after the index of reference task
            // Adding next to the refIndex, so adding "1"
            parentOfRefTask.childTasks.splice(
              refTaskIndex + 1,
              0,
              newTaskObj.id
            );

            // Update the parent task
            newTaskObj.parentTask = parentOfRefTask.id;
          }
        }

        // Case 2. If added as child
        if (as === constants.AS_CHILD) {
          // Here, its so simple as we don't need to get any index to add
          // So, just add the newTask to top of the refTask's childTasks array
          refTask.childTasks.splice(0, 0, newTaskObj.id);

          // And Yes,
          // Update the parent task
          newTaskObj.parentTask = refTask.id;
        }
      }
      state.tasks[id] = newTaskObj;
    },
    DELETE_TASK: (state, action) => {
      const { taskId } = action.payload;
      const curTask = state.tasks[taskId];
      // Here will be two cases

      // Case 1. If the targetTask lies on the top level
      // We will be checking it via its parentTask
      if (!curTask.parentTask) {
        // So we are gonna be deleting it from the top level [taskOrder]
        // First get the index of the targetTask in the taskOrder array
        const targetTaskIndex = state.taskOrder.findIndex((c) => c === taskId);

        // and then splice it from the taskOrder array
        state.taskOrder.splice(targetTaskIndex, 1);
      }

      // Case 2. If the targetTask lies somewhere in the inner level
      if (curTask.parentTask) {
        // Get the parentTask
        const parentOfTargetTask = state.tasks[curTask.parentTask];

        // and get the index on the targetTask in the parentTask's childTasks array
        // so that we can splice it through the index
        const targetTaskIndex = parentOfTargetTask.childTasks.findIndex(
          (c) => c === taskId
        );

        // we are gonna be deleting it for now
        // TODO: Removed task should go to trashTask
        // but later we are gonna be adding to trash first
        // and then we will remove it from there

        // For deleting it
        // we are just splicing it from the parentTask's childTasks array
        parentOfTargetTask.childTasks.splice(targetTaskIndex, 1);

        // and as we are not gonna delete it from the tasks object
        // so that we can access it later
        // for undo and redo process
        // We are just gonna update the parentTask of the targetTask
        curTask.parentTask = null;
      }
    },
    CREATE_TASK_ITEM: (state, action) => {
      const { taskId, id, content, status, createAfterItemId } = action.payload;
      const curTask = state.tasks[taskId];
      const itemObj = { id, content, status };
      if (!createAfterItemId) {
        curTask.items.push(itemObj);
      } else {
        const createAfterItemIdIndex = curTask.items.findIndex(
          (c) => c.id === createAfterItemId
        );
        curTask.items.splice(createAfterItemIdIndex + 1, 0, itemObj);
      }
    },
    DELETE_TASK_ITEM: (state, action) => {
      const { taskId, itemId } = action.payload;
      const curTask = state.tasks[taskId];
      const itemIndex = curTask.items.findIndex((c) => c.id === itemId);
      curTask.items.splice(itemIndex, 1);
    },
    UPDATE_TASK: (state, action) => {
      const { taskId, items, inItemMode, labelIds, content } = action.payload;
      const curTask = state.tasks[taskId];
      curTask.content = isDefined(content) ? content : curTask.content;
      curTask.inItemMode =
        inItemMode !== undefined && inItemMode !== null
          ? inItemMode
          : curTask.inItemMode;
      curTask.items = items || curTask.items;
      curTask.labelIds = labelIds || curTask.labelIds;
    },
    UPDATE_ITEM: (state, action) => {
      const { taskId, itemId, content, status } = action.payload;
      const itemIndex = state.tasks[taskId].items.findIndex(
        (i) => i.id === itemId
      );
      const curItem = state.tasks[taskId].items[itemIndex];
      curItem.content = isDefined(content) ? content : curItem.content;
      curItem.status = isDefined(status) ? status : curItem.status;
      curItem.completedAt = status === 1 ? new Date().toISOString() : null;
    },
    TOGGLE_EXPAND: (state, action) => {
      const { taskId, expandCount } = action.payload;
      state.tasks[taskId].expandCount = expandCount;
    },
    DROP_ITEM: (state, action) => {
      const { taskId, draggedId, droppedId } = action.payload;
      console.log(draggedId, droppedId);
      const curTask = state.tasks[taskId];
      const curTaskItem = curTask.items.find((c) => c.id === draggedId);
      // Removing the dragged id from its initial position
      // Finding the index of the draggedId in array
      const draggedIndex = curTask.items.findIndex((c) => c.id === draggedId);
      curTask.items.splice(draggedIndex, 1);
      // Now its time to add it to the new place in the array
      // Finding the index of the droppedId in arrau
      // to be placed after the item
      const droppedIndex = curTask.items.findIndex((c) => c.id === droppedId);
      curTask.items.splice(droppedIndex + 1, 0, curTaskItem);
    },
    DROP_TASK: (state, action) => {
      const {
        source,
        destination: dest,
        dropAsType,
        dragFrom,
      } = action.payload;
      const draggedId = source.id;
      const droppedId = dest.id;

      // Handling the case if the task was moved from completed task
      if (dragFrom === constants.DRAG_FROM.COMPLETED) {
        state.tasks[draggedId].status.completed = false;
        state.tasks[draggedId].status.prevPath = null;
      }

      function addToInnerLevel() {
        // Adding to Inner Level
        // 1. Adding to Child Tasks
        const droppedToParentId =
          state.tasks[dest.path[dest.path.length - 2]].id;
        const droppedIndex = state.tasks[
          droppedToParentId
        ].childTasks.findIndex((c) => c.toString() === dest.id);
        state.tasks[droppedToParentId].childTasks.splice(
          droppedIndex + 1,
          0,
          draggedId
        );
        // 2. Updating the expand Count
        // const poppedDestPath = [...dest.path];
        // poppedDestPath.pop();
        // console.log(poppedDestPath);
        // poppedDestPath.forEach((destId) => {
        //   state.tasks[destId].expandCount +=
        //     state.tasks[draggedId].expandCount + 1;
        // });
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
        // const poppedSrcPath = [...source.path];
        // poppedSrcPath.pop();
        // console.log(poppedSrcPath);
        // poppedSrcPath.forEach((srcId) => {
        //   state.tasks[srcId].expandCount -=
        //     state.tasks[draggedId].expandCount + 1;
        // });
      }

      // Case 1 - Moving inside Top Level
      if (source.path.length === 1 && dest.path.length === 1) {
        // Removing Part
        // Removing from taskOrder
        const draggedIndex = state.taskOrder.findIndex(
          (c) => c.toString() === draggedId
        );
        state.taskOrder.splice(draggedIndex, 1);

        // Adding Part
        if (dropAsType === constants.AS_SIBLING) {
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
        const draggedIndex = state.taskOrder.findIndex(
          (c) => c.toString() === draggedId
        );
        state.taskOrder.splice(draggedIndex, 1);

        // Adding Part
        if (dropAsType === constants.AS_SIBLING) {
          addToInnerLevel();
        }
      }

      // Case 3 - Moving from Inner Lever to Top Level
      else if (source.path.length >= 2 && dest.path.length === 1) {
        // Removing Part
        removeFromInnerLevel();

        // Adding Part
        if (dropAsType === constants.AS_SIBLING) {
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
        removeFromInnerLevel();

        // Adding Part
        if (dropAsType === constants.AS_SIBLING) {
          // Adding to Inner Level
          addToInnerLevel();
        }
      }

      // Handling case for dropping as child
      if (dropAsType === constants.AS_CHILD) {
        // Adding to childTasks array
        const droppedToParentId =
          state.tasks[dest.path[dest.path.length - 1]].id;
        state.tasks[droppedToParentId].childTasks.splice(0, 0, draggedId);
        // 2. Updating the expand Count
        // const poppedDestPath = [...dest.path];
        // console.log(poppedDestPath);
        // poppedDestPath.forEach((destId) => {
        //   state.tasks[destId].expandCount +=
        //     state.tasks[draggedId].expandCount + 1;
        // });
        // 3. Updating the parent task
        state.tasks[draggedId].parentTask = droppedToParentId;
      }
    },
    UPDATE_STATUS: (state, action) => {
      const { taskId, completed, curPath } = action.payload;

      if (completed) {
        state.tasks[taskId].status.completed = true;
      }

      // Handling the case if the task is moving from completed to incomplete
      if (isDefined(completed) && !completed) {
        // Check here if the task's parent is not completed
        // and check that also as incompleted
        // the whole tree
        // curPath eg, ["task-9", "task-1", "task-2", "task-4"]
        // let say "task-9" is incomplete
        // but "task-1" is completed
        // so we need to check all the tasks after first complete task in the array

        let firstCompletedTask = curPath.findIndex(
          (c) => state.tasks[c].status.completed
        );

        // Now as we found the first index of completed task
        // we will start loop from there
        for (let i = firstCompletedTask; i < curPath.length; i++) {
          state.tasks[curPath[i]].status.completed = false;
          state.tasks[curPath[i]].status.prevPath = null;
        }
      }
    },
    UPDATE_DRAGGING_STATE: (state, action) => {
      const { dragItem, isDragging } = action.payload;
      state.actions.dragState.isDragging = isDragging;
      state.actions.dragState.dragItem = dragItem;
    },
    UPDATE_ACTIVE_TASK: (state, action) => {
      const { taskId } = action.payload;
      state.actions.activeTask = taskId;
    },
    TRIGGER_REMINDER: (state, action) => {},
  },
});

export const {
  CREATE_TASK,
  DELETE_TASK,
  CREATE_TASK_ITEM,
  DELETE_TASK_ITEM,
  UPDATE_TASK,
  UPDATE_WHOLE,
  DROP_ITEM,
  DROP_TASK,
  UPDATE_DRAGGING_STATE,
  TOGGLE_EXPAND,
  UPDATE_ACTIVE_TASK,
  UPDATE_ITEM,
  UPDATE_STATUS,
} = taskSlice.actions;

export const getAllTasks = (state) => state.task;
export const getColumnOrder = (state) => state.task.taskOrder;
export const getTasks = (store) => store.task;

const taskReducer = taskSlice.reducer;

export default taskReducer;
