import React from "react";
import { DropTarget } from "react-dnd";
import { constants } from "../../../../helpers/constants";
import { classNames } from "../../../../helpers/utils";
import PropTypes from "prop-types";

const SiblingDrop = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    // console.log(props.targetPath, item);
    return true;
    // return canMakeChessMove(item.fromPosition, props.position)
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    // You can do something with it
    props.onDrop(item);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

/**
 *
 * @param isOver {Boolean}
 * @param onDrop {Function} - Will be called when a dragged item is dropped on the target of the specified task
 * @param canDrop {Boolean}
 * @param connectDropTarget {Function}
 * @returns {React.Component}
 * @constructor
 */

const DropTargetForTask = ({ isOver, onDrop, canDrop, connectDropTarget }) => {
  return connectDropTarget(
    <div className={classNames("dnd_list--drop_target", { isOver })}>
      <p>Done? Feel free to drop here to check it as completed.</p>
    </div>
  );
};

DropTarget.propTypes = {
  onDrop: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  connectDropTarget: PropTypes.func,
};

export default DropTarget(
  constants.ITEM_TYPES.TASK,
  SiblingDrop,
  collect
)(DropTargetForTask);
