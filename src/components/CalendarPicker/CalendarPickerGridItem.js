import React from 'react';
import classNames from 'classnames';
import {getToday} from "./helpers";

// Components Imports


// Images Imports

const CalendarPickerGridItem = ({classes, date, onClick, text, ...otherArgs}) => {
    let dateClass = classNames({
        'dnd_calendar-grid_item': true,
        'currentMonth': date && date.cur,
        'today': date && getToday(date.data.monthDay, date.data.month, date.data.year).isToday
    });

    let pText = '';

    if(!text) {
        pText = date.data.monthDay;
    } else {
        pText = text;
    }

    return (
      <div className={classes || dateClass} onClick={onClick} {...otherArgs}><p>{pText}</p></div>
    );
};

export default CalendarPickerGridItem;
