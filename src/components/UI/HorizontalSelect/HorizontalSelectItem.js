import React from 'react';
import classes from "./HorizontalSelect.module.css";

const HorizontalSelectItem = ({active, item, onClick, ...props}) => {

  return (
    <div className={[classes.HorizontalSelect_item, active ? classes.active : ''].join(" ")} onClick={e => onClick(item, e) } {...props}>
      <div className={classes.HorizontalSelect_item_icon}>
        <item.IconComponent />
      </div>
    </div>
  );
};

export default HorizontalSelectItem;
