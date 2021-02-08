import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PROJECT_TASK,
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  getProjectState,
} from "../features/projectSlice";
import { getTasks } from "../features/taskSlice";

const useProjects = () => {
  const projectState = useSelector(getProjectState);
  const taskState = useSelector(getTasks);
  const dispatch = useDispatch();

  const fetchProjectState = () => projectState;

  const createProject = (projectObj) => {
    dispatch(CREATE_PROJECT(projectObj));
  };

  const deleteProject = (projectId) => {
    console.log('[useProjects.js || Line no. 24 ....]', projectId);
    dispatch(DELETE_PROJECT({projectId}));
  };

  const updateProject = (projectObj) => {
    dispatch(UPDATE_PROJECT(projectObj));
  };

  const projectTaskIds = (projectId) =>
    taskState.taskOrder.filter(
      (taskId) => taskState.tasks[taskId].projectId === projectId
    );

  const curProject = (projectId) => projectState.projects.data[projectId];

  const fetchAllProjectIds = (includeInbox) => {
    // includeInbox will take care for adding the inbox as well
    if (!includeInbox) return fetchProjectState().projects.entities;

    const projectIdsWithInbox = [...fetchProjectState().projects.entities];
    projectIdsWithInbox.splice(0, 0, "inbox");
    return projectIdsWithInbox;
  };

  const addTaskToProject = (projectId, taskId) => {
    dispatch(ADD_PROJECT_TASK({ taskId, projectId }));
  };

  return {
    addTaskToProject,
    fetchAllProjectIds,
    fetchProjectState,
    projectTaskIds,
    curProject,
    createProject,
    deleteProject,
    updateProject,
  };
};

export default useProjects;
