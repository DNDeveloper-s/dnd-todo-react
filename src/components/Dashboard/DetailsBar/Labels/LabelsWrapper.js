import React from "react";
import LabelItem from "./LabelItem";
import AddLabel from "./AddLabel";
import { pushToArray, removeItemByIdInArray } from "../../../../helpers/utils";
import useLabels from "../../../../hooks/useLabels";
import useTasks from "../../../../hooks/useTasks";

const LabelsWrapper = ({ taskId, taskLabels, labels }) => {
  const { createLabel, fetchLabelState } = useLabels();
  const { removeLabelFromTask, updateTask } = useTasks();

  function onCloseClick(labelId) {
    removeLabelFromTask(taskId, labelId);
  }

  function onAddLabel(labelItem) {
    if (labelItem.creating) {
      createLabel(labelItem, taskId);
    }

    const newTaskLabelIds = pushToArray(taskLabels, labelItem.id, {
      allowDuplicates: false,
    });

    updateTask({
      taskId,
      labelIds: newTaskLabelIds,
    });
  }

  return (
    <>
      {taskLabels.map((labelId) => (
        <LabelItem
          key={labelId}
          label={fetchLabelState().labels.data[labelId]}
          onCloseClick={onCloseClick}
        />
      ))}
      <AddLabel labels={labels} onAddLabel={onAddLabel} />
    </>
  );
};

export default LabelsWrapper;
