import React from "react";
import classes from "./HorizontalSelect.module.css";
import { classNames } from "../../../helpers/utils";

const HorizontalSelectItem = ({
  active,
  allowAriaLabel,
  iconStyle,
  item,
  onClick,
  ...props
}) => {
  return (
    <div
      className={classNames(classes.HorizontalSelect_item, {
        [classes.active]: active,
        ariaLabel: allowAriaLabel,
      })}
      aria-label={item.label}
      onClick={(e) => onClick(item, e)}
      {...props}
    >
      <div className={classes.HorizontalSelect_item_icon} style={iconStyle}>
        <item.IconComponent />
      </div>
    </div>
  );
};

export default HorizontalSelectItem;
