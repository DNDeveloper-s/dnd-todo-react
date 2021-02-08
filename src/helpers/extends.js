// if (!String.prototype.spliceAt) {

//   // eslint-disable-next-line no-extend-native
//   String.prototype.spliceAt = ;
// }
/**
 * {JSDoc}
 *
 * The splice() method changes the content of a string by removing a range of
 * characters and/or adding new characters.
 *
 * @param string
 * @param {number} start Index at which to start changing the string.
 * @param {number} delCount An integer indicating the number of old chars to remove.
 * @param {string} newSubStr The String that is spliced in.
 * @return {string} A new string with the spliced substring.
 */
export function spliceAt(string, start, delCount, newSubStr) {
  return string.slice(0, start) + newSubStr + string.slice(start + Math.abs(delCount));
}
