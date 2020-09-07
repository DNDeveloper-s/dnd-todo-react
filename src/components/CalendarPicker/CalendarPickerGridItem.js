import React, { useEffect } from "react";
import classNames from "classnames";
import { getToday } from "./helpers";
import moment from "moment";

// Components Imports

// Images Imports

const CalendarPickerGridItem = ({
  classes,
  activeDate,
  date,
  onClick,
  text,
  ...otherArgs
}) => {
  let dateClass = classNames({
    "dnd_calendar-grid_item": true,
    currentMonth: date && date.cur,
    today:
      date &&
      getToday(date.data.monthDay, date.data.month, date.data.year).isToday,
    active:
      activeDate &&
      date &&
      moment(activeDate).date() === date.data.monthDay &&
      date.data.month === moment(activeDate).month() + 1,
  });

  let pText = "";

  if (!text) {
    pText = date.data.monthDay;
  } else {
    pText = text;
  }

  return (
    <div
      className={classes || dateClass}
      onClick={(e) => onClick(e, date || text)}
      {...otherArgs}
    >
      <p>{pText}</p>
    </div>
  );
};

export default CalendarPickerGridItem;
