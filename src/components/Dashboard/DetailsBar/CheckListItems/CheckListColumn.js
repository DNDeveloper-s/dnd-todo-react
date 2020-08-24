import React from 'react';
import {Droppable} from "react-beautiful-dnd";
import DraggableCheckListItem from "./DraggableCheckListItem";

const CheckListColumn = ({ column, tasks, ...props }) => {

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          style={{
            minHeight: '50px'
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="task_container">
            {tasks.map((task, index) => (
              <DraggableCheckListItem key={task.id} index={index} task={task} {...props} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
};

export default CheckListColumn;
