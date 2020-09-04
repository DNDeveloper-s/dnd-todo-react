import React, {useEffect, useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import CheckListColumn from "./CheckListColumn";
import {useDispatch} from "react-redux";
import {UPDATE_TASK} from "../../../../features/taskSlice";
import {v4 as uuidV4} from 'uuid';
import useTasks from "../../../../hooks/useTasks";
import produce from "immer";

const CheckList = ({task}) => {
  const dispatch = useDispatch();
  const [focusedItem, setFocusedItem] = useState(null);
  const [taskItems, setTaskItems] = useState(task.items);
  const { updateTask } = useTasks();

  useEffect(() => {
    setTaskItems(task.items);
  }, [task.items]);

  function onDragEnd(result) {
    const { destination, source} = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newTaskItems = [...task.items];
    const taskItem = newTaskItems[source.index];
    newTaskItems.splice(source.index, 1);
    newTaskItems.splice(destination.index, 0, taskItem)

    setTaskItems(newTaskItems);

    dispatch(UPDATE_TASK({
      taskId: task.id,
      items: newTaskItems
    }));

  }

  function handleReturn(taskItem) {
    const itemIndex = task.items.findIndex(item => item.id === taskItem.id);
    const newItems = [...task.items];
    newItems.splice(itemIndex + 1, 0, {
      id: uuidV4(),
      content: '',
      status: 0,
    })
    dispatch(UPDATE_TASK({
      taskId: task.id,
      items: newItems
    }));
    setFocusedItem(newItems[itemIndex + 1]);
  }

  function handleBackspace(taskItem) {
    const itemIndex = task.items.findIndex(item => item.id === taskItem.id);
    const newItems = [...task.items];
    newItems.splice(itemIndex, 1);
    dispatch(UPDATE_TASK({
      taskId: task.id,
      items: newItems
    }));
    setFocusedItem(newItems[itemIndex - 1]);
  }

  function onToggleCheckbox(isActive, itemId) {
    const taskItems = produce(task.items, draftItems => {
      const curItem = draftItems.find(item => item.id === itemId);
      const curItemIndex = draftItems.findIndex(item => item.id === itemId);
      curItem.status = isActive ? 1 : 0;
      if(isActive) {
        curItem.prevInd = curItemIndex;
        draftItems.splice(curItemIndex, 1);
        draftItems.push(curItem);
      } else {
        draftItems.splice(curItemIndex, 1);
        draftItems.splice(curItem.prevInd, 0, curItem);
        curItem.prevInd = null;
      }
    })
    console.log(itemId, taskItems);
    updateTask({
      taskId: task.id,
      items: taskItems
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CheckListColumn
        focusedItem={focusedItem}
        column={{id: `${task.id}_checklist`}}
        tasks={taskItems}
        handleReturn={handleReturn}
        handleBackspace={handleBackspace}
        onToggleCheckbox={onToggleCheckbox}
      />
    </DragDropContext>
  );
};

export default CheckList;
