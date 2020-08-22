import React from "react";
import CalendarIcon from "../../../icons/CalendarIcon";

// Components Imports
import classes from "./CalendarWithDate.module.scss";

// Images Imports

const CalendarWithDate = ({ date, fill, dueOver, textColor }) => {
  return (
    <div className={classes.calendar_with_date}>
      <div className={classes["calendar_with_date-icon"]}>
        <CalendarIcon {...{ fill, dueOver }} />
      </div>
      <div
        className={classes["calendar_with_date-label"]}
        style={{ color: textColor || "#fff" }}
      >
        <p>{date}</p>
      </div>
    </div>
  );
};

export default CalendarWithDate;
