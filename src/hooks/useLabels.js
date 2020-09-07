import {
  ADD_LABEL_TASK,
  CREATE_LABEL,
  getLabelState,
} from "../features/labelSlice";
import { useDispatch, useSelector } from "react-redux";

const useLabels = () => {
  const dispatch = useDispatch();
  const labelState = useSelector(getLabelState);

  const fetchLabelState = () => labelState;

  function createLabel(label, taskId) {
    console.log("[useLabels.js || Line no. 8 ....]", taskId);
    dispatch(
      CREATE_LABEL({
        id: label.id,
        color: label.color,
        content: label.name,
        taskIds: taskId ? [taskId] : [],
      })
    );
  }

  function addTaskToLabel(labelId, taskId) {
    dispatch(ADD_LABEL_TASK({ labelId, taskId }));
  }

  const curLabel = (labelId) => labelState.labels.data[labelId];

  return {
    addTaskToLabel,
    createLabel,
    curLabel,
    fetchLabelState,
  };
};

export default useLabels;
