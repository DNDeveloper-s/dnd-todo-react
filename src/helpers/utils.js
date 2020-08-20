import produce from "immer";

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

export const removeItemByIdInArray = (arr = [], id = '2', match = '') => {
  const newArr = produce(arr, draftArr => {
    const itemIndex = draftArr.findIndex(item => matchItemId(item, match) === id.toString());
    draftArr.splice(itemIndex, 1);
  });
  return newArr;
};

export const matchItemId = (item, match) => {
  if(typeof item === 'string') return item;
  if(match.length > 0) {
    return item[match].toString();
  }
  if(typeof item === "object") {
    const keys = Object.keys(item);
    if(keys.includes('id')) return item['id'].toString();
    if(keys.includes('_id')) return item['_id'].toString();
  }
};
