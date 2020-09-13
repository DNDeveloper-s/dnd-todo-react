import React, { useState } from "react";
import CalendarWithDate from "../CalendarWithDate/CalendarWithDate";
import CalendarPicker from "../../CalendarPicker/CalendarPicker";
import Dropdown from "../Dropdown/Dropdown";
import useMoment from "../../../hooks/useMoment";
import { isDueOver } from "../../../helpers/utils";
import PropTypes from "prop-types";
import ResetCalendarIcon from "../../../icons/ResetCalendarIcon";

const CalendarDropdown = ({
  direction,
  dateData,
  onClose,
  onCalendarModalClose,
  activeDate,
  setActiveDate,
}) => {
  // Props
  // Get the initialDate
  const { moment } = useMoment();

  // const [innerActive, setInnerActive] = useState(activeDate || dateData);

  const activeDateChangeHandler = (changedDate) => {
    // setInnerActive(changedDate);
    setActiveDate(changedDate);
  };

  const calendarPicker = (setVisible) => (
    <CalendarPicker
      initialData={dateData}
      onModalClose={(...p) => onCalendarModalClose(...p, setVisible)}
      activeDate={activeDate}
      setActiveDate={activeDateChangeHandler}
    />
  );

  return (
    <Dropdown
      direction={direction}
      onItemSelect={() => null}
      onClose={onClose}
      handle={
        dateData || activeDate?.date ? (
          <CalendarWithDate
            dueOver={isDueOver(activeDate, !activeDate?.time)}
            date={moment(activeDate.date).date()}
          />
        ) : (
          <ResetCalendarIcon
            style={{ height: "2.5rem" }}
            pathStyle={{ fill: "#a7a7a7" }}
          />
        )
      }
      ItemComponent={calendarPicker}
    />
  );
};

CalendarDropdown.propTypes = {
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
  activeDate: PropTypes.any,
  setActiveDate: PropTypes.func,
  onClose: PropTypes.func,
  dateData: PropTypes.any,
  onCalendarModalClose: PropTypes.func.isRequired,
};

export default CalendarDropdown;
