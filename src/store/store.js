import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";
import labelReducer from "../features/labelSlice";
import projectReducer from "../features/projectSlice";

const store = configureStore({
  reducer: {
    label: labelReducer,
    project: projectReducer,
    task: taskReducer,
  }
});

export default store;
