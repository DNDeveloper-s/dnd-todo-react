import React from 'react';
import LabelItem from "./LabelItem";
import AddLabel from "./AddLabel";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_LABEL, getAllLabels} from "../../../../features/labelSlice";
import {UPDATE_TASK} from "../../../../features/taskSlice";
import {pushToArray, removeItemByIdInArray} from "../../../../helpers/utils";

const LabelsWrapper = ({taskId, taskLabels, labels}) => {
  const labelState = useSelector(getAllLabels);
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
      createNewAddedLabel(labelItem);
    }

    const newTaskLabelIds = pushToArray(taskLabels, labelItem.id, {
      allowDuplicates: false
    });

    console.log('[LabelsWrapper.js || Line no. 25 ....]', newTaskLabelIds);

    dispatch(UPDATE_TASK({
      taskId,
      labelIds: newTaskLabelIds
    }));
  }

  function createNewAddedLabel(label) {
    dispatch(
      CREATE_LABEL({
        id: label.id,
        color: label.color,
        content: label.name,
      })
    );
  }

  return (
    <>
      {taskLabels.map(labelId => (
        <LabelItem key={labelId} label={labelState.data[labelId]} onCloseClick={onCloseClick} />
      ))}
      <AddLabel labels={labels} onAddLabel={onAddLabel} />
    </>
  );
};

export default LabelsWrapper;
