import React, { useState } from "react";
import { monthsAbbr } from "./helpers/abbr";
import { monthData } from "./helpers/data";
import { getToday } from "./helpers";
import CalendarPickerGridItem from "./CalendarPickerGridItem";
import classNames from "classnames";

// Components Imports

// Images Imports

const CalendarPickerHeader = ({
  curMonth,
  curYear,
  onYearModeChange,
  onMonthChange,
  onYearChange,
  yearMode,
}) => {
  const [yearArr, setYearArr] = useState([
    getToday().year - 1,
    getToday().year,
    getToday().year + 1,
  ]);

  function getYearsList(yearArr, mode) {
    let arr = [];
    if (mode === "next") {
      arr = yearArr.map((year) => year + 3);
    }
    if (mode === "prev") {
      arr = yearArr.map((year) => year - 3);
    }
    return arr;
  }

  function goBackMonthHandler() {
    if (!yearMode) {
      if (curMonth === 1) {
        onYearChange(curYear - 1);
        return onMonthChange(12);
      }
      onMonthChange(curMonth - 1);
    } else {
      setYearArr(getYearsList(yearArr, "prev"));
    }
  }

  function goNextMonthHandler() {
    if (!yearMode) {
      if (curMonth === 12) {
        onYearChange(curYear + 1);
        return onMonthChange(1);
      }
      onMonthChange(curMonth + 1);
    } else {
      setYearArr(getYearsList(yearArr, "next"));
    }
  }

  function showYearModeHandler() {
    if (!yearMode) {
      onYearModeChange(true);
    }
  }

  function onYearSelect(e) {
    onYearChange(+e.target.innerText);
  }

  let headerLabel = (
    <>
      <div className="dnd_calendar-header-label-text currentMonth">
        <p>{monthData[monthsAbbr[curMonth].toLowerCase()].name}</p>
      </div>
      <div className="dnd_calendar-header-label-text currentYear">
        <p>{curYear}</p>
      </div>
    </>
  );

  if (yearMode) {
    headerLabel = [0, 1, 2].map((cur, ind) => (
      <CalendarPickerGridItem
        onClick={onYearSelect}
        key={cur + ind + Math.random()}
        classes={classNames({
          "dnd_calendar-header-label-text yearItem": true,
          active: curYear.toString() === yearArr[cur].toString(),
        })}
        text={yearArr[cur]}
      />
    ));
  }

  return (
    <div className="dnd_calendar-header">
      <div
        className="dnd_calendar-header-nav left"
        onClick={goBackMonthHandler}
      >
        <svg
          width="220"
          height="405"
          viewBox="0 0 220 405"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M203.706 2.91474e-05C207.886 2.95128e-05 211.543 1.56703 214.677 4.70203C220.946 10.971 220.946 20.898 214.677 26.645L38.6122 202.188L214.677 377.73C220.946 383.999 220.946 393.926 214.677 399.673C208.408 405.942 198.481 405.942 192.734 399.673L5.69716 213.159C2.56216 210.024 0.995165 206.367 0.995165 202.188C0.995166 198.008 2.56216 193.829 5.69716 191.217L192.734 4.70202C195.869 1.56702 199.526 2.8782e-05 203.706 2.91474e-05Z"
            fill="#3A2C51"
          />
        </svg>
      </div>
      <div className="dnd_calendar-header-label" onClick={showYearModeHandler}>
        {headerLabel}
      </div>
      <div
        className="dnd_calendar-header-nav right"
        onClick={goNextMonthHandler}
      >
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 404.375 404.375"
          xmlSpace="preserve"
        >
          <path d="M108.669,404.375c-4.18,0-7.837-1.567-10.971-4.702c-6.269-6.269-6.269-16.196,0-21.943 l176.065-175.543L97.698,26.645c-6.269-6.269-6.269-16.196,0-21.943c6.269-6.269,16.196-6.269,21.943,0l187.037,186.514 c3.135,3.135,4.702,6.792,4.702,10.971c0,4.18-1.567,8.359-4.702,10.971L119.641,399.673 C116.506,402.808,112.849,404.375,108.669,404.375z" />
        </svg>
      </div>
    </div>
  );
};

export default CalendarPickerHeader;
