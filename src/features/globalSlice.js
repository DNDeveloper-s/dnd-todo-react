import {createSlice} from "@reduxjs/toolkit";
import {constants} from "../helpers/constants";

const globalSlice = createSlice({
	name: "global",
	initialState: {
		toggleCollapse: {
			['main-task-1']: true,
			['detail/task-2']: false,
		}
	},
	reducers: {
		UPDATE_TOGGLE_COLLAPSE: (state, action) => {
			const { dragFrom, taskId, expanded } = action.payload;
			state.toggleCollapse[dragFrom + constants.SEPARATOR + taskId] = expanded;
		}
	}
});

export const {
	UPDATE_TOGGLE_COLLAPSE
} = globalSlice.actions;

export const getGlobalState = store => store.global;

const globalReducer = globalSlice.reducer;

export default globalReducer;