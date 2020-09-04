// import taskData from "../store/taskData";
const taskData = {
  tasks: {
    'task-1': {id: 'task-1', columnId: 'column-1', content: 'This is my first task. Be Gentle', subTasks: ['task-4', 'task-5', 'task-6']},
    'task-2': {id: 'task-2', columnId: 'column-1', content: 'This is my second task. Never mind', subTasks: ['task-7', 'task-8', 'task-9']},
    'task-3': {id: 'task-3', columnId: 'column-1', content: 'This is my third task. I am improving', subTasks: ['task-10', 'task-11', 'task-12']},
    'task-4': {id: 'task-4', columnId: 'column-2', content: 'This is my forth task. I feel confident now', parentTask: 'task-1', subTasks: []},
    'task-5': {id: 'task-5', columnId: 'column-2', content: 'This is my fifth task. I can control this anyhow', parentTask: 'task-1', subTasks: []},
    'task-6': {id: 'task-6', columnId: 'column-2', content: 'This is my sixth task, i guess. But does\'t matter now', parentTask: 'task-1', subTasks: []},
    'task-7': {id: 'task-7', columnId: 'column-3', content: 'This is my forth tasks. I feel confident now', parentTask: 'task-2', subTasks: []},
    'task-8': {id: 'task-8', columnId: 'column-3', content: 'This is my fifth tasks. I can control this anyhow', parentTask: 'task-2', subTasks: []},
    'task-9': {id: 'task-9', columnId: 'column-3', content: 'This is my sixth tasks, i guess. But does\'t matter now', parentTask: 'task-2', subTasks: []},
    'task-10': {id: 'task-10', columnId: 'column-4', content: 'This is my first tasks. Be Gentle', parentTask: 'task-3', subTasks: []},
    'task-11': {id: 'task-11', columnId: 'column-4', content: 'This is my second tasks. Never mind', parentTask: 'task-3', subTasks: []},
    'task-12': {id: 'task-12', columnId: 'column-4', content: 'This is my third tasks. I am improving', parentTask: 'task-3', subTasks: []},
    'task-13': {id: 'task-13', columnId: 'column-5', content: 'This is my first tasks. Be Gentle', subTasks: []},
    'task-14': {id: 'task-14', columnId: 'column-5', content: 'This is my second tasks. Never mind', subTasks: []},
    'task-15': {id: 'task-15', columnId: 'column-5', content: 'This is my third tasks. I am improving', subTasks: []},
  },
}

const treeData = [
  {
    id: "task-1",
    title: "[task-1] This is my first task. Be Gentle",
    children: [
      {
        id: "task-4",
        title: "[task-4] This is my forth task. I feel conident now",
        children: []
      },
      {
        id: "task-5",
        title: "[task-5] This is my fifth task. I can control this anyhow",
        children: []
      },
      {
        id: "task-6",
        title: "[task-6] This is my sixth task, i guess. But does't matter now",
        children: []
      }
    ]
  },
  {
    id: "task-2",
    title: "[task-2] This is my second task. Never mind",
    children: [
      {
        id: "task-7",
        title: "[task-7] This is my forth tasks. I feel conident now",
        children: []
      },
      {
        id: "task-8",
        title: "[task-8] This is my fifth tasks. I can control this anyhow",
        children: []
      },
      {
        id: "task-9",
        title: "[task-9] This is my sixth tasks, i guess. But does't matter now",
        children: []
      }
    ]
  },
  {
    id: "task-3",
    title: "[task-3] This is my third task. I am improving",
    children: [
      {
        id: "task-10",
        title: "[task-10] This is my first tasks. Be Gentle",
        children: []
      },
      {
        id: "task-11",
        title: "[task-11] This is my second tasks. Never mind",
        children: []
      },
      {
        id: "task-12",
        title: "[task-12] This is my third tasks. I am improving",
        children: []
      }
    ]
  },
  {
    id: "task-13",
    title: "[task-13] This is my first tasks. Be Gentle",
    children: []
  },
  {
    id: "task-14",
    title: "[task-14] This is my second tasks. Never mind",
    children: []
  },
  {
    id: "task-15",
    title: "[task-15] This is my third tasks. I am improving",
    children: []
  }
];

function parseChild(tree, task) {
  const rescuedTasks = task.children;
  const newChildren = task.children.map(subTask => subTask.id);
  const parsedRescuedTasks = {
    [task.id]: {
      ...task,
      subTasks: newChildren,
      children: undefined
    }
  };
  rescuedTasks.forEach(rescuedTask => {
    parsedRescuedTasks[rescuedTask.id] = rescuedTask;
    if(rescuedTask.id === task.id) {
      parsedRescuedTasks.subTasks = newChildren;
    }
  });
  return parsedRescuedTasks;
}

function parseTreeData() {
  const taskOrder = treeData.map(task => task.id);
  const tasks = parseChild(treeData, treeData[0]);

  return {taskOrder, tasks};
}

function constructTreeData() {
  const {tasks} = taskData;

  // Construct all Higher level tasks
  const allTaskIds = Object.keys(taskData.tasks);
  const higherLvlTaskIds = [];
  allTaskIds.forEach(taskId => {
    if(!Boolean(tasks[taskId].parentTask)) {
      // Here I will use some api to prevent duplicates
      higherLvlTaskIds.push(taskId);
    }
  });
  return higherLvlTaskIds.map(taskId => {
    return populateChild(tasks, taskId);
  })

}

function populateChild(tasks, taskId) {
  const curTask = tasks[taskId];
  const filledSubTasks = curTask.subTasks.map(taskId => populateChild(tasks, taskId));

  return {
    id: curTask.id,
    title: curTask.content,
    children: filledSubTasks
  };
}

console.log('[constructTreeData.js || Line no. 26 ....]', parseTreeData().tasks['task-1']);
