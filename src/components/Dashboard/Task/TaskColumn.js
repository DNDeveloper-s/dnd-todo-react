import React, { useState } from "react";
import DraggableTaskItem from "./DraggableTaskItem";
import { Droppable } from "react-beautiful-dnd";
import CaretDownFillIcon from "../../../icons/CaretDownFillIcon";

// Components Imports
const TASK_ITEM_HEIGHT = 50;

// Images Imports

const TaskColumn = ({ column, tasks }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className={["task_column", column.id].join(" ")}
          style={{ backgroundColor: column.color }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div
            className="task_column-header"
            onClick={() => setVisible(!visible)}
          >
            <div className="task_column-header-label">
              <p>{column.title}</p>
            </div>
            <div
              className={[
                "task_column-header-icon",
                visible ? "opened" : "",
              ].join(" ")}
            >
              <CaretDownFillIcon />
            </div>
          </div>
          <div
            style={{
              maxHeight: visible
                ? TASK_ITEM_HEIGHT * tasks.length + TASK_ITEM_HEIGHT
                : 0,
              transition: ".55s cubic-bezier(0,1.1,.76,1.08)",
              overflow: "hidden",
            }}
          >
            <div className="task_container">
              {tasks.map((task, index) => (
                <DraggableTaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
