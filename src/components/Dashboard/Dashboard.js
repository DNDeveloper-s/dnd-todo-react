import React, {useState} from "react";
import SideBar from "./SideBar/SideBar";
import DashboardHeader from "./DashboardHeader";
import AddTask from "./Task/AddTask";
import DetailsBar from "./DetailsBar/DetailsBar";
import taskData from "./Task/taskData";
import TaskColumn from "./Task/TaskColumn";
import {DragDropContext} from "react-beautiful-dnd";

// Components Imports

// Images Imports

const Dashboard = (props) => {
  const [data, setData] = useState(taskData);
  const columns = data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

    return <TaskColumn key={columnId} column={column} tasks={tasks}/>
  });

  function onDragEnd(result) {
    console.log('[Dashboard.js || Line no. 24 ....]', result);
    const {destination, source, draggableId} = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      };

      setData(newData);
      return;
    }

    // Moving Items from one column to other
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };

    setData(newData);

  }

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-main dashboard_wrapper">
        <DashboardHeader/>
        <AddTask/>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns}
        </DragDropContext>
      </div>
      <DetailsBar />
    </div>
  );
};

export default Dashboard;
