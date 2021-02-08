import React, { useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { colors, moreColors } from "./helpers/colors";
import "./ColorPicker.css";
import NoDropIcon from "../../icons/NoDropIcon";
import ColorPickerItem from "./ColorPickerItem";
import AppButton from "../UI/AppButton";
import DotsMenuHorizontal from "../../icons/DotsMenuHorizontal";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const ColorPicker = ({ activeColor, setActiveColor }) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false);
  const [moreColor, setMoreColor] = useState(null);

  const colorItems = colors.map((color) => (
    <ColorPickerItem
      key={color.value}
      active={activeColor === color.value}
      {...{ color }}
      onClick={setActiveColor}
    />
  ));

  const moreColorItems = moreColors.map((moreColor) => (
    <ColorPickerItem
      key={moreColor.value}
      color={moreColor}
      onClick={(c) => {
        moreColorItemClicked(c);
        setVisible(false);
      }}
    />
  ));

  function moreColorItemClicked(color) {
    const isColorInMain = colors.find((c) => c.value === color);
    if (isColorInMain) {
      setMoreColor(null);
      return setActiveColor(color);
    }
    setMoreColor(color);
    setActiveColor(color);
  }

  function toggleMoreColors() {
    // console.log("[ColorPicker.js || Line no. 23 ....]", "Clicked");
    setVisible(true);
  }

  return (
    <div className="color_picker-main">
      <div
        className={[
          "color_picker-item null",
          activeColor === null ? "active" : "",
        ].join(" ")}
        onClick={() => setActiveColor(null)}
      >
        <NoDropIcon />
      </div>
      {colorItems}
      {moreColor && (
        <ColorPickerItem
          key={moreColor}
          active={activeColor === moreColor}
          color={{ value: moreColor }}
          onClick={setActiveColor}
        />
      )}
      <div className="color_picker-item color_picker-item-dropdown" ref={ref}>
        <div
          className="color_picker-item-dropdown-toggle_menu"
          onClick={toggleMoreColors}
        >
          <DotsMenuHorizontal />
        </div>
        <div className="color_picker-item-dropdown-container" style={{zIndex: 1}}>
          {visible && <div className="color_picker-grid">{moreColorItems}</div>}
        </div>
      </div>
    </div>
    // <div className="color_picker">
    //   {/*<div className="color_picker-header">*/}
    //   {/*  <div className="color_picker-header-label">*/}
    //   {/*    <p>Edit List</p>*/}
    //   {/*  </div>*/}
    //   {/*  <div className="color_picker-header-icon">*/}
    //   {/*    <CloseIcon />*/}
    //   {/*  </div>*/}
    //   {/*</div>*/}
    //   // <div className="color_picker-main">
    //   //   <div
    //   //     className={[
    //   //       "color_picker-item null",
    //   //       activeColor === null ? "active" : "",
    //   //     ].join(" ")}
    //   //     onClick={() => setActiveColor(null)}
    //   //   >
    //   //     <NoDropIcon />
    //   //   </div>
    //   //   {colorItems}
    //   //   {moreColor && (
    //   //     <ColorPickerItem
    //   //       key={moreColor}
    //   //       active={activeColor === moreColor}
    //   //       color={{ value: moreColor }}
    //   //       onClick={setActiveColor}
    //   //     />
    //   //   )}
    //   //   <div className="color_picker-item color_picker-item-dropdown" ref={ref}>
    //   //     <div
    //   //       className="color_picker-item-dropdown-toggle_menu"
    //   //       onClick={toggleMoreColors}
    //   //     >
    //   //       <DotsMenuHorizontal />
    //   //     </div>
    //   //     <div className="color_picker-item-dropdown-container">
    //   //       {visible && (
    //   //         <div className="color_picker-grid">{moreColorItems}</div>
    //   //       )}
    //   {/*    </div>*/}
    //   {/*  </div>*/}
    //   {/*</div>*/}
    //   {/*<div className="color_picker-footer">*/}
    //   {/*  <div className="color_picker-footer-action_buttons flex">*/}
    //   {/*    <AppButton label="Close" />*/}
    //   {/*    <AppButton label="Save" primary />*/}
    //   {/*  </div>*/}
    //   {/*</div>*/}
    // {/*</div>*/}
  );
};

export default ColorPicker;
