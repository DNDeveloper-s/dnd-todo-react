import React from "react";
import CalendarPickerDropdownItem from "./CalendarPickerDropdownItem";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

// Components Imports

// Images Imports

const CalendarPickerDropdown = ({
  children,
  items,
  containerClasses = [],
  onActiveElements,
  onItemClick,
  activeLogic,
  dropDownItemsFooter,
  itemsContainerClasses = [],
}) => {
  const { ref, visible, setVisible } = useOutsideAlerter(false);

  function toggleDropdown() {
    setVisible(!visible);
  }

  const dropdownItems = items.map((item) => (
    <CalendarPickerDropdownItem
      onActiveElements={onActiveElements}
      key={item.value}
      item={item}
      active={activeLogic && activeLogic(item)}
      onClick={(e) => {
        onItemClick(e);
        setVisible(false);
      }}
    />
  ));

  return (
    <div
      className={["dnd_calendar-dropdown", ...containerClasses].join(" ")}
      ref={ref}
    >
      <div className="dnd_calendar-dropdown_toggle" onClick={toggleDropdown}>
        {children}
      </div>
      {visible && (
        <div
          className={[
            "dnd_calendar-dropdown-items",
            ...itemsContainerClasses,
          ].join(" ")}
        >
          {dropdownItems}
          {dropDownItemsFooter && dropDownItemsFooter(setVisible)}
        </div>
      )}
    </div>
  );
};

export default CalendarPickerDropdown;
