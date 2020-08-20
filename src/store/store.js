import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";

const store = configureStore({
  reducer: {
    task: taskReducer
  }
});

export default store;
