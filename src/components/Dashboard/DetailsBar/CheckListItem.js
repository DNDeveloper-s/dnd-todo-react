import React, {useEffect, useRef, useState} from 'react';
import CheckBox from "../../UI/CheckBox/CheckBox";

const CheckListItem = ({focusIt, handleReturn, handleBackspace, onChange, item}) => {
  const [title, setTitle] = useState(item.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if(focusIt) {
      inputRef.current.focus();
    }
  }, [focusIt]);

  function onKeyDown(e) {
    if(e.key === "Enter") return handleReturn(item);
    if(e.key === "Backspace" && title.length === 0) return handleBackspace(item);
  }

  return (
    <div className="dashboard-detailsBar-innerItems-checkListItem">
      <CheckBox style={{marginRight: '15px', zoom: 0.85}} onChange={() => null} />
      <input placeholder="Add item" type="text" value={title} onKeyDown={onKeyDown} onChange={e => setTitle(e.target.value)} ref={inputRef}/>
    </div>
  );
};

export default CheckListItem;
