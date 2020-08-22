import React, {useState} from 'react';
import classes from './HorizontalSelect.module.css';
import HorizontalSelectItem from "./HorizontalSelectItem";

const HorizontalSelect = ({headerText, items, onItemSelect, activeItem}) => {

  return (
    <div className={classes.HorizontalSelect}>
      <div className={classes.HorizontalSelect_header}>
        <p>{headerText || 'Header Text'}</p>
      </div>
      <div className={classes.HorizontalSelect_container}>
        {items.map(item => (
          <HorizontalSelectItem key={item.id} item={item} active={item.id === activeItem.id} onClick={onItemSelect} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalSelect;
