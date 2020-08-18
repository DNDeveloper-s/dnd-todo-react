import React, { useState } from "react";
import "./CalendarPicker.css";
import CalendarPickerHeader from "./CalendarPickerHeader";
import CalendarPickerMain from "./CalendarPickerMain";

// Components Imports
import { getToday } from "./helpers";
import CalendarPickerFooter from "./CalendarPickerFooter";

// Images Imports

const CalendarPicker = () => {
  const [month, setMonth] = useState(getToday().month);
  const [year, setYear] = useState(getToday().year);
  const [yearMode, setYearMode] = useState(false);
  const [time, setTime] = useState("");

  return (
    <div className="dnd_calendar">
      <CalendarPickerHeader
        curMonth={month}
        curYear={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
        onYearModeChange={setYearMode}
        {...{ yearMode }}
      />
      <CalendarPickerMain
        curMonth={month}
        curYear={year}
        {...{ yearMode }}
        onMonthChange={setMonth}
        onYearModeChange={setYearMode}
      />
      <CalendarPickerFooter onTimeChange={setTime} />
    </div>
  );
};

export default CalendarPicker;
