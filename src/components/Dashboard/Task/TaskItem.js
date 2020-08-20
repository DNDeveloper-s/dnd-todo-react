import React, {useEffect, useState} from 'react';
import CheckBox from "../../UI/CheckBox/CheckBox";
import DragIcon from "../../../icons/DragIcon";
import {useDispatch} from "react-redux";
import {COMPLETE_TASK, INCOMPLETE_TASK, UPDATE_TASK} from "../../../features/taskSlice";

// Components Imports


// Images Imports

const TaskItem = ({children, task, handleProps, ...args}, ref) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(task.content);
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({});


  function todayClicked() {
    // dispatch(TO_COLUMN({
    //   taskId: task.id,
    //   toColumnId: 'completed'
    // }));
  }

  function onChange(active) {
    // console.log('[TaskItem.js || Line no. 26 ....]', active);
    if(active) {
      dispatch(COMPLETE_TASK({taskId: task.id}));
    } else {
      dispatch(INCOMPLETE_TASK({taskId: task.id}));
    }
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
    <div className="task_item" {...args} ref={ref}>
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
          <div className="task_item-label date" onClick={todayClicked}>
            <p>Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForwardRef = React.forwardRef(TaskItem);
export default ForwardRef;
