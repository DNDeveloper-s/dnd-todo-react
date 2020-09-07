import {createSlice} from "@reduxjs/toolkit";
import {constants} from "../helpers/constants";

const globalSlice = createSlice({
	name: "global",
	initialState: {
		toggleCollapse: {
			['main-task-1']: true,
			['detail/task-2']: false,
		},
		mouseInfo: {
			pos: {x: 0, y: 0}
		}
	},
	reducers: {
		UPDATE_TOGGLE_COLLAPSE: (state, action) => {
			const { dragFrom, taskId, expanded } = action.payload;
			state.toggleCollapse[dragFrom + constants.SEPARATOR + taskId] = expanded;
		},
		UPDATE_MOUSE_POS: (state, action) => {
			const {mousePos} = action.payload;
			state.mouseInfo.pos = mousePos;
		}
	}
});

export const {
	UPDATE_MOUSE_POS,
	UPDATE_TOGGLE_COLLAPSE
} = globalSlice.actions;

export const getGlobalState = store => store.global;

const globalReducer = globalSlice.reducer;

export default globalReducer;