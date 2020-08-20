import React, {useRef, useState} from 'react';
import TickFillRectIcon from "../../../icons/TickFillRectIcon";
import classes from './CheckBox.module.scss';

// Components Imports


// Images Imports

const CheckBox = ({initialValue, onChange}) => {
  const checkBoxRef = useRef(null);
  const [active, setActive] = useState(initialValue);

  async function runAnimation(e) {
    checkBoxRef.current.classList.add(classes.anim);
    await new Promise((res) => setTimeout(res, 150));
    setActive(active => !active);
    await new Promise((res) => setTimeout(res, 150));
    checkBoxRef.current.classList.remove(classes.anim);
    onChange(!active);
  }

  return (
    <div className={[classes.checkbox, active ? classes.active: ""].join(" ")} ref={checkBoxRef} onClick={runAnimation}>
      <TickFillRectIcon/>
    </div>
  );
};

export default CheckBox;
