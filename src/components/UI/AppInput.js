import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AppInput = ({ value, onChange, containerClassNames, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <div className={["generic_input", ...containerClassNames].join(" ")}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

AppInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerClassNames: PropTypes.array,
};

export default AppInput;
