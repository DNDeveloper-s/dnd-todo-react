import produce from "immer";
import moment from "moment";
import { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import { v4 as uuidV4 } from "uuid";
import { colors } from "../components/ColorPicker/helpers/colors";
import {
  remindersWithShortTime,
  reminderWithLongTime,
} from "../components/CalendarPicker/helpers/data";
import PriorityNoneIcon from "../icons/PriorityNoneIcon";
import PriorityLowIcon from "../icons/PriorityLowIcon";
import PriorityMediumIcon from "../icons/PriorityMediumIcon";
import PriorityHighIcon from "../icons/PriorityHighIcon";
import { priorities } from "./data";

/**
 *
 * @param min {Number}
 * @param max {Number}
 * @returns {Number}
 */

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param arr {Array}
 * @param id {String}
 * @param match {String}
 * @returns {Array}
 */

export const removeItemByIdInArray = (arr = [], id = "2", match = "") => {
  return produce(arr, (draftArr) => {
    const itemIndex = draftArr.findIndex(
      (item) => matchItemId(item, match) === id.toString()
    );
    draftArr.splice(itemIndex, 1);
  });
};

const matchItemId = (item, match) => {
  if (typeof item === "string") return item;
  if (match.length > 0) {
    return item[match].toString();
  }
  if (typeof item === "object") {
    const keys = Object.keys(item);
    if (keys.includes("id")) return item["id"].toString();
    if (keys.includes("_id")) return item["_id"].toString();
  }
};

/**
 * @param time {Number} in milliseconds
 * @returns {Promise<any>}
 */

export const wait = async (time) => {
  return await new Promise((res) => setTimeout(res, time));
};

/**
 *
 * @param ind
 * @returns {{color: {String}, iconName, label, ind}|*}
 * @description It returns priority object by consuming index of the priority
 */

export const getPriorityByInd = (ind) => {
  return priorities.find((c) => c.ind === ind);
};

/**
 *
 * @param label
 * @returns {*}
 */

export const getPriorityByLabel = (label) => {
  const priorities = {
    "No Priority": {
      ind: 0,
      color: "#C4C4C4",
      label: "No Priority",
      iconName: "PriorityNoneIcon",
    },
    "Low Priority": {
      ind: 1,
      color: "#4B6FDE",
      label: "Low Priority",
      iconName: "PriorityLowIcon",
    },
    "Medium Priority": {
      ind: 2,
      color: "#FFC817",
      label: "Medium Priority",
      iconName: "PriorityMediumIcon",
    },
    "High Priority": {
      ind: 3,
      color: "#E13E39",
      label: "High Priority",
      iconName: "PriorityHighIcon",
    },
  };

  return priorities[label];
};

/**
 * @param str {String}
 * @param start {Number}
 * @param end {Number}
 * @return {String}
 */

export const spliceText = (str, start, end) => {
  const stringArr = Array.from(str);
  stringArr.splice(start, end);
  const newStr = stringArr.join("").trim();
  return newStr.replace(/ +(?= )/g, "");
};

/**
 * @param date
 * @returns {string}
 */

export const fromNow = (task) => {
  if (!task?.startDate) return null;

  const taskDate = moment(task.startDate);

  let a = moment(getMomentDateWithTime(task.startDate));
  let b = moment().set({ hour: 0, minute: 0 });
  if (!task.isFullDay)
    b = moment().set({
      hour: taskDate.get("hour"),
      minute: taskDate.get("minute"),
    });

  let diff = b.to(a);

  if (diff.startsWith("in")) {
    diff = diff.slice(3) + " later";
  }

  // Making it title case
  function makeTitleCase(str) {
    let newStr = str.split(" ");
    newStr[0] = newStr[0].toUpperCase();
    return newStr.join(" ");
  }

  diff = makeTitleCase(diff);

  let format = getCommonFormatDate(
    task.startDate,
    {
      sameDay: "[Today], MMM DD",
      nextDay: "[Tomorrow], MMM DD",
      nextWeek: "ddd, MMM DD",
      lastDay: "[Yesterday], MMM DD",
      lastWeek: "[Last] ddd, MMM DD",
      sameElse: `[${diff}], MMM DD`,
    },
    task.isFullDay,
    true
  );

  if (!task.isFullDay) {
    format = format + ", " + moment(task.startDate).format("HH:mm");
  }

  return format;
};

/**
 *
 * @param date {{dateObj: {DateConstructor},day: {Number}, month: {Number}, year: {Number}}}
 * @return {Object}
 */

export const getDayDifference = (date) => {
  // let momentDate = moment(date.dateObj).calendar();
  let momentDate = getCommonFormatDate(date);

  // if (momentDate.split("/")[1]) {
  //   momentDate = moment(date.dateObj).format("ddd, MMM D");
  // }

  let a = moment(date);
  let b = moment().get();

  return { momentDate, dueOver: a.diff(b, "days") < 0 };
};

/**
 * @requires nice {String}
 * @param {Object} dateData - Object that hold the date object and time object
 * @param {String} dateData.date - property that holds the date ISO string
 * @param {String} dateData.time - property that holds the time string
 * @param {Boolean} isFullDay
 * @returns {boolean}
 */
export const isDueOver = (dateData, isFullDay) => {
  // console.log(dateData);
  // return;
  let a = moment(getMomentDateWithTime(dateData)); // date from the data
  let b = moment().get(); // Today's date
  let unit = "minute"; // Comparing unit

  if (isFullDay) unit = "days"; // If time doesn't exist then just comparing with the "days", doesn't make sense with "minute" then

  return a.diff(b, unit) < 0;
};

/**
 * @description It just takes date and time and then returns the moment date object with the specified time
 * @param dateData {String | Object}
 * @param dateData.date {String}
 * @param dateData.time {String}
 * @returns {string}
 */
export const getMomentDateWithTime = (dateData) => {
  if (typeof dateData === "object") {
    const { date, time } = dateData;
    const timeArr = time ? time.split(":") : [0, 0];
    return moment(date)
      .set({
        hour: timeArr[0],
        minute: timeArr[1],
      })
      .toISOString();
  }
  return moment(dateData);
};

/**
 *
 * @param date {DateConstructor}
 * @param format {Object}
 * @param isFullDay {Boolean}
 * @param noTimeOnToday {Boolean}
 * @returns {string}
 */

export const getCommonFormatDate = (
  date,
  format = {},
  isFullDay,
  noTimeOnToday
) => {
  // Checking for if the date difference is more than a year
  let sameElse;
  let a = moment(getMomentDateWithTime(date));
  let b = moment().get();
  a.diff(b, "years") > 0
    ? (sameElse = "MMM D, YYYY")
    : (sameElse = format.sameElse || "ddd, MMM D");

  // Checking if the date lies today
  if (isToday(date) && !isFullDay && !noTimeOnToday) {
    return moment(date).format("HH:mm");
  }

  return moment(getMomentDateWithTime(date)).calendar(null, {
    sameDay: format.sameDay || "[Today]",
    nextDay: format.nextDay || "[Tomorrow]",
    nextWeek: format.nextWeek || "dddd",
    lastDay: format.lastDay || "[Yesterday]",
    lastWeek: format.lastWeek || "[Last] dddd",
    sameElse,
  });
};

export const isToday = (date) => {
  let a = moment(getMomentDateWithTime(date));
  let b = moment().get();
  if (a.diff(b, "days") !== 0) return false;
  console.log(a.get("date"), b.get("date"));
  return a.get("date") - b.get("date") === 0;
};

/**
 *
 * @param value {String}
 * @param labelsData {Array}
 * @returns {Array}
 */

export const getFilteredLabels = (value, labelsData) => {
  let filteredSuggestions = defaultSuggestionsFilter(value, labelsData);

  if (value.trim().length > 0) {
    if (filteredSuggestions.length > 0) {
      if (
        filteredSuggestions[0].name.toLowerCase() !== value.trim().toLowerCase()
      ) {
        filteredSuggestions = addCreateLabel(filteredSuggestions, value);
      }
    } else {
      filteredSuggestions = addCreateLabel(filteredSuggestions, value);
    }
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

  return filteredSuggestions;
};

/**
 *
 * @param arr
 * @param itemToPush
 * @param config {Object: {allowDuplicates: {Boolean}, match: {String}}}
 * @returns {*[]}
 */

export const pushToArray = (arr, itemToPush, config = {}) => {
  // const config = {
  //   allowDuplicates: false,
  //   match: 'id'
  // }
  const newArr = [...arr];
  if (config.allowDuplicates) {
    newArr.push(itemToPush);
    return newArr;
  }
  const isPresent = arr.findIndex(
    (item) =>
      matchItemId(item, config.match) === matchItemId(itemToPush, config.match)
  );
  if (isPresent < 0) {
    newArr.push(itemToPush);
    return newArr;
  }
  return newArr;
};

/**
 *
 * @param variable
 * @returns {boolean|boolean}
 */
export const isDefined = (variable) =>
  variable !== undefined && variable !== null;

/**
 *
 * @param args
 * @returns {string}
 */
export const classNames = (...args) => {
  let classArr = [];
  let classObj;
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (typeof arg === "string" || typeof arg === "number") {
      classArr.push(arg.toString());
      continue;
    }
    if (typeof arg === "object") {
      classObj = arg;
    }
  }
  const mappedClassObj = Object.keys(classObj);
  let arr = mappedClassObj.filter((c) => classObj[c]);
  return [...classArr, ...arr].join(" ");
};

/**
 * @description For now this function is limited to the items array in terms of filter functionality
 * @param arr
 * @param filterOptions
 * @returns {*[]}
 */
export const filterArr = (arr, filterOptions) => {
  // First implementing the array of the item object
  // eg, {id: 1, content: '....', status: 1, completedAt: Date}, {...}, {...}
  const incompleteItems = arr.filter((c) => c.status === 0);
  const completedItems = arr.filter((c) => c.status === 1);
  completedItems.sort((a, b) => {
    if (a.completedAt < b.completedAt) {
      return -1;
    }
    if (a.completedAt > b.completedAt) {
      return 1;
    }
    return 0;
  });
  return [...incompleteItems, ...completedItems];
};

export const timeFilter = (arr, value) => {
  const timeValue = parseInt(value.split(":").join(""));
  let theIndex;
  for (let i = 0; i < arr.length; i++) {
    // Removing colon in the time string
    // so that we can compare them as a number
    const timeIter = parseInt(arr[i].label.split(":").join(""));
    if (timeIter > timeValue) {
      theIndex = i;
      break;
    }
  }
  return arr[theIndex];
};

export const isEqual = (a, d) => {
  return JSON.stringify(a) === JSON.stringify(d);
};

export const convertRemindersToTriggers = (rawReminders) => {
  // Here we are just checking that reminders are not none
  if (!rawReminders || rawReminders[0].value === 0) return null;

  // Now, as we got the reminderList
  // We are ready to loop through
  // and generate durations via moment
  return rawReminders.map((reminderObj) => {
    const reminderId = uuidV4();
    return { id: reminderId, trigger: reminderObj.duration };
  });
};

export const convertTriggersToReminders = (triggers = [], isFullDay) => {
  if (!isDefined(triggers)) return;

  let reminderList = remindersWithShortTime;
  if (isFullDay) {
    reminderList = reminderWithLongTime;
  }
  const arr = [];
  triggers.forEach((trigger) => {
    const parsedTrigger = reminderList.find(
      (c) => c.duration === trigger.trigger
    );
    if (!!parsedTrigger) {
      arr.push(parsedTrigger);
    }
  });

  return arr;
};

export const isTriggerDuration = (date, trigger) => {
  const userDate = moment(getMomentDateWithTime(date));
  const today = moment().get();
  const restDuration = moment.duration(userDate.diff(today)).asMinutes();
  const triggerDuration = moment.duration(trigger).asMinutes();
  return triggerDuration > restDuration;
};

export const decodeTaskDateForCalender = (task) => {
  if (!task.startDate) return null;
  const date = moment(task.startDate);
  return {
    date: date.toISOString(),
    time: task.isFullDay ? null : date.format("HH[:]mm"),
    reminders: convertTriggersToReminders(task.reminders, task.isFullDay),
  };
};

export const getBoundaryCoords = (e, ref) => {
  let outOfBoundaryY = e.pageY + ref.current.clientHeight > window.innerHeight;
  let outOfBoundaryX = e.pageX + ref.current.clientWidth > window.innerWidth;
  return {
    x: outOfBoundaryX ? e.pageX - ref.current.clientWidth : e.pageX,
    y: outOfBoundaryY ? e.pageY - ref.current.clientHeight : e.pageY,
  };
};

export const jumpToDate = (task, params) => {
  if (task.isFullDay) {
    if (!params) return moment();
    return moment()
      .add(...params)
      .set({ hour: 0, minute: 0 });
  }
  const curDate = moment(task.startDate);
  const taskTime = {
    hours: curDate.get("hour"),
    minutes: curDate.get("minute"),
  };
  let date = moment().set({ hour: taskTime.hours, minute: taskTime.minutes });
  if (params) date = date.add(...params);
  return date;
};
