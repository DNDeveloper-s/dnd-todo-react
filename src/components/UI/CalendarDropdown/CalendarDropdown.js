import React from 'react';
import CalendarWithDate from "../CalendarWithDate/CalendarWithDate";
import CalendarPicker from "../../CalendarPicker/CalendarPicker";
import Dropdown from "../Dropdown/Dropdown";

const CalendarDropdown = ({initialDate: date, onDateChange}) => {
  // Props
  // Get the initialDate

  return (
    <Dropdown
      handle={
        <CalendarWithDate
          dueOver={date.dueOver}
          date={date.rawData.data.monthDay}
        />
      }
      ItemComponent={() => {
        return (
          <CalendarPicker initialDate={date} onDateChange={onDateChange} />
        );
      }}
    />
  );
};

export default CalendarDropdown;
