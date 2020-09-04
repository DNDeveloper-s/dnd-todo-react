import React, {useEffect, useRef, useState} from 'react';

const TaskInput = ({doFocus, handleBackspace, handleReturn, initialTitle}) => {
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  useEffect(() => {
    if(doFocus) inputRef.current.focus()
  }, [doFocus]);

  function onKeyDown(e) {
    if(e.key === "Enter") return handleReturn();
    if(e.key === "Backspace" && title.length === 0) return handleBackspace();
  }

  return (
    <input placeholder="Add item" type="text" value={title} onKeyDown={onKeyDown} onChange={e => setTitle(e.target.value)} ref={inputRef}/>
  );
};

export default TaskInput;
