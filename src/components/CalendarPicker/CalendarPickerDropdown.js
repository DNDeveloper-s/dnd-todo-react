import React, { useEffect, useRef } from "react";
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
  scrollTo,
  itemStyle,
  itemHeight,
  dropDownItemsFooter,
  onClose,
  onOpen,
  itemsContainerClasses = [],
}) => {
  const { ref, visible, setVisible } = useOutsideAlerter(false, onClose);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollTo && scrollRef?.current) {
      scrollRef.current.scrollTo(0, scrollTo * itemHeight);
    }
  }, [visible]);

  function toggleDropdown() {
    if (visible) onClose && onClose();
    if (!visible) onOpen && onOpen();
    setVisible(!visible);
  }

  const dropdownItems = items.map((item) => (
    <CalendarPickerDropdownItem
      onActiveElements={onActiveElements}
      key={item.value}
      item={item}
      active={activeLogic && activeLogic(item)}
      onClick={(e) => {
        onItemClick(e, setVisible);
      }}
      style={{ ...itemStyle, height: itemHeight }}
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
          ref={scrollRef}
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
