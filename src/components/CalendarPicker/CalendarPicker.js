import React, { useEffect, useState } from "react";
import "./CalendarPicker.scss";
import CalendarPickerHeader from "./CalendarPickerHeader";
import CalendarPickerMain from "./CalendarPickerMain";
import CalendarPickerFooter from "./CalendarPickerFooter";
import useMoment from "../../hooks/useMoment";
import { remindersWithShortTime, reminderWithLongTime } from "./helpers/data";
import { update } from "smooth-scrollbar/geometry";
import { isEqual } from "../../helpers/utils";

const CalendarPicker = ({
  activeDate,
  initialData,
  onModalClose,
  setActiveDate,
}) => {
  const { getMonth, getYear, moment } = useMoment();
  const [month, setMonth] = useState(
    getMonth(initialData?.date || new Date()) + 1
  );
  const [year, setYear] = useState(getYear(initialData?.date || new Date()));
  const [yearMode, setYearMode] = useState(false);
  const [time, setTime] = useState("");
  const [reminderList, setReminderList] = useState(reminderWithLongTime);
  const [reminders, setReminders] = useState([reminderList[0]]);
  const [repeatValue, setRepeatValue] = useState("None");

  useEffect(() => {
    if (Boolean(time)) {
      if (!activeDate) setActiveDate(moment().get().toISOString());
      if (isEqual(reminderList, reminderWithLongTime)) {
        setReminders([remindersWithShortTime[1]]);
      }
      setReminderList(remindersWithShortTime);
    }
  }, [activeDate, moment, reminderList, setActiveDate, time]);

  function onDateClick(e) {
    setActiveDate(e.date);
  }

  function handleClear() {
    onModalClose(null);
  }

  function handleOk() {
    onModalClose({
      date: activeDate,
      time,
      reminders,
    });
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
      <CalendarPickerFooter
        onTimeChange={setTime}
        onReminderChange={setReminders}
        onRepeatChange={setRepeatValue}
        reminders={reminders}
        handleClear={handleClear}
        handleOk={handleOk}
        repeatValue={repeatValue}
        reminderList={reminderList}
      />
    </div>
  );
};

export default CalendarPicker;
