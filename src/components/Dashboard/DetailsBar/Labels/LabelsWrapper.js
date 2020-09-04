import React from 'react';
import LabelItem from "./LabelItem";
import AddLabel from "./AddLabel";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_TASK} from "../../../../features/taskSlice";
import {pushToArray, removeItemByIdInArray} from "../../../../helpers/utils";
import useLabels from "../../../../hooks/useLabels";

const LabelsWrapper = ({taskId, taskLabels, labels}) => {
  const {createLabel, fetchLabelState} = useLabels();
  const dispatch = useDispatch();

  function onCloseClick(labelId) {
    const newTaskLabelIds = removeItemByIdInArray(taskLabels, labelId);

    dispatch(UPDATE_TASK({
      taskId,
      labelIds: newTaskLabelIds
    }));
  }

  function onAddLabel(labelItem) {

    if(labelItem.creating) {
      createLabel(labelItem, taskId);
    }

    const newTaskLabelIds = pushToArray(taskLabels, labelItem.id, {
      allowDuplicates: false
    });

    dispatch(UPDATE_TASK({
      taskId,
      labelIds: newTaskLabelIds
    }));
  }

  return (
    <>
      {taskLabels.map(labelId => (
        <LabelItem key={labelId} label={fetchLabelState().labels.data[labelId]} onCloseClick={onCloseClick} />
      ))}
      <AddLabel labels={labels} onAddLabel={onAddLabel} />
    </>
  );
};

export default LabelsWrapper;
