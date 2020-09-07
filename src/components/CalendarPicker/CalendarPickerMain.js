import React from "react";
import { dayData, monthData } from "./helpers/data";
import zellerWeekDay from "./helpers/zeller";
import { monthsAbbr } from "./helpers/abbr";
import CalendarPickerGridItem from "./CalendarPickerGridItem";
import classNames from "classnames";

// Components Imports

// Images Imports

const CalendarPickerMain = ({
  activeDate,
  curMonth,
  curYear,
  yearMode,
  onYearModeChange,
  onMonthChange,
  onDateChange,
}) => {
  const calendarGridClass = classNames({
    "dnd_calendar-grid": true,
    fill: true,
    months: yearMode,
  });

  function getFirstDateOfTheGrid(month, year) {
    const firstDayOfTheMonth = dayData[zellerWeekDay(1, month, year).dayAbbr];
    const lastDayOfThePrevMonth = monthData[
      monthData[monthsAbbr[month].toLowerCase()].prevMonth.abbr
    ].getFinalDate(year);

    if (firstDayOfTheMonth.name === "Sunday") {
      return 1;
    }

    return lastDayOfThePrevMonth - (firstDayOfTheMonth.num - 2);
  }

  function getGridDates(month, year) {
    const lastDayOfThePrevMonth = monthData[
      monthData[monthsAbbr[month].toLowerCase()].prevMonth.abbr
    ].getFinalDate(year);
    const lastDayOfTheCurMonth = monthData[
      monthsAbbr[month].toLowerCase()
    ].getFinalDate(year);

    // console.log('[index.js || Line no. 21 ....]', getFirstDateOfTheGrid(month, year));

    const gridDates = [];

    let dateData = {
      data: {
        monthDay: getFirstDateOfTheGrid(month, year),
        weekDayCount: 1,
        month: getFirstDateOfTheGrid(month, year) === 1 ? month : month - 1,
        year: year,
      },
      cur: getFirstDateOfTheGrid(month, year) === 1,
      prev: getFirstDateOfTheGrid(month, year) !== 1,
      next: false,
    };

    for (let i = 1; i <= 42; i++) {
      gridDates.push({ ...dateData, data: { ...dateData.data } });

      if (dateData.data.monthDay === lastDayOfThePrevMonth && dateData.prev) {
        dateData.data.monthDay = 0;
        dateData.data.month += 1;
        dateData.prev = false;
        dateData.cur = true;
      }
      if (dateData.data.monthDay === lastDayOfTheCurMonth && dateData.cur) {
        dateData.data.monthDay = 0;
        dateData.cur = false;
        dateData.data.month += 1;
        dateData.next = true;
      }
      if (dateData.data.weekDayCount === 7) {
        dateData.data.weekDayCount = 0;
      }
      dateData.data.weekDayCount += 1;
      dateData.data.monthDay += 1;
    }

    return gridDates;
  }

  function onMonthSelect(e) {
    // console.log('[CalendarPickerMain.js || Line no. 76 ....]', e.target.dataset.month);
    onMonthChange(+e.target.dataset.month);
    onYearModeChange(false);
  }

  function onDateClick(e, date) {
    if (!date.data.cur) {
      onMonthChange(date.data.month);
    }
    onDateChange({
      date: new Date(
        date.data.year,
        date.data.month - 1,
        date.data.monthDay,
        0,
        0,
        0
      ),
      rawData: date,
    });
  }

  const dates = getGridDates(curMonth, curYear);

  let gridItems = [];

  if (!yearMode) {
    gridItems = dates.map((date, ind) => {
      return (
        <CalendarPickerGridItem
          {...{ activeDate }}
          key={date.data.monthDay + ind + Math.random()}
          {...{ date }}
          onClick={onDateClick}
        />
      );
    });
  } else {
    gridItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, ind) => {
      return (
        <CalendarPickerGridItem
          key={month + ind + Math.random()}
          text={monthsAbbr[month]}
          data-month={month}
          onClick={onMonthSelect}
        />
      );
    });
  }

  return (
    <div className="dnd_calendar-main">
      {!yearMode && (
        <div className="dnd_calendar-grid static">
          <div className="dnd_calendar-grid_item weekDay">
            <p>Su</p>
          </div>
          <div className="dnd_calendar-grid_item weekDay">
            <p>Mo</p>
          </div>
          <div className="dnd_calendar-grid_item weekDay">
            <p>Tu</p>
          </div>
          <div className="dnd_calendar-grid_item weekDay">
            <p>We</p>
          </div>
          <div className="dnd_calendar-grid_item weekDay">
            <p>Th</p>
          </div>
          <div className="dnd_calendar-grid_item weekDay">
            <p>Fr</p>
          </div>
          <div className="dnd_calendar-grid_item weekDay">
            <p>Sa</p>
          </div>
        </div>
      )}
      <div className={calendarGridClass}>{gridItems}</div>
    </div>
  );
};

export default CalendarPickerMain;
