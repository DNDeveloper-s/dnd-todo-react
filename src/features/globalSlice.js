import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../helpers/constants";
import moment from "moment";
import {isDefined} from "../helpers/utils";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    toggleCollapse: {},
    minute: "",
    notifications: []
  },
  reducers: {
    UPDATE_TOGGLE_COLLAPSE: (state, action) => {
      const { dragFrom, taskId, expanded } = action.payload;
      state.toggleCollapse[dragFrom + constants.SEPARATOR + taskId] = expanded;
    },
    SET_MINUTE: (state, action) => {
      state.minute = moment().get().toISOString();
    },
    LOAD_GLOBAL_DATA: (state, action) => {
      state.toggleCollapse = isDefined(action.payload.toggleCollapse) ? action.payload.toggleCollapse : {};
    },
    LOAD_NOTIFICATIONS: (state, action) => {
      state.notifications = action.payload;
    }
  },
});

export const { LOAD_GLOBAL_DATA, LOAD_NOTIFICATIONS, SET_MINUTE, UPDATE_TOGGLE_COLLAPSE } = globalSlice.actions;

export const getGlobalState = (store) => store.global;

const globalReducer = globalSlice.reducer;

export default globalReducer;
