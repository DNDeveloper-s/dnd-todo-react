import React, { useEffect, useRef, useState } from "react";
import TickFillRectIcon from "../../../icons/TickFillRectIcon";
import classes from "./CheckBox.module.scss";
import { getPriorityByInd } from "../../../helpers/utils";

// Components Imports

// Images Imports

const CheckBox = ({
  initialValue: status,
  onChange,
  priority = 0,
  style,
  ...props
}) => {
  const checkBoxRef = useRef(null);
  const { color } = getPriorityByInd(priority);

  async function runAnimation(e) {
    if (checkBoxRef.current) {
      checkBoxRef.current.classList.add(classes.anim);
    }
    await new Promise((res) => setTimeout(res, 150));
    await new Promise((res) => setTimeout(res, 150));
    if (checkBoxRef.current) {
      checkBoxRef.current.classList.remove(classes.anim);
    }
    onChange(!status);
  }

  return (
    <div
      className={[classes.checkbox, status ? classes.active : ""].join(" ")}
      style={{ borderColor: color, ...style }}
      ref={checkBoxRef}
      onClick={runAnimation}
      {...props}
    >
      <TickFillRectIcon />
    </div>
  );
};

export default CheckBox;
