import {
  ADD_LABEL_TASK,
  CREATE_LABEL,
  REMOVE_LABEL_TASK,
  getLabelState,
  UPDATE_LABEL
} from "../features/labelSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../features/taskSlice";
import {generateId} from "../helpers/utils";
import useApi from "../api/useApi";
import {constants} from "../helpers/constants";

const useLabels = () => {
  const dispatch = useDispatch();
  const labelState = useSelector(getLabelState);
  const taskState = useSelector(getTasks);
  const {postWithAuthToken} = useApi();

  const fetchLabelState = () => labelState;

  /**
   * @description Create label and returns label id
   * @param label
   * @param taskId
   * @returns {ObjectId}
   */
  function createLabel(label, taskId) {
    // console.log("[useLabels.js || Line no. 8 ....]", taskId);
    const labelId = generateId();

    dispatch(
      CREATE_LABEL({
        id: labelId,
        color: label.color,
        content: label.name,
        taskIds: taskId ? [taskId] : [],
      })
    );

    postWithAuthToken(constants.ENDPOINTS.CREATE_LABEL, {
      id: labelId,
      taskIds: taskId ? [taskId] : [],
      color: label.color,
      content: label.name
    })
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));

    return labelId;
  }

  function addTaskToLabel(labelId, taskId) {
    dispatch(ADD_LABEL_TASK({ labelId, taskId }));
  }

  function removeTaskFromLabel(labelId, taskId) {
    dispatch(REMOVE_LABEL_TASK({ labelId, taskId }));
  }

  const labelTaskIds = (labelId) =>
    Object.keys(taskState.tasks).filter((taskId) =>
      taskState.tasks[taskId].labelIds.includes(labelId)
    );

  const updateLabel = ({labelId, color, content}) => {
    dispatch(UPDATE_LABEL({labelId, color, content}));
  };

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
    updateLabel
  };
};

export default useLabels;
