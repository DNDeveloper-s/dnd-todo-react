import React, { useState } from "react";
import classes from "./HorizontalSelect.module.css";
import HorizontalSelectItem from "./HorizontalSelectItem";

const HorizontalSelect = ({
  allowAriaLabel,
  headerText,
  iconStyle,
  items,
  onItemSelect,
  activeItem,
  noActive,
  ItemComponent,
}) => {
  return (
    <div className={classes.HorizontalSelect}>
      <div className={classes.HorizontalSelect_header}>
        <p>{headerText || "Header Text"}</p>
      </div>
      <div className={classes.HorizontalSelect_container}>
        {ItemComponent && <ItemComponent />}
        {items &&
          items.map((item) => (
            <HorizontalSelectItem
              allowAriaLabel
              key={item.id}
              item={item}
              active={!noActive && item.id === activeItem.id}
              onClick={onItemSelect}
              iconStyle={iconStyle}
            />
          ))}
      </div>
    </div>
  );
};

export default HorizontalSelect;
