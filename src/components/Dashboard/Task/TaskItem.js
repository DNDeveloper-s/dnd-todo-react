import React, { createRef, useEffect, useRef, useState } from "react";
import CheckBox from "../../UI/CheckBox/CheckBox";
import DragIcon from "../../../icons/DragIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TASK_CLASS,
  COMPLETE_TASK,
  INCOMPLETE_TASK,
  REMOVE_TASK_CLASS,
  UPDATE_TASK,
} from "../../../features/taskSlice";
import { getCommonFormatDate, wait } from "../../../helpers/utils";
import { getAllLabels } from "../../../features/labelSlice";
import { getAllProjects } from "../../../features/projectSlice";

// Components Imports

// Images Imports

const TaskItem = ({ children, task, handleProps, ...args }, ref) => {
  const [title, setTitle] = useState(task.content);
  const labels = useSelector(getAllLabels);
  const projects = useSelector(getAllProjects);
  const dispatch = useDispatch();
  // Updating Input on blur
  const [inputState, setInputState] = useState({});

  async function onChange(active) {
    // Adding Task class for transitioned removal
    dispatch(
      ADD_TASK_CLASS({
        taskId: task.id,
        elClasses: ["disappearWithHeightTransition"],
      })
    );
    await wait(200); // Waiting for transition to finish

    // Toggling the status of the task
    if (active) {
      dispatch(COMPLETE_TASK({ taskId: task.id }));
    } else {
      dispatch(INCOMPLETE_TASK({ taskId: task.id }));
    }

    await wait(200); // Waiting for database to update
    // Removing Task class for transitioned appearance
    dispatch(
      REMOVE_TASK_CLASS({
        taskId: task.id,
        removeAll: true,
      })
    );
  }

  function onBlurInput() {
    const isTitleChanged = inputState.initialTitle.trim() !== title.trim();

    if (isTitleChanged)
      dispatch(
        UPDATE_TASK({
          taskId: task.id,
          title: title,
        })
      );
  }

  function onFocusInput(e) {
    setInputState({
      initialTitle: title,
    });
  }

  const labelEls = task.labelIds.map((labelId) => {
    const label = labels.data[labelId];
    return (
      <div
        key={labelId}
        style={{ backgroundColor: label.color }}
        className="task_item-label label"
        data-label={labelId}
      >
        <p>{label.content}</p>
      </div>
    );
  });

  const projectEls = task.projectIds.map((projectId) => {
    const project = projects.data[projectId];
    return (
      <div
        key={projectId}
        className="task_item-label project"
        data-label={projectId}
      >
        <span
          className="task_item-label-highlighter"
          style={{ backgroundColor: project.color }}
        />
        <p>{project.content}</p>
      </div>
    );
  });

  return (
    <div
      className={["task_item", ...task.elClasses].join(" ")}
      data-id={task.id}
      {...args}
      ref={ref}
    >
      <div className="task_item-drag_handle" {...handleProps}>
        <DragIcon />
      </div>
      <CheckBox
        priority={task.priority}
        initialValue={task.status.completed}
        onChange={onChange}
      />
      <div className="task_item-title">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          value={title}
          tabIndex={-1}
        />
      </div>
      <div className="task_item-groups">
        <div className="task_item-group">{labelEls}</div>
        <div className="task_item-group">{projectEls}</div>
        <div className="task_item-group">
          <div className="task_item-label date">
            <p>
              {getCommonFormatDate(task.repeatFirstDate ? JSON.parse(task.repeatFirstDate) : '', {
                nextWeek: "ddd",
                sameElse: "D MMM",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForwardRef = React.forwardRef(TaskItem);
export default ForwardRef;
