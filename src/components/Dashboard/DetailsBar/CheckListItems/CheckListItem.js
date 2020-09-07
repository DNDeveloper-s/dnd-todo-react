import React, {useState} from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import { constants } from "../../../../helpers/constants";
import useDropUtils from "../../../../hooks/useDropUtils";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import CheckBox from "../../../UI/CheckBox/CheckBox";
import MoveIcon from "../../../../icons/MoveIcon";
import useTasks from "../../../../hooks/useTasks";
import TaskInput from "../../Task/TaskList/TaskInput";
import TaskDropTarget from "../../Task/TaskList/TaskDropTarget";
import { v4 as uuidV4 } from "uuid";

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag({ item, config, startsDragging }) {
    // Return the data describing the dragged item
    const draggedItem = {
      type: config.itemType,
      id: item.id,
      dragFrom: config.dragFrom,
    };
    startsDragging({
      isDragging: true,
      dragItem: draggedItem,
    });
    console.log(draggedItem);
    return draggedItem;
  },

  endDrag({ startsDragging }, monitor, component) {
    startsDragging({
      isDragging: false,
      dragItem: null,
    });
    // if (!monitor.didDrop()) {
    //   return;
    // }

    // When dropped on a compatible target, do something
    // const item = monitor.getItem();
    // const dropResult = monitor.getDropResult();
    // CardActions.moveCardToList(item.id, dropResult.listId)
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
    dragItem: monitor.getItem(),
  };
}

function CheckListItem({
  active,
  filter,
  index,
  item,
  config = {},
  onTitleClick,
  originTask,
  elementStyle,
  expandBtnStyle,
  handleStyle,
  bgStyle,
  focusId,
  setFocusId,
  ...otherProps
}) {
  const { onDropItem: onDropItemUtil } = useDropUtils();
  const { fetchActiveTask, fetchItem, updateItem, createTaskItem, deleteTaskItem } = useTasks();
  const { getDragState } = useTreeDataUtils();

  const { itemType } = config;

  const { connectDragSource, connectDragPreview } = otherProps;

  function onDropItem(droppedItem, dropAsType) {
    // TODO: ondropitem to taskItem
    onDropItemUtil({
      taskId: fetchActiveTask(),
      droppedId: item.id,
      draggedId: droppedItem.id,
    });
  }

  function onToggleCheckBox(isActive) {
    updateItem(fetchActiveTask(), {
      itemId: item.id,
      status: isActive ? 1 : 0,
    });
  }

  function handleReturn(taskId, itemId) {
    const newItemId = uuidV4();
    createTaskItem({
      taskId: fetchActiveTask(),
      id: newItemId,
      content: '',
      status: 0,
      createAfterItemId: itemId
    });
    setFocusId(newItemId);
  }

  function handleBackspace(taskId, itemId) {
    const lastItemId = deleteTaskItem({
      taskId, itemId
    });
    setFocusId(lastItemId);
  }

  return connectDragPreview(
    <div
      className="dnd_list-item"
      data-taskid={item.id}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translateY(${index * constants.ITEM_HEIGHT}px)`,
        transition: `transform .3s cubic-bezier(0,.86,.61,1.15)`,
      }}
    >
      <div className="dnd_list-item-element pl-10">
        <div className="dnd_list-item-element-bg" style={bgStyle} />
        <CheckBox
          style={{
            zoom: 0.8,
            marginLeft: "15px",
            marginRight: "15px",
          }}
          initialValue={Boolean(fetchItem(fetchActiveTask(), item.id).status)}
          onChange={onToggleCheckBox}
        />
        {connectDragSource(
          <div className="dnd_list-item-element--handle" style={handleStyle}>
            <MoveIcon fill="#ddd" />
          </div>
        )}
        <TaskInput
          itemMode
          handleReturn={handleReturn}
          handleBackspace={handleBackspace}
          onClick={onTitleClick}
          task={item}
          focusIt={focusId === item.id}
        />
        <TaskDropTarget
          itemType={itemType}
          dropAs={constants.AS_SIBLING}
          onDrop={onDropItem}
          somethingIsDragging={getDragState().isDragging}
          style={{
            left: "24px",
          }}
        />
      </div>
    </div>
  );
}

CheckListItem.propTypes = {
  config: PropTypes.shape({
    noTreeStyle: PropTypes.bool,
    dragFrom: PropTypes.string,
  }),
  somethingIsDragging: PropTypes.bool,
  setSomethingIsDragging: PropTypes.func,
  index: PropTypes.number,
  item: PropTypes.object,
};

// Export the wrapped version
export default DragSource(
  constants.ITEM_TYPES.ITEM,
  cardSource,
  collect
)(CheckListItem);
