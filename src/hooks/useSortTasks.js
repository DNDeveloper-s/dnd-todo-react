import React, {useCallback} from "react";
import useProjects from "./useProjects";
import useLabels from "./useLabels";
import useTasks from "./useTasks";
import moment from "moment";
import { isToday, withinWeek } from "../helpers/utils";

const useSortTasks = () => {
  const { allTaskIds, curTask, fetchTaskState } = useTasks();
  const { fetchAllProjectIds, curProject, projectTaskIds } = useProjects();
  const { fetchAllLabelIds, curLabel, labelTaskIds } = useLabels();

  const sortViaToday = useCallback((tasksArr) =>
    // customSort(
    tasksArr.filter((taskId) => {
      const task = curTask(taskId);
      if (!task.startDate) return false;
      return isToday(task.startDate);
    }), [curTask]);
  // );

  const sortViaWithinWeek = useCallback((tasksArr, excludeToday) =>
    tasksArr.filter((taskId) => {
      const task = curTask(taskId);
      if (!task.startDate) return null;
      if (excludeToday && isToday(task.startDate)) return false;
      return withinWeek(task.startDate, task.isFullDay);
    }), [curTask]);

  const sortViaTrash = useCallback((tasksArr) =>
    tasksArr.filter((taskId) => {
      const task = curTask(taskId);
      return task.deleted === 1;
    }), [curTask]);

  const sortViaFilter = useCallback((filter) => {
    const tasksArr = fetchTaskState().taskOrder;
    if (filter === "today") return sortViaToday(tasksArr);
    if (filter === "week") return sortViaWithinWeek(tasksArr);
    if (filter === "trash") return sortViaTrash(allTaskIds());
  }, [allTaskIds, fetchTaskState, sortViaToday, sortViaTrash, sortViaWithinWeek]);

  const getAlLTasksUnderId = useCallback((id, scopeId, dataAccToParams) => {
    if (id === "all") {
      let filters = { status: { completed: false }, deleted: 0 };
      if (scopeId === "trash") {
        filters = {};
      }
      return {
        type: "all",
        data: {
          content: dataAccToParams.header,
          taskIds: sortViaFilter(dataAccToParams.filter),
        },
        filters,
      };
    }
    let isProject = fetchAllProjectIds(true).find((c) => c === id);
    if (isProject) {
      return {
        type: "project",
        data: {
          ...curProject(id),
          taskIds: projectTaskIds(id),
          // taskIds: convertItToTaskOrder(curProject(id).taskIds).reverse(),
        },
        filters: { status: { completed: false }, deleted: 0 },
      };
    }
    let isLabel = fetchAllLabelIds().find((c) => c === id);
    if (isLabel) {
      return {
        type: "label",
        data: {
          ...curLabel(id),
          taskIds: labelTaskIds(id),
        },
        filters: { status: { completed: false }, deleted: 0 },
      };
    }
    return "nothing";
  }, [curLabel, curProject, fetchAllLabelIds, fetchAllProjectIds, labelTaskIds, projectTaskIds, sortViaFilter]);

  const typeById = (id) => {
    let isProject = fetchAllProjectIds(true).find((c) => c === id);
    if (isProject) return { type: "project", id };
    let isLabel = fetchAllLabelIds().find((c) => c === id);
    if (isLabel) return { type: "label", id };
    return { type: null };
  };

  const typeByParams = (params) => {
    const { typeId, scopeId } = params;
    if (typeId === "all") return { type: "all", id: scopeId };
    return typeById(typeId);
  };

  const convertItToTaskOrder = (taskIds) =>
    taskIds.filter((taskId) => fetchTaskState().taskOrder.includes(taskId));

  const customSort = (arr) =>
    arr.sort((a, b) => {
      if (!curTask(a).createdAt) return 1;
      if (!curTask(b).createdAt) return -1;
      let momentA = moment(curTask(a).createdAt);
      let momentB = moment(curTask(b).createdAt);
      if (momentA.diff(momentB) > 0) return -1;
      if (momentA.diff(momentB) < 0) return 1;
      return 0;
    });

  const sortTasksByDate = (arr, datePropertyOnTask) =>
    arr.sort((a, b) => {
      if (!curTask(a).status.completedAt) return 1;
      if (!curTask(b).status.completedAt) return -1;
      let momentA = moment(curTask(a).status.completedAt);
      let momentB = moment(curTask(b).status.completedAt);
      if (momentA.diff(momentB) > 0) return -1;
      if (momentA.diff(momentB) < 0) return 1;
      return 0;
    });

  const filterDeleted = (taskIds) =>
    taskIds.filter((taskId) => curTask(taskId).deleted === 0);

  const filterCompleted = (taskIds) =>
    taskIds.filter((taskId) => !curTask(taskId).status.completed);

  return {
    filterCompleted,
    filterDeleted,
    getAlLTasksUnderId,
    sortTasksByDate,
    sortViaFilter,
    sortViaToday,
    sortViaTrash,
    sortViaWithinWeek,
    typeById,
    typeByParams,
  };
};

export default useSortTasks;
