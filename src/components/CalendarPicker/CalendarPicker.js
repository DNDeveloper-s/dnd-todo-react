import React, { useEffect, useState } from "react";
import "./CalendarPicker.scss";
import CalendarPickerHeader from "./CalendarPickerHeader";
import CalendarPickerMain from "./CalendarPickerMain";
import CalendarPickerFooter from "./CalendarPickerFooter";
import useMoment from "../../hooks/useMoment";
import { remindersWithShortTime, reminderWithLongTime } from "./helpers/data";
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
  const [time, setTime] = useState(activeDate?.time || "");
  const [reminderList, setReminderList] = useState(reminderWithLongTime);
  const [reminders, setReminders] = useState(
    activeDate?.reminders?.length > 0 ? activeDate.reminders : [reminderList[0]]
  );
  const [repeatValue, setRepeatValue] = useState("None");

  useEffect(() => {
    // Setting time and reminders on value changes
    setActiveDate({
      date: activeDate?.date,
      time,
      reminders,
    });
  }, [time, reminders]);

  function onDateClick(e) {
    setActiveDate({
      date: e.date,
      time,
      reminders,
    });
  }

  function handleClear() {
    onModalClose(null);
  }

  function handleOk() {
    onModalClose({
      date: activeDate.date,
      time,
      reminders,
    });
  }

  function onTimeChange(changedTime) {
    setTime(changedTime);
    if (Boolean(changedTime)) {
      if (!activeDate) setActiveDate({ date: moment().get().toISOString() });
      if (isEqual(reminderList, reminderWithLongTime)) {
        // Here we are checking if the time was not set
        // and the previous remindersList was reminderWithLongTime
        // and time was not selected
        // but now selected so switching the remindersList to reminderWithShortTime
        setReminders(
          reminderWithLongTime.some(
            (c) => c.label === activeDate?.reminders[0].label
          )
            ? [remindersWithShortTime[1]]
            : activeDate?.reminders || [remindersWithShortTime[1]]
        );
      }
      // Setting the remindersList to reminderWithShortTime
      // if the time is set
      setReminderList(remindersWithShortTime);
    } else {
      setReminders([reminderList[0]]);
      setReminderList(reminderWithLongTime);
    }
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
        {...{ yearMode }}
        activeDate={activeDate?.date}
        onMonthChange={setMonth}
        onYearModeChange={setYearMode}
        onDateChange={onDateClick}
      />
      <CalendarPickerFooter
        time={time}
        onTimeChange={onTimeChange}
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
