import produce from "immer";
import moment from "moment";
import { getToday } from "../components/CalendarPicker/helpers";
import { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import { v4 as uuidV4 } from "uuid";
import { colors } from "../components/ColorPicker/helpers/colors";

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
  const priorities = [
    {
      ind: 0,
      color: "#C4C4C4",
      label: "No Priority",
      iconName: "PriorityNoneIcon",
    },
    {
      ind: 1,
      color: "#4B6FDE",
      label: "Low Priority",
      iconName: "PriorityLowIcon",
    },
    {
      ind: 2,
      color: "#FFC817",
      label: "Medium Priority",
      iconName: "PriorityMediumIcon",
    },
    {
      ind: 3,
      color: "#E13E39",
      label: "High Priority",
      iconName: "PriorityHighIcon",
    },
  ];

  return priorities[ind];
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
 *
 * @param date
 * @returns {boolean}
 */
export const isDueOver = (date) => {
  let a = moment(date);
  let b = moment().get();
  return a.diff(b, "days") < 0;
};

/**
 *
 * @param date {DateConstructor}
 * @param format {Object}
 * @returns {string}
 */

export const getCommonFormatDate = (date, format = {}) =>
  moment(date).calendar(null, {
    sameDay: format.sameDay || "[Today]",
    nextDay: format.nextDay || "[Tomorrow]",
    nextWeek: format.nextWeek || "dddd",
    lastDay: format.lastDay || "[Yesterday]",
    lastWeek: format.lastWeek || "[Last] dddd",
    sameElse: format.sameElse || "ddd, MMM D",
  });

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
