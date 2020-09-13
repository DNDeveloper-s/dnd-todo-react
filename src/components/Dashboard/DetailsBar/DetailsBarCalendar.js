import React, { useEffect, useState } from "react";
import {
  decodeTaskDateForCalender,
  getDayDifference,
  isDefined,
} from "../../../helpers/utils";
import CalendarDropdown from "../../UI/CalendarDropdown/CalendarDropdown";
import moment from "moment";

const DetailsBarCalendar = ({ task }) => {
  const [dateData, setDateData] = useState();

  function onCalendarModalClose(response, setDropDownVisibility) {
    // Here, we are just hiding the dropdown and focusing the input element no matter what
    setDropDownVisibility(false);
    // Then checking if we are resetting
    // so just returning by setting it to null
    if (!isDefined(response)) return setDateData(null);
    // If we are here,
    // it means we have got some data to work with
    const { date, time, reminders } = response;
    const dayDiff = getDayDifference(date);
    setDateData({
      date: moment(date).toISOString(),
      diff: dayDiff.momentDate,
      time,
      reminders,
    });
  }

  useEffect(() => {
    if (task) {
      setDateData(decodeTaskDateForCalender(task));
    }
  }, [task]);

  return (
    <CalendarDropdown
      onCalendarModalClose={onCalendarModalClose}
      dateData={dateData}
      activeDate={dateData}
      setActiveDate={() => null}
    />
  );
};

export default DetailsBarCalendar;
