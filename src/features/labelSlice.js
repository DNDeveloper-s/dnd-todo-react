import {createSlice} from "@reduxjs/toolkit";
import {colors} from "../components/ColorPicker/helpers/colors";

export const labelSlice = createSlice({
  name: 'label',
  initialState: {
    labels: {
      data: {
        'label-1': {id: 'label-1', icon: 'LabelIcon', color: colors[0].value, content: '5 minutes'},
        'label-2': {id: 'label-2', icon: 'LabelIcon', color: colors[1].value, content: 'Daily basis'},
        'label-3': {id: 'label-3', icon: 'LabelIcon', color: colors[2].value, content: 'Work'},
        'label-4': {id: 'label-4', icon: 'LabelIcon', color: colors[3].value, content: 'Upcoming'},
        'label-5': {id: 'label-5', icon: 'LabelIcon', color: colors[4].value, content: 'Logical'},
        'label-6': {id: 'label-6', icon: 'LabelIcon', color: colors[5].value, content: 'Free Tier'},
      },
      entities: ['label-1', 'label-2', 'label-3', 'label-4', 'label-5', 'label-6']
    }
  },
  reducers: {
    CREATE_LABEL: (state, action) => {

    }
  }
});

export const {CREATE_LABEL} = labelSlice.actions;

// Selectors
export const getAllLabels = store => store.label.labels;

const labelReducer = labelSlice.reducer;

export default labelReducer;
