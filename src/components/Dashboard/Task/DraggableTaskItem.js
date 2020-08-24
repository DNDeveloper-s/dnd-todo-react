import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';

// Components Imports

// Images Imports

const DraggableTaskItem = ({ index, task, ...props }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Link to={props.match.path + "/" + task.id} >
          <TaskItem
            {...provided.draggableProps}
            handleProps={{ ...provided.dragHandleProps }}
            ref={provided.innerRef}
            task={task}
          />
        </Link>
      )}
    </Draggable>
  );
};

const MemoDraggableTaskItem = React.memo(withRouter(DraggableTaskItem));
export default MemoDraggableTaskItem;
