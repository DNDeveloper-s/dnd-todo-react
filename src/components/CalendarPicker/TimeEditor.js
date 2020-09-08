import React, { useEffect, useRef, useState } from "react";
import { timeList } from "./helpers/data";

// Components Imports

// Images Imports

const TimeEditor = ({ timeValue, onTimeChange }) => {
  const timeEditor = useRef(null);

  function onTimeFocus() {
    if (timeValue.trim().length === 0) {
      const d = new Date();
      let hour = d.getHours();
      let min = d.getMinutes();
      if (hour < 10) hour = `0${hour}`;
      if (min < 10) min = `0${min}`;

      onTimeChange(`${hour}:${min}`);
    }
  }

  function getCaretCharacterOffsetWithin(input) {
    // Internet Explorer Caret Position (TextArea)
    let caret_pos;
    if (document.selection && document.selection.createRange) {
      let range = document.selection.createRange();
      let bookmark = range.getBookmark();
      caret_pos = bookmark.charCodeAt(2) - 2;
    } else {
      // Firefox Caret Position (TextArea)
      if (input.setSelectionRange) caret_pos = input.selectionStart;
    }

    return caret_pos;
  }

  function selectText(offsetStart, offsetEnd) {
    setTimeout(() => {
      timeEditor.current.selectionStart = offsetStart;
      timeEditor.current.selectionEnd = offsetEnd;
      timeEditor.current.selectionDirection = "forward";
    });
    onTextSelection(offsetStart > 2);
  }

  function onClickTimeEditor() {
    let offsetStart = 0,
      offsetEnd = 0;
    if (getCaretCharacterOffsetWithin(timeEditor.current) <= 2) {
      offsetStart = 0;
      offsetEnd = 2;
    } else {
      offsetStart = 3;
      offsetEnd = 5;
    }
    selectText(offsetStart, offsetEnd);
  }

  function onKeyDownTimeEditor(e) {
    if (e.key === "Tab" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      let offsetStart = 0,
        offsetEnd = 0;
      if (getCaretCharacterOffsetWithin(timeEditor.current) <= 2) {
        offsetStart = 3;
        offsetEnd = 5;
      } else {
        offsetStart = 0;
        offsetEnd = 2;
      }
      selectText(offsetStart, offsetEnd);
    }
    if (isNaN(+e.key)) {
      e.preventDefault();
    }
  }

  function onKeyUpHandler(e) {
    if (getCaretCharacterOffsetWithin(timeEditor.current) === 2) {
      selectText(3, 5);
    }
    if (getCaretCharacterOffsetWithin(timeEditor.current) === 5) {
      selectText(0, 2);
    }
  }

  function onTextSelection(isHour) {
    if (isHour) {
      const hourValue = timeValue.split(":")[0];
      getValidTime(+hourValue, "hour");
    } else {
      const minValue = timeValue.split(":")[1];
      getValidTime(+minValue, "min");
    }
  }

  function getValidTime(time, type) {
    let validTime = time;
    if (type === "hour") {
      while (validTime > 23) {
        validTime -= 24;
      }

      if (validTime < 10) {
        validTime = `0${validTime}`;
      }

      onTimeChange(`${validTime}:${timeValue.split(":")[1]}`);
    } else if (type === "min") {
      if (time > 59) {
        validTime = 59;
      }

      if (validTime < 10) {
        validTime = `0${validTime}`;
      }

      onTimeChange(`${timeValue.split(":")[0]}:${validTime}`);
    }
  }

  function onWheelHandler(e) {
    const increment = e.deltaY > 0;
    let minValue = +timeValue.split(":")[1];
    let hourValue = +timeValue.split(":")[0];

    if (!(minValue === 0 || minValue === 30)) {
      if (increment) {
        if (minValue === 0 || minValue < 30) {
          minValue = 30;
        } else if (minValue >= 30) {
          minValue = 0;
          hourValue += 1;
        }
      } else {
        if (minValue === 0 || minValue < 30) {
          minValue = 0;
          hourValue -= 1;
        } else if (minValue >= 30) {
          minValue = 30;
        }
      }
      if (hourValue < 10) {
        hourValue = `0${hourValue}`;
      }
      if (minValue < 10) {
        minValue = `0${minValue}`;
      }

      onTimeChange(`${hourValue}:${minValue}`);
    } else if (increment) {
      const currentIndex = timeList.findIndex((cur) => cur.label === timeValue);
      onTimeChange(
        timeList[currentIndex === timeList.length - 1 ? 0 : currentIndex + 1]
          .label
      );
    } else {
      const currentIndex = timeList.findIndex((cur) => cur.label === timeValue);
      onTimeChange(
        timeList[currentIndex === 0 ? timeList.length - 1 : currentIndex - 1]
          .label
      );
    }
  }

  return (
    <input
      type="text"
      ref={timeEditor}
      placeholder={"Set Time"}
      value={timeValue}
      onFocus={onTimeFocus}
      onChange={(e) => onTimeChange(e.target.value)}
      onClick={onClickTimeEditor}
      onKeyDown={onKeyDownTimeEditor}
      onKeyUp={onKeyUpHandler}
      onWheel={onWheelHandler}
    />
  );
};

export default TimeEditor;
