import {colors} from "../components/ColorPicker/helpers/colors";

const taskData = {
  tasks: {
    'task-1': {id: 'task-1', columnId: 'column-1', content: 'This is my first task. Be Gentle', subTasks: ['task-4', 'task-5', 'task-6']},
    'task-2': {id: 'task-2', columnId: 'column-1', content: 'This is my second task. Never mind', subTasks: ['task-7', 'task-8', 'task-9']},
    'task-3': {id: 'task-3', columnId: 'column-1', content: 'This is my third task. I am improving', subTasks: ['task-10', 'task-11', 'task-12']},
    'task-4': {id: 'task-4', columnId: 'column-2', content: 'This is my forth task. I feel confident now', subTasks: []},
    'task-5': {id: 'task-5', columnId: 'column-2', content: 'This is my fifth task. I can control this anyhow', subTasks: []},
    'task-6': {id: 'task-6', columnId: 'column-2', content: 'This is my sixth task, i guess. But does\'t matter now', subTasks: []},
    'task-7': {id: 'task-7', columnId: 'column-3', content: 'This is my forth tasks. I feel confident now', subTasks: []},
    'task-8': {id: 'task-8', columnId: 'column-3', content: 'This is my fifth tasks. I can control this anyhow', subTasks: []},
    'task-9': {id: 'task-9', columnId: 'column-3', content: 'This is my sixth tasks, i guess. But does\'t matter now', subTasks: []},
    'task-10': {id: 'task-10', columnId: 'column-4', content: 'This is my first tasks. Be Gentle', subTasks: []},
    'task-11': {id: 'task-11', columnId: 'column-4', content: 'This is my second tasks. Never mind', subTasks: []},
    'task-12': {id: 'task-12', columnId: 'column-4', content: 'This is my third tasks. I am improving', subTasks: []},
    'task-13': {id: 'task-13', columnId: 'column-5', content: 'This is my first tasks. Be Gentle', subTasks: []},
    'task-14': {id: 'task-14', columnId: 'column-5', content: 'This is my second tasks. Never mind', subTasks: []},
    'task-15': {id: 'task-15', columnId: 'column-5', content: 'This is my third tasks. I am improving', subTasks: []},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Today',
      taskIds: ['task-1', 'task-2', 'task-3'],
      color: colors[0].value
    },
    'column-2': {
      id: 'column-2',
      title: 'Thursday',
      taskIds: ['task-4', 'task-5', 'task-6'],
      color: colors[7].value
    },
    'column-3': {
      id: 'column-3',
      title: 'Friday',
      taskIds: ['task-7', 'task-8', 'task-9'],
      color: colors[3].value
    },
    'column-4': {
      id: 'column-4',
      title: 'Friday',
      taskIds: ['task-10', 'task-11', 'task-12'],
      color: colors[8].value
    },
    'column-5': {
      id: 'column-5',
      title: 'Friday',
      taskIds: ['task-13', 'task-14', 'task-15'],
      color: colors[12].value
    }
  },
  // Facilitate reordering the column
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5']
};

export default taskData;
