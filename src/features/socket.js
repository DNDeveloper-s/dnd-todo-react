import io from 'socket.io-client';
import {constants} from "../helpers/constants";
let socket;
export const initiateSocket = (token) => {
  socket = io(constants.BASE_URL + '?token=' + token);
  console.log(`Connecting socket...`);
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
};
export const subscribeToUserStatus = (cb) => {
  socket.on('user_status' , ({userId, status}) => {
    console.log('Websocket event subscribe to user received!');
    return cb(null, {userId, status});
  });
};
export const subscribeToCreateTask = (cb) => {
  socket.on('task_created' , ({projectId, taskId}) => {
    console.log('Websocket event subscribe to task create received!');
    return cb(null, {projectId, taskId});
  });
};
export const subscribeToTaskUpdate = (cb) => {
  socket.on('task_updated' , ({projectId, taskId}) => {
    console.log('Websocket event subscribe to task update received!');
    return cb(null, {projectId, taskId});
  });
};
export const subscribeToNotification = (cb) => {
  if (!socket) return true;
  socket.on('notification', ({message}) => {
    console.log('Websocket event received!');
    return cb(null, message);
  });
};
export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
};
