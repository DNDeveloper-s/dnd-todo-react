import React, {useEffect} from 'react';
import { DropTarget } from 'react-dnd';
import {constants} from "../../../../helpers/constants";

const SiblingDrop = {
    canDrop(props, monitor) {
        // You can disallow drop based on props or item
        const item = monitor.getItem();
        // console.log(props.targetPath, item);
        return !props.targetPath.includes(item.id);
        // return canMakeChessMove(item.fromPosition, props.position)
    },

    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return
        }


        // Obtain the dragged item
        const item = monitor.getItem()

        // You can do something with it
        props.onDrop(item);


        // You can also do nothing and return a drop result,
        // which will be available as monitor.getDropResult()
        // in the drag source's endDrag() method
        return { moved: true }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}

const SiblingDropTarget = ({isOver, canDrop, somethingIsDragging, expandToggle, connectDropTarget, style}) => {

    useEffect(() => {
        if(isOver && canDrop) {
            expandToggle();
        }
    }, [isOver, canDrop]);

    return (
        connectDropTarget(
            <div {...{style}} className={["dnd_list-item-drop--sibling", isOver && canDrop ? 'visible' : '', somethingIsDragging ? 'dragging' : ''].join(" ")} />
        )
    )
}

export default DropTarget(constants.ITEM_TYPES.TASK, SiblingDrop, collect)(SiblingDropTarget);