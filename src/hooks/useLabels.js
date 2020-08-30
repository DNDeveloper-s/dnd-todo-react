import {ADD_LABEL_TASK, CREATE_LABEL} from "../features/labelSlice";
import {useDispatch} from "react-redux";

const useLabels = () => {
  const dispatch = useDispatch();

  function createLabel(label, taskId) {
    console.log('[useLabels().js || Line no. 8 ....]', taskId);
    dispatch(
      CREATE_LABEL({
        id: label.id,
        color: label.color,
        content: label.name,
        taskIds: taskId ? [taskId] : []
      })
    );
  }

  function addTaskToLabel(labelId, taskId) {
    dispatch(ADD_LABEL_TASK({ labelId, taskId }));
  }


  return {addTaskToLabel, createLabel};
}

export default useLabels;
