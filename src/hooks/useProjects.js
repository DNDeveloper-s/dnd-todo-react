import React from 'react';
import {useSelector} from "react-redux";
import {getProjectState} from "../features/projectSlice";

const useProjects = () => {
	const projectState = useSelector(getProjectState);

	const fetchProjectState = () => projectState;

	const curProject = projectId => projectState.projects.data[projectId];

	return {
		fetchProjectState,
		curProject
	}
}

export default useProjects;