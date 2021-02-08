import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    users: {}
  },
  reducers: {
    UPDATE_USER_STATUS: (state, action) => {
      const {userId, status} = action.payload;
      if(state.users[userId]) {
        state.users[userId].status = status;
      }
    },
    LOAD_SUBSCRIBERS: (state, action) => {
      const {users} = action.payload;
      users.forEach(userData => {
        state.users[userData.user._id] = {status: userData.user.status};
      });
    }
  },
});

export const { LOAD_SUBSCRIBERS, UPDATE_USER_STATUS } = socketSlice.actions;

export const getSocketState = (store) => {
  return store.socket;
};
export const getUserStatus = (store) => store.socket.users;

const globalReducer = socketSlice.reducer;

export default globalReducer;
