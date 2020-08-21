import React, {createRef, useEffect, useRef, useState} from 'react';
import CheckBox from "../../UI/CheckBox/CheckBox";
import DragIcon from "../../../icons/DragIcon";
import {useDispatch} from "react-redux";
import {ADD_TASK_CLASS, COMPLETE_TASK, INCOMPLETE_TASK, REMOVE_TASK_CLASS, UPDATE_TASK} from "../../../features/taskSlice";
import {wait} from "../../../helpers/utils";

// Components Imports


// Images Imports

const TaskItem = ({children, task, handleProps, ...args}, ref) => {
  const [title, setTitle] = useState(task.content);
  const dispatch = useDispatch();
  // Updating Input on blur
  const [inputState, setInputState] = useState({});

  async function onChange(active) {
    // Adding Task class for transitioned removal
    dispatch(ADD_TASK_CLASS({
      taskId: task.id,
      elClasses: ['disappearWithHeightTransition']
    }));
    await wait(200);    // Waiting for transition to finish

    // Toggling the status of the task
    if(active) {
      dispatch(COMPLETE_TASK({taskId: task.id}));
    } else {
      dispatch(INCOMPLETE_TASK({taskId: task.id}));
    }

    await wait(200);    // Waiting for database to update
    // Removing Task class for transitioned appearance
    dispatch(REMOVE_TASK_CLASS({
      taskId: task.id,
      removeAll: true
    }));
  }

  function onBlurInput() {
    const isTitleChanged = inputState.initialTitle.trim() !== title.trim();

    if(isTitleChanged)
      dispatch(UPDATE_TASK({
        taskId: task.id,
        title: title
      }))
  }

  function onFocusInput(e) {
    setInputState({
      initialTitle: title,
    })
  }

  return (
    <div className={["task_item", ...task.elClasses].join(" ")} data-id={task.id} {...args} ref={ref}>
      <div className="task_item-drag_handle" {...handleProps}>
          <DragIcon/>
      </div>
      <CheckBox initialValue={task.status.completed} onChange={onChange}/>
      <div className="task_item-title">
        <input type="text" onChange={e => setTitle(e.target.value)} onFocus={onFocusInput} onBlur={onBlurInput} value={title} tabIndex={-1}/>
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
