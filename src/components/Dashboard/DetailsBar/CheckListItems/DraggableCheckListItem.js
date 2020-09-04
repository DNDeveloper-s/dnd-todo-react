import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import CheckListItem from "./CheckListItem";

const DraggableCheckListItem = ({index, task, ...props}) => {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
          <CheckListItem
            {...provided.draggableProps}
            handleProps={{ ...provided.dragHandleProps }}
            ref={provided.innerRef}
            task={task}
            {...props}
          />
        )}
    </Draggable>
  );
};

export default DraggableCheckListItem;
