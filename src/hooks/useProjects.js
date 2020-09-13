import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PROJECT_TASK, getProjectState } from "../features/projectSlice";

const useProjects = () => {
  const projectState = useSelector(getProjectState);
  const dispatch = useDispatch();

  const fetchProjectState = () => projectState;

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
    curProject,
  };
};

export default useProjects;
