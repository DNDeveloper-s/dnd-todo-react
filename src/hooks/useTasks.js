import { useEffect, useState } from "react";
import rawTaskData from "../store/taskData";
import produce from "immer";
import { colors } from "../components/ColorPicker/helpers/colors";
import { getRandomInt, removeItemByIdInArray } from "../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../features/taskSlice";

const useTasks = () => {
  const taskData = useSelector(getAllTasks);
  const dispatch = useDispatch();

  function createTask(taskItem) {
    const newTaskData = produce(taskData, (draftTaskData) => {
      draftTaskData.tasks[taskItem.id] = taskItem;
      draftTaskData.columns[taskItem.columnId].taskIds.push(taskItem.id);
    });
    setTaskData(newTaskData);
  }

  function createColumn(newColumn) {
    const newTaskData = produce(taskData, (draftTaskData) => {
      draftTaskData.columns[newColumn.id] = {
        id: newColumn.id,
        title: newColumn.title,
        taskIds: newColumn.taskIds || [],
        color: colors[getRandomInt(0, colors.length - 1)],
      };
      draftTaskData.columnOrder.push(newColumn.id);
    });
    setTaskData(newTaskData);
  }

  /**
   * @param taskId {String}
   * @param columnId {String}
   */

  function deleteTaskById(taskId, columnId) {
    console.log("[useTasks.js || Line no. 41 ....]", taskData);
    const newTaskData = produce(taskData, (draftTaskData) => {
      draftTaskData.tasks[taskId] = undefined;
      // Removing Item from the array by an id
      draftTaskData.columns[columnId].taskIds = removeItemByIdInArray(
        draftTaskData.columns[columnId].taskIds,
        taskId
      );
    });
    setTaskData(null);
  }

  function deleteColumn(columnId) {
    const newTaskData = produce(taskData, (draftTaskData) => {
      draftTaskData.columns[columnId] = undefined;
      // Removing Item from the array by an id
      draftTaskData.columnOrder = removeItemByIdInArray(
        draftTaskData.columnOrder,
        columnId
      );
    });
    setTaskData(newTaskData);
  }

  return {
    createTask,
    createColumn,
    deleteTaskById,
    deleteColumn,
    setTaskData,
    taskData,
  };
};

export default useTasks;
