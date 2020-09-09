import React from "react";
import ReminderModal from "../ReminderModal/ReminderModal";
import useTasks from "../../hooks/useTasks";

const TriggerReminder = (props) => {
  const { curTask, fetchTriggers, updateTriggers } = useTasks();

  const onClose = (triggeredTaskId) => {
    updateTriggers(triggeredTaskId);
  };

  return fetchTriggers().map((triggeredTaskId, index) => (
    <ReminderModal
      key={triggeredTaskId}
      onClose={onClose}
      triggeredTask={curTask(triggeredTaskId)}
      noBackdrop={index !== 0}
      style={{
        transform: `translate(-50%) translateY(${
          -20 * (fetchTriggers().length - 1 - index)
        }px) scale(${1 - 0.1 * (fetchTriggers().length - 1 - index)}) rotateX(${
          index !== fetchTriggers().length - 1 ? -10 : 0
        }deg)`,
      }}
    />
  ));
};

export default TriggerReminder;
