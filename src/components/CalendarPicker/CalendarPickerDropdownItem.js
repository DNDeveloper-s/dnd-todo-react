import React from "react";

// Components Imports

// Images Imports

const CalendarPickerDropdownItem = ({
  item,
  onActiveElements,
  onClick,
  active,
}) => {
  return (
    <div
      className={["dnd_calendar-dropdown-item", active ? "active" : ""].join(
        " "
      )}
      onClick={(e) => onClick(e.currentTarget.dataset.label)}
      data-label={item.label}
    >
      <p>{item.label}</p>
      {active && onActiveElements}
    </div>
  );
};

export default CalendarPickerDropdownItem;
