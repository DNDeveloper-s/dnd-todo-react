import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";
import labelReducer from "../features/labelSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    label: labelReducer
  }
});

export default store;
