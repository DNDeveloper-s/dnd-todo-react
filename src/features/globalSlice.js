import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../helpers/constants";
import moment from "moment";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    toggleCollapse: {
      ["main-task-1"]: true,
    },
    minute: "",
  },
  reducers: {
    UPDATE_TOGGLE_COLLAPSE: (state, action) => {
      const { dragFrom, taskId, expanded } = action.payload;
      state.toggleCollapse[dragFrom + constants.SEPARATOR + taskId] = expanded;
    },
    SET_MINUTE: (state, action) => {
      state.minute = moment().get().toISOString();
    },
  },
});

export const { SET_MINUTE, UPDATE_TOGGLE_COLLAPSE } = globalSlice.actions;

export const getGlobalState = (store) => store.global;

const globalReducer = globalSlice.reducer;

export default globalReducer;
