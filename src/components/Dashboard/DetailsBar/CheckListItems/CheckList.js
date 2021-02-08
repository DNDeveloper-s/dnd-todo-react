import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useTasks from "../../../../hooks/useTasks";
import { constants } from "../../../../helpers/constants";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import CheckListItem from "./CheckListItem";
import {filterArr, logMessage} from "../../../../helpers/utils";
import useFocus from "../../../../hooks/useFocus";
import useApi from "../../../../api/useApi";

const CheckList = () => {
  const dispatch = useDispatch();
  const {postWithAuthToken} = useApi();
  const { focusId, setFocusId } = useFocus(null);
  const { curTask, fetchActiveTask, updateItem } = useTasks();
  const { setDragState } = useTreeDataUtils();

  function handleReturn(taskItem) {
    // const itemIndex = task.items.findIndex(item => item.id === taskItem.id);
    // const newItems = [...task.items];
    // newItems.splice(itemIndex + 1, 0, {
    //   id: uuidV4(),
    //   content: '',
    //   status: 0,
    // })
    // dispatch(UPDATE_TASK({
    //   taskId: task.id,
    //   items: newItems
    // }));
    // setFocusedItem(newItems[itemIndex + 1]);
  }

  function handleBackspace(taskItem) {
    // const itemIndex = task.items.findIndex(item => item.id === taskItem.id);
    // const newItems = [...task.items];
    // newItems.splice(itemIndex, 1);
    // dispatch(UPDATE_TASK({
    //   taskId: task.id,
    //   items: newItems
    // }));
    // setFocusedItem(newItems[itemIndex - 1]);
  }

  function onToggleCheckbox(isActive, itemId) {
    // const taskItems = produce(task.items, draftItems => {
    //   const curItem = draftItems.find(item => item.id === itemId);
    //   const curItemIndex = draftItems.findIndex(item => item.id === itemId);
    //   curItem.status = isActive ? 1 : 0;
    //   if(isActive) {
    //     curItem.prevInd = curItemIndex;
    //     draftItems.splice(curItemIndex, 1);
    //     draftItems.push(curItem);
    //   } else {
    //     draftItems.splice(curItemIndex, 1);
    //     draftItems.splice(curItem.prevInd, 0, curItem);
    //     curItem.prevInd = null;
    //   }
    // })
    // console.log(itemId, taskItems);
    // updateTask({
    //   taskId: task.id,
    //   items: taskItems
    // })
  }

  function onTitleBlur(itemId, taskId, value) {
    const item = curTask(taskId).items.find(c => c.id === itemId);
    if(item && item.contentIsUnsaved) {
      postWithAuthToken(constants.ENDPOINTS.UPDATE_TASK_ITEM, {itemId, taskId, content: value})
        .then(res => {
          logMessage('Fetched Successfully!', res);
          updateItem(taskId, {
            itemId,
            contentIsUnsaved: false,
            temp: true
          });
        })
        .catch(e => logMessage(e.message, e, true));
    }
  }

  return (
    <div
      style={{
        position: "relative",
        height:
          curTask(fetchActiveTask()).items.length * constants.ITEM_HEIGHT +
          "px",
      }}
    >
      {filterArr(curTask(fetchActiveTask()).items).map((item, index) => (
        <CheckListItem
          key={item.id}
          index={index}
          handleBackspace={handleBackspace}
          handleReturn={handleReturn}
          onTitleBlur={onTitleBlur}
          item={item}
          elementStyle={{
            paddingLeft: 0,
          }}
          handleStyle={{
            left: "0px",
          }}
          bgStyle={{
            left: "15px",
          }}
          startsDragging={setDragState}
          config={{
            itemType: constants.ITEM_TYPES.ITEM,
            dragFrom: constants.DRAG_FROM.ITEM,
          }}
          onTitleClick={() => null}
          focusId={focusId}
          setFocusId={setFocusId}
        />
      ))}
    </div>
  );
};

export default CheckList;
