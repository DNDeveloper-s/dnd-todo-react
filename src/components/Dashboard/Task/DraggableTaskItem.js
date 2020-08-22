import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

// Components Imports

// Images Imports

const DraggableTaskItem = ({ index, task }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <TaskItem
          {...provided.draggableProps}
          handleProps={{ ...provided.dragHandleProps }}
          ref={provided.innerRef}
          task={task}
        />
      )}
    </Draggable>
  );
};

const MemoDraggableTaskItem = React.memo(DraggableTaskItem);
export default MemoDraggableTaskItem;
