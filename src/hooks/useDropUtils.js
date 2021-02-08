import { DROP_TASK, DROP_ITEM } from "../features/taskSlice";
import { useDispatch } from "react-redux";
import useTreeDataUtils from "./useTreeDataUtils";
import useApi from "../api/useApi";
import {constants} from "../helpers/constants";
import {logMessage} from "../helpers/utils";

const useDropUtils = (props) => {
  const dispatch = useDispatch();
  const {postWithAuthToken} = useApi();
  const { getPath } = useTreeDataUtils();

  const onDropTask = ({ dragFrom, draggedId, droppedId, dropAsType, tab }) => {
    // Handling the case for the highest level
    // console.log(getPath(draggedId), getPath(droppedId));
    // console.log(draggedId, droppedId);
    const reqObj = {
      source: {
        id: draggedId,
        path: getPath(draggedId),
      },
      dragFrom,
      dropAsType: dropAsType,
      destination: {
        id: droppedId,
        path: getPath(droppedId),
      },
      tab,
    };
    dispatch(
      DROP_TASK(reqObj)
    );

    postWithAuthToken(constants.ENDPOINTS.DROP_TASK, reqObj)
      .then(res => {
        logMessage('Fetched successfully', res);
      })
      .catch(e => logMessage(e.message, e, true));

  };

  const onDropItem = ({ taskId, draggedId, droppedId }) => {
    dispatch(DROP_ITEM({ taskId, draggedId, droppedId }));
    postWithAuthToken(constants.ENDPOINTS.DROP_TASK_ITEM, { taskId, draggedId, droppedId })
      .then(res => {
        logMessage('Fetched successfully', res);
      })
      .catch(e => logMessage(e.message, e, true));
  };

  return { onDropTask, onDropItem };
};

export default useDropUtils;
