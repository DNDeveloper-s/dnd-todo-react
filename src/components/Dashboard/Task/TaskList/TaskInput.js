import React, { useEffect, useRef, useState } from "react";
import useTasks from "../../../../hooks/useTasks";
import { classNames } from "../../../../helpers/utils";

const TaskInput = ({
  handleBackspace,
  handleShiftReturn,
  handleReturn,
  itemMode,
  task,
  onClick,
  focusIt,
  ...otherProps
}) => {
  const inputRef = useRef(null);
  const {
    curTask,
    updateItem,
    fetchItem,
    fetchActiveTask,
    updateTask,
  } = useTasks();

  useEffect(() => {
    if (focusIt) {
      inputRef.current.focus();
    }
  }, [focusIt]);

  function onChange(e) {
    if (itemMode) {
      return updateItem(fetchActiveTask(), {
        itemId: task.id,
        content: e.target.value,
      });
    }
    updateTask({
      taskId: task.id,
      content: e.target.value,
    });
  }

  function onKeyDown(e) {
    const params = itemMode ? [fetchActiveTask(), task.id] : [task.id];
    if (e.key === "Enter" && e.shiftKey)
      return handleShiftReturn && handleShiftReturn(...params);
    if (e.key === "Enter") return handleReturn(...params);
    if (e.key === "Backspace") {
      const curTitle = itemMode
        ? fetchItem(fetchActiveTask(), task.id)?.content
        : curTask(task.id)?.content;
      if (curTitle.length === 0) return handleBackspace(...params);
    }
  }

  return (
    <div
      className={classNames("dnd_list-item-element--input", {
        completed: itemMode
          ? Boolean(fetchItem(fetchActiveTask(), task.id)?.status)
          : curTask(task.id)?.status.completed,
      })}
      onKeyDown={onKeyDown}
      onClick={(e) => onClick(task.id, e)}
    >
      <input
        ref={inputRef}
        type="text"
        value={
          itemMode
            ? fetchItem(fetchActiveTask(), task.id)?.content
            : curTask(task.id)?.content
        }
        onChange={onChange}
        spellCheck={false}
        {...otherProps}
      />
    </div>
  );
};

export default TaskInput;
