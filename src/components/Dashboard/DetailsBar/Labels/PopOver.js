import React, {useState} from 'react';
import PopOverItem from "./PopOverItem";

const PopOver = ({activeInd, onClick, suggestions: items}) => {

  return (
    <div className="add_label-popover">
      {items.map((item, ind) => (
        <PopOverItem onClick={() => onClick(ind)} focusIt={ind === activeInd} item={item} key={item.id} />
      ))}
    </div>
  );
};

export default PopOver;
