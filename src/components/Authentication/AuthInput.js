import React, {useEffect, useRef} from 'react';

import {classNames} from "../../helpers/utils";

const AuthInput = ({isInvalid, type, id, placeholder, required, name, onChange, value, label, containerStyle, ...props}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if(isInvalid) {
      inputRef.current.focus();
    }
  }, [isInvalid]);

  return (
    <div className={classNames('generic_input', {
      error: isInvalid
    })} style={containerStyle}>
      <input ref={inputRef} {...{type, id, required, placeholder, name, ...props}} onChange={(e) => onChange(e.target.value)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default AuthInput;
