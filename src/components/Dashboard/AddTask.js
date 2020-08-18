import React from 'react';
import DoubleAddIcon from "../../icons/DoubleAddIcon";
import RgbCalendarIcon from "../../icons/RgbCalendarIcon";
import CaretDownFillIcon from "../../icons/CaretDownFillIcon";

// Components Imports


// Images Imports

const AddTask = (props) => {

    return (
        <div className="add_task">
          <div className="add_task-icon fill">
            <DoubleAddIcon/>
          </div>
          <div className="add_task-input">
            <input type="text" placeholder="Add Task here..."/>
          </div>
          <div className="add_task-icon">
            <RgbCalendarIcon/>
          </div>
          <div className="vertical_separator" />
          <div className="add_task-icon fill caret">
            <CaretDownFillIcon/>
          </div>
        </div>
    );
};

export default AddTask;
