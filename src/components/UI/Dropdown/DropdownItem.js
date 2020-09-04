import React from 'react';
import classes from "./Dropdown.module.css";

const DropdownItem = ({item, onClick, ...props}) => {

  return (
    <div className={classes["Dropdown-item"]} onClick={(e) => onClick(item, e)} {...props}>
      <p>{item.label || 'Nice one'}</p>
    </div>
  );
};

export default DropdownItem;
