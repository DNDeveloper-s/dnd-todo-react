import React, { useState } from "react";
import CheckBox from "../UI/CheckBox/CheckBox";

// Components Imports

// Images Imports

const TaskItem = ({ noLabels, noProjects, noReminders, noDates }) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(
    "It’s the task you were looking for in that case"
  );

  return (
    <div className="task_item">
      <CheckBox initialValue={false} onChange={setActive} />
      <div className="task_item-title">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          tabIndex={-1}
        />
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

export default TaskItem;
