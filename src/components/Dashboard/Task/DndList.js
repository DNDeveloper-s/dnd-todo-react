import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  COMPLETE_TASK,
  INCOMPLETE_TASK,
  UPDATE_WHOLE,
} from "../../../features/taskSlice";

const DndList = () => {
  const taskData = useSelector(getTasks);
  const dispatch = useDispatch();

  const columns = taskData.columnOrder.map((columnId) => {
    const column = taskData.columns[columnId];
    const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId]);

    return <TaskColumn key={columnId} column={column} tasks={tasks} />;
  });

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = taskData.columns[source.droppableId];
    const finish = taskData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...taskData,
        columns: {
          ...taskData.columns,
          [newColumn.id]: newColumn,
        },
      };

      dispatch(UPDATE_WHOLE(newData));
      return;
    }

    // Checking if the item is dropping to completed column
    if (destination.droppableId === "completed") {
      const taskId = draggableId;
      console.log("[DndList.js || Line no. 55 ....]", result);
      return dispatch(COMPLETE_TASK({ taskId, index: destination.index }));
    }

    // Checking if the item is being dragged from completed column
    if (source.droppableId === "completed") {
      const taskId = draggableId;
      console.log("[DndList.js || Line no. 55 ....]", result);
      return dispatch(
        INCOMPLETE_TASK({
          taskId,
          droppedTo: {
            index: destination.index,
            toColumnId: destination.droppableId,
          },
        })
      );
    }

    // Moving Items from one column to other
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...taskData,
      tasks: {
        ...taskData.tasks,
        [draggableId]: {
          ...taskData.tasks[draggableId],
          columnId: newFinish.id,
        },
      },
      columns: {
        ...taskData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    dispatch(UPDATE_WHOLE(newData));
  }

  return <DragDropContext onDragEnd={onDragEnd}>{columns}</DragDropContext>;
};

export default DndList;
