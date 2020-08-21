import {createSlice} from "@reduxjs/toolkit";
import {colors} from "../components/ColorPicker/helpers/colors";
import {getRandomInt, removeItemByIdInArray} from "../helpers/utils";

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    taskData: {
      tasks: {
        'task-1': {id: 'task-1', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-1', content: 'This is my first task. Be Gentle'},
        'task-2': {id: 'task-2', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-1', content: 'This is my second task. Never mind'},
        'task-3': {id: 'task-3', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-1', content: 'This is my third task. I am improving'},
        'task-4': {id: 'task-4', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-2', content: 'This is my forth task. I feel confident now'},
        'task-5': {id: 'task-5', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-2', content: 'This is my fifth task. I can control this anyhow'},
        'task-6': {id: 'task-6', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-2', content: 'This is my sixth task, i guess. But does\'t matter now'},
        'task-7': {id: 'task-7', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-3', content: 'This is my forth tasks. I feel confident now'},
        'task-8': {id: 'task-8', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-3', content: 'This is my fifth tasks. I can control this anyhow'},
        'task-9': {id: 'task-9', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-3', content: 'This is my sixth tasks, i guess. But does\'t matter now'},
        'task-10': {id: 'task-10', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-4', content: 'This is my first tasks. Be Gentle'},
        'task-11': {id: 'task-11', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-4', content: 'This is my second tasks. Never mind'},
        'task-12': {id: 'task-12', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-4', content: 'This is my third tasks. I am improving'},
        'task-13': {id: 'task-13', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-5', content: 'This is my first tasks. Be Gentle'},
        'task-14': {id: 'task-14', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-5', content: 'This is my second tasks. Never mind'},
        'task-15': {id: 'task-15', labelIds: [], elClasses: [], status: {completed: false, prevColumnId: null}, columnId: 'column-5', content: 'This is my third tasks. I am improving'},
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Today',
          taskIds: ['task-1', 'task-2', 'task-3'],
          color: colors[0].value
        },
        'column-2': {
          id: 'column-2',
          title: 'Thursday',
          taskIds: ['task-4', 'task-5', 'task-6'],
          color: colors[7].value
        },
        'column-3': {
          id: 'column-3',
          title: 'Friday',
          taskIds: ['task-7', 'task-8', 'task-9'],
          color: colors[3].value
        },
        'column-4': {
          id: 'column-4',
          title: 'Friday',
          taskIds: ['task-10', 'task-11', 'task-12'],
          color: colors[8].value
        },
        'column-5': {
          id: 'column-5',
          title: 'Friday',
          taskIds: ['task-13', 'task-14', 'task-15'],
          color: colors[18].value
        },
        'completed': {
          id: 'completed',
          title: 'Completed',
          taskIds: [],
          color: colors[12].value
        }
      },
      // Facilitate reordering the column
      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'completed']
    }
  },
  reducers: {
    ADD_TASK_CLASS: (state, action) => {
      const {elClasses: classes, taskId, replaceAll} = action.payload;
      if(replaceAll) state.taskData.tasks[taskId].elClasses = classes;
      else state.taskData.tasks[taskId].elClasses.push(classes);
    },
    REMOVE_TASK_CLASS: (state, action) => {
      const {elClasses: classes, taskId, removeAll} = action.payload;
      if(removeAll) state.taskData.tasks[taskId].elClasses = [];
      else classes.forEach(className => {
        state.taskData.tasks[taskId].elClasses = removeItemByIdInArray(state.taskData.tasks[taskId].elClasses, className);
      })
    },
    UPDATE_WHOLE: (state, action) => {
      state.taskData = action.payload
    },
    CREATE_TASK: (state, action) => {
      const taskItem = action.payload;
      state.taskData.tasks[taskItem.id] = {
        id: taskItem.id,
        status: {
          completed: false,
          prevColumnId: null,
        },
        labelIds: taskItem.labelIds,
        elClasses: taskItem.elClasses,
        columnId: taskItem.columnId,
        content: taskItem.content
      };
      state.taskData.columns[taskItem.columnId].taskIds.splice(0, 0, taskItem.id);
    },
    TO_COLUMN: (state, action) => {
      const {taskId, toColumnId} = action.payload;
      const fromColumnId = state.taskData.tasks[taskId].columnId;
      state.taskData.columns[fromColumnId].taskIds = removeItemByIdInArray(state.taskData.columns[fromColumnId].taskIds, taskId);
      state.taskData.tasks[taskId].columnId = toColumnId;
      state.taskData.columns[toColumnId].taskIds.push(taskId);
    },
    COMPLETE_TASK: (state, action) => {
      const {taskId} = action.payload;
      const fromColumnId = state.taskData.tasks[taskId].columnId;
      // Setting status from further in-completion of the task
      const index = state.taskData.columns[fromColumnId].taskIds.findIndex(c => c.toString() === taskId.toString());
      state.taskData.tasks[taskId].status = {
        completed: true,
        prevColumnId: fromColumnId,
        index,
      };

      state.taskData.columns[fromColumnId].taskIds = removeItemByIdInArray(state.taskData.columns[fromColumnId].taskIds, taskId);
      state.taskData.tasks[taskId].columnId = 'completed';

      // Putting on the same index on which it is being dropped
      // Index is getting from the react-beautiful-dnd api
      if(index === undefined) state.taskData.columns['completed'].taskIds.push(taskId);
      else state.taskData.columns['completed'].taskIds.splice(index, 0, taskId);
    },
    INCOMPLETE_TASK: (state, action) => {
      const {taskId, droppedTo} = action.payload;
      const fromColumnId = 'completed';
      const toColumnId = droppedTo ? droppedTo.toColumnId : state.taskData.tasks[taskId].status.prevColumnId;
      const index = state.taskData.tasks[taskId].status.index;

      state.taskData.columns[fromColumnId].taskIds = removeItemByIdInArray(state.taskData.columns[fromColumnId].taskIds, taskId);
      state.taskData.tasks[taskId].columnId = toColumnId;

      // Putting on the same index on which it is being dropped
      // Index is getting from the react-beautiful-dnd api
      if(droppedTo === undefined && index === undefined) state.taskData.columns[toColumnId].taskIds.push(taskId);
      else state.taskData.columns[toColumnId].taskIds.splice(droppedTo ? droppedTo.index : index, 0, taskId);

      // Setting status from further in-completion of the task
      state.taskData.tasks[taskId].status = {
        completed: false,
        prevColumnId: null,
        index: undefined
      };
    },
    CREATE_COLUMN: (state, action) => {
      const newColumn = action.payload;
      state.taskData.columns[newColumn.id] = {
        id: newColumn.id,
        title: newColumn.title,
        taskIds: newColumn.taskIds || [],
        color: colors[getRandomInt(0, colors.length - 1)]
      };
      state.taskData.columnOrder.push(newColumn.id);
    },
    DELETE_TASK_BY_ID: (state, action) => {
      const {columnId, taskId} = action.payload;
      state.taskData.tasks[taskId] = undefined;
      // Removing Item from the array by an id
      state.taskData.columns[columnId].taskIds = removeItemByIdInArray(state.taskData.columns[columnId].taskIds, taskId);
    },
    DELETE_COLUMN: (state, action) => {
      const {columnId} = action.payload;
      state.taskData.columns[columnId] = undefined;
      // Removing Item from the array by an id
      state.taskData.columnOrder = removeItemByIdInArray(state.taskData.columnOrder, columnId);
    },
    UPDATE_TASK: (state, action) => {
      const {taskId, title} = action.payload;
      state.taskData.tasks[taskId].content = title;
    }
  }
});

export const {
  ADD_TASK_CLASS,
  COMPLETE_TASK,
  CREATE_COLUMN,
  CREATE_TASK,
  DELETE_COLUMN,
  DELETE_TASK_BY_ID,
  INCOMPLETE_TASK,
  REMOVE_TASK_CLASS,
  TO_COLUMN,
  UPDATE_TASK,
  UPDATE_WHOLE,
} = taskSlice.actions;

export const getTasks = state => state.task.taskData;
export const getColumnOrder = state => state.task.taskData.columnOrder;

const taskReducer = taskSlice.reducer;

export default taskReducer;
