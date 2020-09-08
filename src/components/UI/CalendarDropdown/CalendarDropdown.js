import React, { useCallback, useEffect, useState } from "react";
import CalendarWithDate from "../CalendarWithDate/CalendarWithDate";
import CalendarPicker from "../../CalendarPicker/CalendarPicker";
import Dropdown from "../Dropdown/Dropdown";
import useMoment from "../../../hooks/useMoment";
import CalendarIcon from "../../../icons/CalendarIcon";
import { isDueOver } from "../../../helpers/utils";

const CalendarDropdown = ({ dateData, onCalendarModalClose }) => {
  // Props
  // Get the initialDate
  const { moment } = useMoment();
  const [activeDate, setActiveDate] = useState(dateData);

  useEffect(() => {
    console.log(dateData);
    setActiveDate(dateData);
  }, [dateData]);

  const memoizedOnClose = useCallback(() => {
    setActiveDate(dateData);
  }, [dateData]);

  const calendarPicker = (setVisible) => (
    <CalendarPicker
      initialData={dateData}
      onModalClose={(...p) => onCalendarModalClose(...p, setVisible)}
      {...{ activeDate, setActiveDate }}
    />
  );

  return (
    <Dropdown
      onClose={memoizedOnClose}
      handle={
        dateData || activeDate?.date ? (
          <CalendarWithDate
            dueOver={isDueOver(activeDate, !activeDate?.time)}
            date={moment(activeDate.date).date()}
          />
        ) : (
          <CalendarIcon
            style={{ height: "2.5rem" }}
            pathStyle={{ fill: "#a7a7a7" }}
          />
        )
      }
      ItemComponent={calendarPicker}
    />
  );
};

export default CalendarDropdown;
