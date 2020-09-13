import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { constants } from "../../../../helpers/constants";

// TODO: Refactor this ugly repeat

function canDropFn(targetPath, monitor) {
  // You can disallow drop based on props or item
  const item = monitor.getItem();
  // console.log(props.targetPath, item);
  if (!targetPath) {
    return true;
  }
  return !targetPath.includes(item.id);
  // return canMakeChessMove(item.fromPosition, props.position)
}

function dropFn(onDrop, dropAs, monitor) {
  if (monitor.didDrop()) {
    // If you want, you can check whether some nested
    // target already handled drop
    return;
  }

  // Obtain the dragged item
  const item = monitor.getItem();

  // You can do something with it
  onDrop(item, dropAs);

  // You can also do nothing and return a drop result,
  // which will be available as monitor.getDropResult()
  // in the drag source's endDrag() method
  return { moved: true };
}

function collect(monitor) {
  return {
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

const TaskDropTarget = ({
  itemType,
  somethingIsDragging,
  expandToggle,
  onDrop,
  style,
  targetPath,
  dropAs,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemType,
    canDrop: (draggedObject, monitor) => canDropFn(targetPath, monitor),
    drop: (draggedObject, monitor) => dropFn(onDrop, dropAs, monitor),
    collect: collect,
  });

  useEffect(() => {
    if (isOver && canDrop) {
      expandToggle && expandToggle();
    }
  }, [isOver, canDrop]);

  return (
    <div
      ref={drop}
      {...{ style }}
      className={[
        "dnd_list-item-drop--" + dropAs,
        isOver && canDrop ? "visible" : "",
        somethingIsDragging ? "dragging" : "",
      ].join(" ")}
    />
  );
};

export default TaskDropTarget;
