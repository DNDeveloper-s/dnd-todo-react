import React from "react";

// Components Imports

// Images Imports

const ColorPickerItem = ({ active, color, onClick }) => {
  return (
    <div
      className={["color_picker-item", active ? "active" : ""].join(" ")}
      onClick={() => onClick(color.value)}
      style={{ backgroundColor: color.value }}
    />
  );
};

export default ColorPickerItem;
