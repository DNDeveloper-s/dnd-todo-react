import React, {useState} from 'react';
import PlusIcon from "../../../../icons/PlusIcon";
import useOutsideAlerter from "../../../../hooks/useOutsideAlerter";
import AddLabelInput from "./AddLabelInput";
import PopOver from "./PopOver";
import {defaultSuggestionsFilter} from "draft-js-mention-plugin";
import {v4 as uuidV4} from "uuid";
import {colors} from "../../../ColorPicker/helpers/colors";
import {getRandomInt} from "../../../../helpers/utils";

const AddLabel = ({labels}) => {
  const {visible, setVisible, ref} = useOutsideAlerter(false);
  const [suggestions, setSuggestions] = useState(labels);
  const [activeInd, setActiveInd] = useState(0);

  function onClick() {
    setSuggestions(labels);
    setVisible(true);
  }

  function onSearchChange(value) {
    let filteredSuggestions = defaultSuggestionsFilter(value, labels);
    if (value.trim().length > 0) {
      if (filteredSuggestions.length > 0) {
        if (
          filteredSuggestions[0].name.toLowerCase() !==
          value.trim().toLowerCase()
        ) {
          filteredSuggestions = addCreateLabel(filteredSuggestions, value);
        }
      } else {
        filteredSuggestions = addCreateLabel(filteredSuggestions, value);
      }
    }
    console.log('[AddLabel.js || Line no. 33 ....]', filteredSuggestions);
    setActiveInd(0);
    setSuggestions(filteredSuggestions);
  }

  function addCreateLabel(suggestions, value) {
    const newSuggestionArr = Array.from(suggestions);
    const lastObj = {
      id: uuidV4(),
      name: value.trim(),
      color: colors[getRandomInt(0, 15)].value,
      icon: "LabelIcon",
      creating: true,
    };
    newSuggestionArr.push(lastObj);
    return newSuggestionArr;
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
    // TODO: Add handled label to db
  }

  function onItemClick(ind) {
    setActiveInd(ind);
    setVisible(false);
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
