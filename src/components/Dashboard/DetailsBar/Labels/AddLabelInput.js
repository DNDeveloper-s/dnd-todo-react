import React, {useEffect, useRef} from 'react';

const AddLabelInput = ({direction, onChange, handleReturn}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function onKeyDown(e) {
    if(e.key === 'Tab' || e.key === 'Enter') {
      handleReturn();
      return e.preventDefault();
    }
    if(e.key === "ArrowUp") {
      e.preventDefault();
      direction('goUp');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      direction('goDown');
    }
  }

  return (
    <>
      <input ref={inputRef} onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown} type="text" placeholder="Type in a tag"/>
    </>
  );
};

export default AddLabelInput;
