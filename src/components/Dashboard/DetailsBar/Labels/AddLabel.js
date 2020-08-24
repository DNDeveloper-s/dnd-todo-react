import React, {useState} from 'react';
import PlusIcon from "../../../../icons/PlusIcon";
import useOutsideAlerter from "../../../../hooks/useOutsideAlerter";
import AddLabelInput from "./AddLabelInput";
import PopOver from "./PopOver";
import {getFilteredLabels} from "../../../../helpers/utils";

const AddLabel = ({onAddLabel, labels}) => {
  const {visible, setVisible, ref} = useOutsideAlerter(false);
  const [suggestions, setSuggestions] = useState(labels);
  const [activeInd, setActiveInd] = useState(0);

  function onClick() {
    setSuggestions(labels);
    setVisible(true);
  }

  function onSearchChange(value) {
    setActiveInd(0);
    setSuggestions(getFilteredLabels(value, labels));
  }

  function onDirection(type) {
    if(type === 'goDown') {
      if(suggestions.length - 1 === activeInd) {
        return setActiveInd(0);
      }
      setActiveInd(activeInd + 1);
    } else if(type === 'goUp') {
      if(activeInd === 0) {
        return setActiveInd(suggestions.length - 1);
      }
      setActiveInd(activeInd - 1);
    }
  }

  function handleReturn() {
    const handledLabel = suggestions[activeInd];
    setVisible(false);
    onAddLabel(handledLabel);
  }

  function onItemClick(ind) {
    setActiveInd(ind);
    setVisible(false);
    const handledLabel = suggestions[ind];
    onAddLabel(handledLabel);
  }

  return (
    <div className="dashboard-detailsBar-labelsList-addLabel" ref={ref}>
      {visible ?
        <>
          <AddLabelInput
            onChange={onSearchChange}
            direction={onDirection}
            handleReturn={handleReturn}
          />
          <PopOver onClick={onItemClick} activeInd={activeInd} suggestions={suggestions}/>
        </> :
        <PlusIcon fill={'#fff'} onClick={onClick} />
      }
    </div>
  );
};

export default AddLabel;
