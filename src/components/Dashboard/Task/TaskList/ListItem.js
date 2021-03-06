import React, { useRef } from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import moment from 'moment';
import {ObjectID} from 'bson';
import { withRouter } from "react-router";
import { constants } from "../../../../helpers/constants";
import TaskDropTarget from "./TaskDropTarget";
import useDropUtils from "../../../../hooks/useDropUtils";
import TaskInput from "./TaskInput";
import TaskLabel from "./TaskLabel";
import useTreeDataUtils from "../../../../hooks/useTreeDataUtils";
import CaretDownIcon from "../../../../icons/CaretDownIcon";
import CheckBox from "../../../UI/CheckBox/CheckBox";
import MoveIcon from "../../../../icons/MoveIcon";
import useProjects from "../../../../hooks/useProjects";
import useGlobalState from "../../../../hooks/useGlobalState";
import useTasks from "../../../../hooks/useTasks";
import ReminderIcon from "../../../../icons/ReminderIcon";
import {
  classNames, convertRemindersToTriggers,
  getCommonFormatDate,
  isDueOver,
} from "../../../../helpers/utils";
import ListItemContextMenu from "./ListItemContextMenu";

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
  filters,
  index,
  item,
  config = {},
  onTitleClick,
  onTitleBlur,
  originTask,
  elementStyle,
  baseTaskIdsArr,
  expandBtnStyle,
  handleStyle,
  bgStyle,
  focusId,
  setFocusId,
  ...otherProps
}) {
  const contextRef = useRef(null);
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
      tab: droppedItem.tab,
    });
  }

  function onToggleCheckBox(isActive) {
    console.log('[ListItem.js || Line no. 125 ....]', item);
    updateStatus(item.id, isActive);
  }

  /**
   * @description Handling the Return on the input element
   * @param taskId {String}
   * @param as {String}
   */
  function handleReturn(taskId, as) {
    const newTaskId = new ObjectID().toString();

    // id: taskId.toString(),
    //   content: taskContent,
    //   labelIds,
    //   projectId,
    //   priority: priority.ind,
    //   startDate,
    //   createdAt: moment().toISOString(),
    //   reminders: convertRemindersToTriggers(dateData?.reminders),
    //   isFullDay,
    //   status: {completed: false},
    // deleted: 0,
    //   temporary: true
    createTask({
      id: newTaskId,
      content: "",
      labelIds: [],
      projectId: curTask(taskId).projectId,
      priority: 0,
      createType: {
        path: getPath(taskId),
        as,
      },
      createdAt: moment().toISOString(),
      deleted: 0,
      status: {completed: false},
      isFullDay: false,
      temporary: true,
    });
    // Focusing the newly created task
    setFocusId(newTaskId);

    // Navigating to the newly created task,
    // but only if the action is happening in the main area
    // i.e, dragFrom = main
    if (config.dragFrom === constants.DRAG_FROM.MAIN)
      otherProps.history.push(otherProps.match.url + "/" + newTaskId);

    // If task has been added as child
    // then expanding the parent task
    if (as === constants.AS_CHILD)
      onExpandToggle(config.dragFrom, item.id, true)(true);
  }

  /**
   * @description Handling the backspace on the input element when the input field is empty
   * @param taskId {String}
   */
  function handleBackspace(taskId) {
    // Fetching the previous item in the expanded tree,
    // so that we can focus the last item
    const prevItemId = getPrevItemInExpandedTree(
      taskId,
      config.dragFrom,
      originTask
    );
    deleteTask(taskId);
    // Focusing the prev item in teh expanded tree
    setFocusId(prevItemId);

    // Navigating to the prevTask
    // but only if the action is happening in the main area
    // i.e, dragFrom = main
    if (config.dragFrom === constants.DRAG_FROM.MAIN)
      otherProps.history.push(otherProps.match.url + "/" + prevItemId);
  }

  return (
    <>
      {connectDragPreview(
        <div
          ref={contextRef}
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
                    levelInTree(item.id, originTask, false, baseTaskIdsArr) * constants.SCAFFOLD_WIDTH
                  }px`,
              ...elementStyle,
            }}
          >
            <div className="dnd_list-item-element-bg" style={bgStyle} />
            {hasChildTasks(item.id, filters) && !noTreeStyle && (
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
              priority={curTask(item.id).priority}
              initialValue={curTask(item.id).status.completed}
              onChange={onToggleCheckBox}
            />
            {connectDragSource(
              <div
                className="dnd_list-item-element--handle"
                style={handleStyle}
              >
                <MoveIcon fill="#ddd" />
              </div>
            )}
            <TaskInput
              handleShiftReturn={(args) =>
                handleReturn(args, constants.AS_CHILD)
              }
              handleReturn={(args) => handleReturn(args, constants.AS_SIBLING)}
              handleBackspace={handleBackspace}
              onClick={onTitleClick}
              task={item}
              focusIt={focusId === item.id}
              disabled={item.status.completed}
              onBlur={(e) => onTitleBlur(item.id, e)}
            />
            <div className="dnd_list-item-element--group">
              {item.labelIds.map((labelId) => (
                <TaskLabel key={labelId} labelId={labelId} />
              ))}
            </div>
            {/*Rendering this only when projectId is present*/}
            {item.projectId && (
              <div className="dnd_list-item-element--group">
                <div className="dnd_list-item-element--project">
                  <div
                    className="dnd_list-item-element--project--highlighter"
                    style={{
                      backgroundColor: curProject(item.projectId).color,
                    }}
                  />
                  <p>{curProject(item.projectId).content}</p>
                </div>
              </div>
            )}
            {/*Rendering this only when reminder is present*/}
            {item.reminders && item.reminders.length > 0 && (
              <div className="dnd_list-item-element--group">
                <ReminderIcon style={{ zoom: 0.8 }} fill="#c7c7c7" />
              </div>
            )}
            {/*Rendering this only when startDate is present*/}
            {item.startDate && (
              <div className="dnd_list-item-element--group">
                <div
                  className={classNames("dnd_list-item-element--time", {
                    dueOver: isDueOver(item.startDate, item.isFullDay),
                  })}
                >
                  <p>
                    {getCommonFormatDate(
                      item.startDate,
                      {
                        lastWeek: "MMM D",
                        nextWeek: "ddd",
                        sameElse: "MMM D",
                      },
                      item.isFullDay
                    )}
                  </p>
                </div>
              </div>
            )}
            <span className="dnd_list-item-element--line" />
            <span className="dnd_list-item-element--line" style={{
              transition: 'backgroundColor .15s ease-in-out, transform .4s ease-out',
              transform: `scaleX(${curTask(item.id).temporary ? '1' : '0'})`,
              transformOrigin: 'right',
              right: 0,
              backgroundColor: '#ff9797db'
            }} />
          </div>
          {!noTreeStyle &&
            [constants.AS_SIBLING, constants.AS_CHILD].map((dropAs) => (
              <TaskDropTarget
                style={{
                  transform: `translateX(${
                    levelInTree(item.id, originTask, false, baseTaskIdsArr) *
                      constants.SCAFFOLD_WIDTH +
                    30
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
      )}
      {contextRef && (
        <ListItemContextMenu item={item} listenerRef={contextRef} />
      )}
    </>
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
export default withRouter(
  DragSource(constants.ITEM_TYPES.TASK, cardSource, collect)(ListItem)
);
