import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";
import labelReducer from "../features/labelSlice";
import projectReducer from "../features/projectSlice";
import globalReducer from "../features/globalSlice";

const store = configureStore({
  reducer: {
    label: labelReducer,
    project: projectReducer,
    task: taskReducer,
    global: globalReducer
  },
});

export default store;
