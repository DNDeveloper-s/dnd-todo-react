import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import CheckListColumn from "./CheckListColumn";
import {useDispatch} from "react-redux";
import {UPDATE_TASK} from "../../../../features/taskSlice";
import {v4 as uuidV4} from 'uuid';

const CheckList = ({task}) => {
  const dispatch = useDispatch();
  const [focusedItem, setFocusedItem] = useState(null);
  const [taskItems, setTaskItems] = useState(task.items);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CheckListColumn
        focusedItem={focusedItem}
        column={{id: `${task.id}_checklist`}}
        tasks={taskItems}
        handleReturn={handleReturn}
        handleBackspace={handleBackspace}
      />
    </DragDropContext>
  );
};

export default CheckList;
