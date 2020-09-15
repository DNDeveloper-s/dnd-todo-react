import {
  ADD_LABEL_TASK,
  CREATE_LABEL,
  REMOVE_LABEL_TASK,
  getLabelState,
} from "../features/labelSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../features/taskSlice";

const useLabels = () => {
  const dispatch = useDispatch();
  const labelState = useSelector(getLabelState);
  const taskState = useSelector(getTasks);

  const fetchLabelState = () => labelState;

  function createLabel(label, taskId) {
    // console.log("[useLabels.js || Line no. 8 ....]", taskId);
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

  function removeTaskFromLabel(labelId, taskId) {
    dispatch(REMOVE_LABEL_TASK({ labelId, taskId }));
  }

  const labelTaskIds = (labelId) =>
    taskState.taskOrder.filter((taskId) =>
      taskState.tasks[taskId].labelIds.includes(labelId)
    );

  const curLabel = (labelId) => labelState.labels.data[labelId];

  const fetchAllLabelIds = () => [...fetchLabelState().labels.entities];

  return {
    addTaskToLabel,
    createLabel,
    curLabel,
    fetchLabelState,
    fetchAllLabelIds,
    labelTaskIds,
    removeTaskFromLabel,
  };
};

export default useLabels;
