import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../components/ColorPicker/helpers/colors";
import { removeItemByIdInArray } from "../helpers/utils";

export const labelSlice = createSlice({
  name: "label",
  initialState: {
    labels: {
      data: {
        "label-1": {
          id: "label-1",
          type: "label",
          taskIds: [],
          icon: "LabelIcon",
          color: colors[0].value,
          content: "5 minutes",
        },
        "label-2": {
          id: "label-2",
          type: "label",
          taskIds: [],
          icon: "LabelIcon",
          color: colors[1].value,
          content: "Daily basis",
        },
        "label-3": {
          id: "label-3",
          type: "label",
          taskIds: [],
          icon: "LabelIcon",
          color: colors[2].value,
          content: "Work",
        },
        "label-4": {
          id: "label-4",
          type: "label",
          taskIds: [],
          icon: "LabelIcon",
          color: colors[3].value,
          content: "Upcoming",
        },
        "label-5": {
          id: "label-5",
          type: "label",
          taskIds: [],
          icon: "LabelIcon",
          color: colors[4].value,
          content: "Logical",
        },
        "label-6": {
          id: "label-6",
          type: "label",
          taskIds: [],
          icon: "LabelIcon",
          color: colors[5].value,
          content: "Free Tier",
        },
      },
      entities: [
        "label-1",
        "label-2",
        "label-3",
        "label-4",
        "label-5",
        "label-6",
      ],
    },
  },
  reducers: {
    CREATE_LABEL: (state, action) => {
      const { id, color, content, taskIds } = action.payload;
      state.labels.data[id] = {
        id,
        color,
        content,
        icon: "LabelIcon",
        taskIds: taskIds,
        type: "label",
      };
      state.labels.entities.push(id);
    },
    ADD_LABEL_TASK: (state, action) => {
      const { taskId, labelId } = action.payload;
      state.labels.data[labelId].taskIds.push(taskId);
    },
    REMOVE_LABEL_TASK: (state, action) => {
      const { taskId, labelId } = action.payload;
      state.labels.data[labelId].taskIds = removeItemByIdInArray(
        state.labels.data[labelId].taskIds,
        taskId
      );
    },
  },
});

export const {
  ADD_LABEL_TASK,
  CREATE_LABEL,
  REMOVE_LABEL_TASK,
} = labelSlice.actions;

// Selectors
// export const getAllLabels = (store) => store.label.labels;
export const getLabelState = (store) => store.label;

const labelReducer = labelSlice.reducer;

export default labelReducer;
