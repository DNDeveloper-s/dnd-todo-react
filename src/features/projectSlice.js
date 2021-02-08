import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../components/ColorPicker/helpers/colors";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: {
      data: {
        inbox: {
          id: "inbox",
          type: "project",
          color: colors[12].value,
          taskIds: [
            "task-1",
            "task-2",
            "task-3",
            "task-4",
            "task-5",
            "task-6",
            "task-7",
            "task-8",
            "task-9",
            "task-10",
            "task-11",
            "task-12",
            "task-13",
            "task-15",
          ],
          content: "Inbox",
        },
        "project-1": {
          id: "project-1",
          type: "project",
          color: colors[18].value,
          taskIds: [],
          content: "First Project",
        },
        "project-2": {
          id: "project-2",
          type: "project",
          color: colors[17].value,
          taskIds: ["task-14"],
          content: "Second Project",
        },
        "project-3": {
          id: "project-3",
          type: "project",
          color: colors[16].value,
          taskIds: [],
          content: "Third Project",
        },
        "project-4": {
          id: "project-4",
          type: "project",
          color: colors[15].value,
          taskIds: [],
          content: "Forth Project",
        },
        "project-5": {
          id: "project-5",
          type: "project",
          color: colors[14].value,
          taskIds: [],
          content: "Fifth Project",
        },
        "project-6": {
          id: "project-6",
          type: "project",
          color: colors[13].value,
          taskIds: [],
          content: "Sixth Project",
        },
      },
      entities: [
        "project-1",
        "project-2",
        "project-3",
        "project-4",
        "project-5",
        "project-6",
      ],
    },
  },
  reducers: {
    CREATE_PROJECT: (state, action) => {
      const { taskIds, id, color, content } = action.payload;
      state.projects.data[id] = {
        id,
        color,
        content,
        taskIds: taskIds || [],
        type: "project",
      };
      state.projects.entities.push(id);
    },
    DELETE_PROJECT: (state, action) => {
      const { projectId } = action.payload;
      console.log('[projectSlice.js || Line no. 98 ....]', projectId);
      state.projects.data[projectId] = null;
      const curInd = state.projects.entities.findIndex(c => c === projectId);
      state.projects.entities.splice(curInd, 1);
    },
    UPDATE_PROJECT: (state, action) => {
      const { projectId, color, content } = action.payload;
      const curProject = state.projects.data[projectId];
      curProject.color = color || curProject.color;
      curProject.content = content || curProject.content;
    },
    ADD_PROJECT_TASK: (state, action) => {
      // const { taskId, projectId } = action.payload;
      // const taskIds = state.projects.data[projectId].taskIds;
      // const doesExist = taskIds.some((id) => id === taskId);
      // if (!doesExist) {
      //   taskIds.push(taskId);
      // }
    },
    LOAD_PROJECTS: (state, action) => {
      const {projects, inbox} = action.payload;
      const projectObj = {};
      state.projects.entities = [];
      projects.forEach(project => {
        projectObj[project._id] = project;
        projectObj[project._id].type = 'project';
        projectObj[project._id].id = project._id;
        state.projects.entities.push(project._id);
      });
      state.projects.data = projectObj;
      state.projects.data.inbox = {
        id: "inbox",
        type: "project",
        color: colors[12].value,
        taskIds: inbox,
        content: "Inbox",
      };
    }
  },
});

export const {
  ADD_PROJECT_TASK,
  CREATE_PROJECT,
  DELETE_PROJECT,
  LOAD_PROJECTS,
  UPDATE_PROJECT,
} = projectSlice.actions;

// Selectors
export const getAllProjects = (store) => store.project.projects;
export const getProjectState = (store) => store.project;

const projectReducer = projectSlice.reducer;
export default projectReducer;
