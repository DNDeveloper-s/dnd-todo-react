import React, { useState } from "react";
import classes from "./Dropdown.module.css";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import DropdownItem from "./DropdownItem";

const Dropdown = ({
  handle,
  direction,
  initialValue,
  items = [],
  onItemSelect,
  ItemComponent,
  ItemHeader,
  ItemFooter,
}) => {
  const { visible, setVisible, ref } = useOutsideAlerter(initialValue);

  function onHandleClick() {
    setVisible(!visible);
  }

  function itemClickHandler(item, e) {
    onItemSelect(item, setVisible, e);
  }

  return (
    <div className={classes.Dropdown} ref={ref}>
      <div className={classes["Dropdown-handle"]} onClick={onHandleClick}>
        {handle}
      </div>
      <div
        className={[
          classes["Dropdown-container"],
          visible ? classes["visible"] : "",
        ].join(" ")}
      >
        {visible && (
          <>
            {ItemHeader && ItemHeader(setVisible)}
            {ItemComponent ? (
              ItemComponent(setVisible)
            ) : (
              <>
                {items.map((item) => (
                  <DropdownItem key={item.id} item={item} onClick={itemClickHandler} />
                ))}
              </>
            )}
            {ItemFooter && <ItemFooter />}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
