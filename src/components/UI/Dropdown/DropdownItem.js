import React from 'react';
import classes from "./Dropdown.module.css";

const DropdownItem = ({item, itemStyles, onClick, ...props}) => {

  return (
    <div className={classes["Dropdown-item"]} style={itemStyles} onClick={(e) => onClick(item, e)} {...props}>
      <p>{item.label || 'Nice one'}</p>
    </div>
  );
};

export default DropdownItem;
