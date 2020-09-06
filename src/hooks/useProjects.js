import React from 'react';
import {useSelector} from "react-redux";
import {getProjectState} from "../features/projectSlice";

const useProjects = () => {
	const projectState = useSelector(getProjectState);

	const fetchProjectState = () => projectState;

	const curProject = projectId => projectState.projects.data[projectId];

	const fetchAllProjectIds = (includeInbox) => {
		// includeInbox will take care for adding the inbox as well
		if(!includeInbox)
			return fetchProjectState().projects.entities;

		const projectIdsWithInbox = [...fetchProjectState().projects.entities];
		projectIdsWithInbox.splice(0,0, 'inbox');
		return projectIdsWithInbox;
	}

	return {
		fetchAllProjectIds,
		fetchProjectState,
		curProject
	}
}

export default useProjects;