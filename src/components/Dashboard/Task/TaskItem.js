import React, {useState} from 'react';
import CheckBox from "../../UI/CheckBox/CheckBox";
import DragIcon from "../../../icons/DragIcon";

// Components Imports


// Images Imports

const TaskItem = ({children, task, handleProps, ...args}, ref) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(task.content);

  // return (
  //   <div className="task_item" {...args} ref={ref}>
  //     {children}
  //   </div>
  // )

  return (
    <div className="task_item" {...args} ref={ref}>
      <div className="task_item-drag_handle" {...handleProps}>
          <DragIcon/>
      </div>
      <CheckBox initialValue={false} onChange={setActive}/>
      <div className="task_item-title">
        <input type="text" onChange={e => setTitle(e.target.value)} value={title} tabIndex={-1}/>
      </div>
      <div className="task_item-groups">
        <div className="task_item-group">
          <div className="task_item-label label">
            <p>Label 1</p>
          </div>
          <div className="task_item-label label">
            <p>Label 1</p>
          </div>
        </div>
        <div className="task_item-group">
          <div className="task_item-label project">
            <p>Inbox</p>
          </div>
        </div>
        <div className="task_item-group">
          <div className="task_item-label date">
            <p>Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForwardRef = React.forwardRef(TaskItem);
export default ForwardRef;
