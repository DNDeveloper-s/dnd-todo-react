import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppLoader from "./AppLoader/AppLoader";

const AppInput = ({ value, loading, onChange, containerClassNames = [], handleReturn, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  function onKeyDown(e) {
    if(e.key === 'Enter') {
      e.preventDefault();
      handleReturn();
    }
  }

  return (
    <div className={["generic_input", ...containerClassNames].join(" ")}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value, e)}
        spellCheck={false}
        onKeyDown={onKeyDown}
        {...props}
      />
      {loading && <AppLoader containerStyle={{
        position: 'absolute',
        top: '50%',
        right: '15px',
        width: 'unset',
        height: 'unset',
      }} size={0.15} noBg />}
    </div>
  );
};

AppInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerClassNames: PropTypes.array,
  handleReturn: PropTypes.func
};

export default AppInput;
