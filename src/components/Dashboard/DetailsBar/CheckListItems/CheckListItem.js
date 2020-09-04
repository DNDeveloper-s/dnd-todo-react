import React from 'react';
import CheckBox from "../../../UI/CheckBox/CheckBox";
import TaskInput from "../../../UI/TaskInput/TaskInput";
import DragIcon from "../../../../icons/DragIcon";

const CheckListItemRef = ({focusedItem, handleBackspace, handleReturn, handleProps, onToggleCheckbox, task, ...props}, ref) => {

  return (
    <div className="dashboard-detailsBar-innerItems-checkListItem" data-completed={task.status} ref={ref} {...props}>
      <div className="task_item-drag_handle" {...handleProps} tabIndex={-1}>
        <DragIcon />
      </div>
      <CheckBox style={{marginRight: '15px', zoom: 0.85}} onChange={(isActive) => onToggleCheckbox(isActive, task.id)} />
      <TaskInput doFocus={focusedItem && task.id === focusedItem.id} initialTitle={task.content} handleBackspace={() => handleBackspace(task)} handleReturn={() => handleReturn(task)} />
    </div>
  );
};

const CheckListItem = React.forwardRef(CheckListItemRef);
export default CheckListItem;
