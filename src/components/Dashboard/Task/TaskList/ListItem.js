import React from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import { constants } from "../../../../helpers/constants";
import TaskDropTarget from "./TaskDropTarget";
import useDropUtils from "../../../../hooks/useDropUtils";
import TaskInput from "./TaskInput";
import TaskLabel from "./TaskLabel";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import { classNames } from "../../../../helpers/utils";
import CaretDownIcon from "../../../../icons/CaretDownIcon";
import CheckBox from "../../../UI/CheckBox/CheckBox";
import MoveIcon from "../../../../icons/MoveIcon";
import useProjects from "../../../../hooks/useProjects";
import useGlobalState from "../../../../hooks/useGlobalState";
import useTasks from "../../../../hooks/useTasks";
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

function ListItem({
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
  const { onDropTask } = useDropUtils();
  const { curProject } = useProjects();
  const { fetchToggleCollapse } = useGlobalState();
  const { createTask, curTask, deleteTask, updateStatus } = useTasks();
  const {
    onExpandToggle,
    getPrevItemInExpandedTree,
    getPath,
    hasChildTasks,
    levelInTree,
    getDragState,
  } = useTreeDataUtils();

  const { itemType, noTreeStyle } = config;

  const { connectDragSource, connectDragPreview } = otherProps;

  function onDropItem(droppedItem, dropAsType) {
    onDropTask({
      draggedId: droppedItem.id,
      droppedId: item.id,
      dropAsType: dropAsType,
      dragFrom: droppedItem.dragFrom,
    });
  }

  function onToggleCheckBox(isActive) {
    updateStatus(item.id, isActive);
  }

  function handleReturn(taskId, as) {
    const newTaskId = uuidV4();
    createTask({
      id: newTaskId,
      content: "",
      labelIds: [],
      projectId: null,
      priority: 0,
      createType: {
        path: getPath(taskId),
        as
      }
    })
    setFocusId(newTaskId);
    if(as === constants.AS_CHILD)
      onExpandToggle(config.dragFrom, item.id, true)(true);
  }

  function handleBackspace(taskId) {
    const prevItemId = getPrevItemInExpandedTree(taskId, config.dragFrom, originTask);
    deleteTask(taskId);
    setFocusId(prevItemId);
  }

  return connectDragPreview(
    <div
      className={classNames("dnd_list-item", { active })}
      data-taskid={item.id}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translateY(${index * constants.ITEM_HEIGHT}px)`,
        transition: `transform .3s cubic-bezier(0,.86,.61,1.15)`,
      }}
    >
      <div
        className="dnd_list-item-element pl-40"
        style={{
          marginLeft: noTreeStyle
            ? "0px"
            : `${
                levelInTree(item.id, originTask) * constants.SCAFFOLD_WIDTH
              }px`,
          ...elementStyle,
        }}
      >
        <div className="dnd_list-item-element-bg" style={bgStyle} />
        {hasChildTasks(item.id, filter) && !noTreeStyle && (
          <div
            className={classNames("dnd_list-item--toggle_child", {
              expanded: fetchToggleCollapse(config.dragFrom, item.id),
            })}
            style={expandBtnStyle}
            onClick={onExpandToggle(config.dragFrom, item.id)}
          >
            <CaretDownIcon fill="#ddd" />
          </div>
        )}
        <CheckBox
          style={{
            zoom: 0.8,
            marginLeft: "15px",
            marginRight: "15px",
          }}
          initialValue={curTask(item.id).status.completed}
          onChange={onToggleCheckBox}
        />
        {connectDragSource(
          <div className="dnd_list-item-element--handle" style={handleStyle}>
            <MoveIcon fill="#ddd" />
          </div>
        )}
        <TaskInput
          handleShiftReturn={(args) => handleReturn(args, constants.AS_CHILD)}
          handleReturn={args => handleReturn(args, constants.AS_SIBLING)}
          handleBackspace={handleBackspace}
          onClick={onTitleClick}
          task={item}
          focusIt={focusId === item.id}
        />
        <div className="dnd_list-item-element--group">
          {item.labelIds.map((labelId) => (
            <TaskLabel key={labelId} labelId={labelId} />
          ))}
        </div>
        <div className="dnd_list-item-element--group">
          <div className="dnd_list-item-element--project">
            <div
              className="dnd_list-item-element--project--highlighter"
              style={{
                backgroundColor: curProject(item.projectId || "inbox").color,
              }}
            />
            <p>{curProject(item.projectId || "inbox").content}</p>
          </div>
        </div>
        <div className="dnd_list-item-element--group">
          <div className="dnd_list-item-element--time">
            <p>Tue</p>
          </div>
        </div>
        <span className="dnd_list-item-element--line" />
      </div>
      {!noTreeStyle &&
        [constants.AS_SIBLING, constants.AS_CHILD].map((dropAs) => (
          <TaskDropTarget
            style={{
              transform: `translateX(${
                levelInTree(item.id, originTask) * constants.SCAFFOLD_WIDTH + 30
              }px)`,
            }}
            itemType={itemType}
            expandToggle={() =>
              !fetchToggleCollapse(config.dragFrom, item.id) &&
              item.childTasks.length > 0 &&
              onExpandToggle(config.dragFrom, item.id, true)()
            }
            key={dropAs}
            dropAs={dropAs}
            targetPath={getPath(item.id)}
            onDrop={onDropItem}
            somethingIsDragging={getDragState().isDragging}
          />
        ))}
    </div>
  );
}

ListItem.propTypes = {
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
  constants.ITEM_TYPES.TASK,
  cardSource,
  collect
)(ListItem);
