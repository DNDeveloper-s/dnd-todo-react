import produce from "immer";
import moment from "moment";
import { getToday } from "../components/CalendarPicker/helpers";

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
  return produce(arr, (draftArr) => {
    const itemIndex = draftArr.findIndex(
      (item) => matchItemId(item, match) === id.toString()
    );
    draftArr.splice(itemIndex, 1);
  });
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
  let momentDate = getCommonFormatDate(date.dateObj);

  // if (momentDate.split("/")[1]) {
  //   momentDate = moment(date.dateObj).format("ddd, MMM D");
  // }

  let a = moment([date.year, date.month, date.day]);
  let b = moment([getToday().year, getToday().month, getToday().day]);

  return { momentDate, dueOver: a.diff(b, "days") < 0 };
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
