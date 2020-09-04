import {createSlice} from "@reduxjs/toolkit";
import {colors} from "../components/ColorPicker/helpers/colors";

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: {
      data: {
        'inbox': {id: 'inbox', type: 'project', color: colors[12].value, content: 'Inbox'},
        'project-1': {id: 'project-1', type: 'project', color: colors[18].value, taskIds: [], content: 'First Project'},
        'project-2': {id: 'project-2', type: 'project', color: colors[17].value, taskIds: [], content: 'Second Project'},
        'project-3': {id: 'project-3', type: 'project', color: colors[16].value, taskIds: [], content: 'Third Project'},
        'project-4': {id: 'project-4', type: 'project', color: colors[15].value, taskIds: [], content: 'Forth Project'},
        'project-5': {id: 'project-5', type: 'project', color: colors[14].value, taskIds: [], content: 'Fifth Project'},
        'project-6': {id: 'project-5', type: 'project', color: colors[13].value, taskIds: [], content: 'Sixth Project'},
      },
      entities: ['project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'project-6']
    }
  },
  reducers: {
    CREATE_PROJECT: (state, action) => {
      const {taskIds, id, color, content} = action.payload;
      state.projects.data[id] = {
        id, color, content, taskIds: taskIds || [],
        type: 'project'
      };
      state.projects.entities.push(id);
    },
    ADD_PROJECT_TASK: (state, action) => {
      const [taskId, projectId] = action.payload;
      state.projects.data[projectId].taskIds.push(taskId);
    }
  }
});

export const {
  ADD_PROJECT_TASK,
  CREATE_PROJECT
} = projectSlice.actions;

// Selectors
export const getAllProjects = store => store.project.projects;
export const getProjectState = store => store.project;

const projectReducer = projectSlice.reducer;
export default projectReducer;
