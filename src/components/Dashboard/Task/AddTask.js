import React from 'react';
import DoubleAddIcon from "../../../icons/DoubleAddIcon";
import CaretDownFillIcon from "../../../icons/CaretDownFillIcon";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import {getToday} from "../../CalendarPicker/helpers";

// Components Imports


// Images Imports

const AddTask = () => {

    return (
        <div className="add_task">
          <div className="add_task-icon fill">
            <DoubleAddIcon/>
          </div>
          <div className="add_task-input">
            <input type="text" placeholder="Add Task here..."/>
          </div>
          <div className="add_task-icon">
            <CalendarWithDate date={getToday().day}/>
          </div>
          <div className="vertical_separator" />
          <div className="add_task-icon fill caret">
            <CaretDownFillIcon/>
          </div>
        </div>
    );
};

export default AddTask;
