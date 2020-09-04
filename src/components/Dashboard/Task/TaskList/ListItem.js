import React from "react";
import { DragSource } from "react-dnd";
import PropTypes from 'prop-types';
import {constants} from "../../../../helpers/constants";
import SiblingDropTarget from "./SiblingDropTarget";
import ChildDropTarget from "./ChildDropTarget";
import useDropUtils from "../../../../hooks/useDropUtils";
import TaskInput from "./TaskInput";
import TaskLabel from "./TaskLabel";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import {classNames, isDefined} from "../../../../helpers/utils";
import CaretDownIcon from "../../../../icons/CaretDownIcon";
import CheckBox from "../../../UI/CheckBox/CheckBox";
import MoveIcon from "../../../../icons/MoveIcon";
import useProjects from "../../../../hooks/useProjects";
import useGlobalState from "../../../../hooks/useGlobalState";

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag({item, config, startsDragging}) {
    // Return the data describing the dragged item
    const draggedItem = { type: constants.ITEM_TYPES.TASK, id: item.id, dragFrom: config.dragFrom };
    startsDragging({
      isDragging: true,
      dragItem: draggedItem
    });
    console.log(draggedItem);
    return draggedItem;
  },

  endDrag({startsDragging}, monitor, component) {
    startsDragging({
      isDragging: false,
      dragItem: null
    });
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
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
  index,
  item,
  config = {},
  onTitleClick,
  ...otherProps
}) {
  const { onDropItem } = useDropUtils();
  const {curProject} = useProjects();
  const {fetchToggleCollapse} = useGlobalState();
  const {
    completeTask,
    inCompleteTask,
    onExpandToggle,
    getPath,
    hasChildTasks,
    levelInTree,
    getDragState
  } = useTreeDataUtils();
  const { noTreeStyle } = config;

  const {
    connectDragSource,
    connectDragPreview,
  } = otherProps;

  function onDropAsSibling(droppedItem) {
    onDropItem({
      draggedId: droppedItem.id,
      droppedId: item.id,
      dropAsType: constants.DROP_AS_SIBLING,
      dragFrom: droppedItem.dragFrom
    });
  }

  function onDropAsChild(droppedItem) {
    onDropItem({
      draggedId: droppedItem.id,
      droppedId: item.id,
      dropAsType: constants.DROP_AS_CHILD,
      dragFrom: droppedItem.dragFrom
    });
  }

  function onToggleCheckBox(isActive) {
    if(isActive) {
      completeTask(item.id);
    } else
    if(isDefined(isActive) && !isActive) {
      inCompleteTask(item.id);
    }
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
        className="dnd_list-item-element"
        style={{
          marginLeft: noTreeStyle ? '0px' : `${levelInTree(item.id) * constants.SCAFFOLD_WIDTH}px`,
          transition: `.3s cubic-bezier(0,.86,.61,1.15)`,
        }}
      >
        <div className="dnd_list-item-element-bg" />
        {hasChildTasks(item.id) && !noTreeStyle && (
          <div
            className={classNames("dnd_list-item--toggle_child", {
              expanded: fetchToggleCollapse(config.dragFrom, item.id)
            })}
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
          initialValue={item.status.completed}
          onChange={onToggleCheckBox}
        />
        {connectDragSource(
          <div className="dnd_list-item-element--handle">
            <MoveIcon fill="#ddd" />
          </div>
        )}
        <TaskInput onClick={onTitleClick} task={item} />
        <div className="dnd_list-item-element--group">
          {item.labelIds.map(labelId => (
            <TaskLabel key={labelId} labelId={labelId} />
          ))}
        </div>
        <div className="dnd_list-item-element--group">
          <div className="dnd_list-item-element--project">
            <div className="dnd_list-item-element--project--highlighter"
              style={{
                backgroundColor: curProject(item.projectId || 'inbox').color
              }}
            />
            <p>{curProject(item.projectId || 'inbox').content}</p>
          </div>
        </div>
        <div className="dnd_list-item-element--group">
          <div className="dnd_list-item-element--time">
            <p>Tue</p>
          </div>
        </div>
        <span className="dnd_list-item-element--line" />
      </div>
      {
        !noTreeStyle && (
          <>
            <SiblingDropTarget
              style={{
                transform: `translate(${
                  levelInTree(item.id) * constants.SCAFFOLD_WIDTH + 30
                }px, ${
                  0
                }px)`,
              }}
              expandToggle={() =>
                !fetchToggleCollapse(config.dragFrom, item.id) &&
                item.childTasks.length > 0 &&
                onExpandToggle(config.dragFrom,  item.id,true)()
              }
              targetPath={getPath(item.id)}
              onDrop={onDropAsSibling}
              somethingIsDragging={getDragState().isDragging}
            />
            <ChildDropTarget
              style={{
                transform: `translateX(${
                  levelInTree(item.id) * constants.SCAFFOLD_WIDTH + 30
                }px)`,
              }}
              targetPath={getPath(item.id)}
              onDrop={onDropAsChild}
              somethingIsDragging={getDragState().isDragging}
            />
          </>
        )
      }
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
}

// Export the wrapped version
export default DragSource(constants.ITEM_TYPES.TASK, cardSource, collect)(ListItem);
