import React, { useRef, useState } from "react";
import TickFillRectIcon from "../../../icons/TickFillRectIcon";
import classes from "./CheckBox.module.scss";
import { getPriorityByInd } from "../../../helpers/utils";

// Components Imports

// Images Imports

const CheckBox = ({ initialValue, onChange, priority = 0 , style, ...props}) => {
  const checkBoxRef = useRef(null);
  const [active, setActive] = useState(initialValue);
  const { color } = getPriorityByInd(priority);

  async function runAnimation(e) {
    checkBoxRef.current.classList.add(classes.anim);
    await new Promise((res) => setTimeout(res, 150));
    setActive((active) => !active);
    await new Promise((res) => setTimeout(res, 150));
    checkBoxRef.current.classList.remove(classes.anim);
    onChange(!active);
  }

  return (
    <div
      className={[classes.checkbox, active ? classes.active : ""].join(" ")}
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
