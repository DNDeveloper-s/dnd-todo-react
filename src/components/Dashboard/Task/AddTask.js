import React from 'react';
import DoubleAddIcon from "../../../icons/DoubleAddIcon";
import CaretDownFillIcon from "../../../icons/CaretDownFillIcon";
import CalendarWithDate from "../../UI/CalendarWithDate/CalendarWithDate";
import {getToday} from "../../CalendarPicker/helpers";
import TagInput from "../../UI/TagInput/TagInput";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {getColumnOrder, CREATE_TASK, REMOVE_TASK_CLASS} from "../../../features/taskSlice";
import {wait} from "../../../helpers/utils";
import {getAllLabels} from "../../../features/labelSlice";

// Components Imports


// Images Imports

const AddTask = () => {
  const dispatch = useDispatch();
  const columnOrder = useSelector(getColumnOrder);
  const labels = useSelector(getAllLabels);

  async function onReturn(content, cb) {
    console.log('[AddTask.js || Line no. 16 ....]', content);
    const text = content.blocks[0].text;
    const entityRanges = content.blocks[0].entityRanges;
    const parsedTextArr = [];

    for(let i = 0; i < text.length; i++) {
      if (checkIfItComesUnder(i)) continue;
      parsedTextArr.push(text[i]);
    }

    function checkIfItComesUnder(pos) {
      for(let i = 0; i < entityRanges.length; i++) {
        const range = entityRanges[i];
        if(pos >= range.offset && pos <= range.offset + range.length) {
          return true;
        }
      }
      return false;
    }

    const taskContent = parsedTextArr.join("");
    const taskId = uuidv4();

    dispatch(CREATE_TASK({
      id: taskId,
      content: taskContent,
      columnId: columnOrder[0],
      elClasses: ["disappearWithHeightTransition"]
    }));

    await wait(200);

    dispatch(REMOVE_TASK_CLASS({
      taskId: taskId,
      removeAll: true
    }));

    cb();
  }

  const labelsArr = labels.entities.map(labelId => {
    const label = labels.data[labelId];
    return {
      id: label.id,
      name: label.content,
      avatar: '',
      color: label.color,
      icon: label.icon
    }
  });

  return (
    <div className="add_task">
      <div className="add_task-icon fill">
        <DoubleAddIcon/>
      </div>
      <div className="add_task-input">
        <TagInput mentionsData={labelsArr} onReturn={onReturn}/>
      </div>
      <div className="add_task-icon">
        <CalendarWithDate date={getToday().day}/>
      </div>
      <div className="vertical_separator" />
      <div className="add_task-icon fill caret">
        <CaretDownFillIcon/>
      </div>
    </div>
  );
};

export default AddTask;
