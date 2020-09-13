import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CalendarDropdown from "../../../UI/CalendarDropdown/CalendarDropdown";

const AddTaskCalendar = ({ direction, dateData, onCalendarModalClose }) => {
  // Props
  // Get the initialDate
  const [activeDate, setActiveDate] = useState(dateData);

  useEffect(() => {
    if (dateData) {
      setActiveDate(dateData);
    }
  }, [dateData]);

  const memoizedOnClose = useCallback(() => {
    setActiveDate(dateData);
  }, [dateData]);

  return (
    <CalendarDropdown
      direction={direction}
      activeDate={activeDate}
      setActiveDate={setActiveDate}
      onCalendarModalClose={onCalendarModalClose}
      onClose={memoizedOnClose}
    />
  );
};

AddTaskCalendar.propTypes = {
  direction: PropTypes.oneOf([
    "topLeft",
    "topCenter",
    "topRight",
    "rightCenter",
    "bottomRight",
    "bottomCenter",
    "bottomLeft",
    "leftCenter",
  ]),
  dateData: PropTypes.any,
  onCalendarModalClose: PropTypes.func.isRequired,
};

export default AddTaskCalendar;
