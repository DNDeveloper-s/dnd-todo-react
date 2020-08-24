import React, {useEffect, useState} from "react";
import "./CalendarPicker.css";
import CalendarPickerHeader from "./CalendarPickerHeader";
import CalendarPickerMain from "./CalendarPickerMain";

// Components Imports
import { getToday } from "./helpers";
import CalendarPickerFooter from "./CalendarPickerFooter";

// Images Imports

const CalendarPicker = ({initialDate, onDateChange}) => {
  console.log('[CalendarPicker.js || Line no. 13 ....]', initialDate);
  const [month, setMonth] = useState(initialDate.rawData.data.month);
  const [year, setYear] = useState(initialDate.rawData.data.year);
  const [yearMode, setYearMode] = useState(false);
  const [time, setTime] = useState("");
  const [activeDate, setActiveDate] = useState({
    day: initialDate.rawData.data.monthDay,
    month: initialDate.rawData.data.month
  });

  useEffect(() => {
    console.log('[CalendarPicker.js || Line no. 19 ....]', time);
  }, [time]);

  function onDateClick(e) {
    setActiveDate({
      day: e.rawData.data.monthDay,
      month: e.rawData.data.month
    });
    onDateChange(e);
  }

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
        {...{ yearMode, activeDate }}
        onMonthChange={setMonth}
        onYearModeChange={setYearMode}
        onDateChange={onDateClick}
      />
      <CalendarPickerFooter onTimeChange={setTime} />
    </div>
  );
};

export default CalendarPicker;
