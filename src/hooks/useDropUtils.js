import React from "react";
import { DROP_TASK, DROP_ITEM } from "../features/taskSlice";
import { useDispatch } from "react-redux";
import useTreeDataUtils from "./useTreeDataUtils";

const useDropUtils = (props) => {
  const dispatch = useDispatch();
  const { getPath } = useTreeDataUtils();

  const onDropTask = ({ dragFrom, draggedId, droppedId, dropAsType }) => {
    // Handling the case for the highest level
    // console.log(getPath(draggedId), getPath(droppedId));
    // console.log(draggedId, droppedId);

    dispatch(
      DROP_TASK({
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
      })
    );
  };

  const onDropItem = ({ taskId, draggedId, droppedId }) => {
    dispatch(DROP_ITEM({ taskId, draggedId, droppedId }));
  };

  return { onDropTask, onDropItem };
};

export default useDropUtils;
