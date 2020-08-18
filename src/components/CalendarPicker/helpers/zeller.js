import {daysAbbr, monthsAbbr} from "./abbr";

const zellerMonths = {
  jan: {
    getYear: (curYear) => ({
      lastTwo: (curYear - 1) % 100,
      firstTwo: (curYear - 1) / 100
    })
  },
  feb: {
    getYear: (curYear) => ({
      lastTwo: (curYear - 1) % 100,
      firstTwo: (curYear - 1) / 100
    })
  },
  mar: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  apr: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  may: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  jun: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  jul: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  aug: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  sep: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  oct: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  nov: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
  dec: {
    getYear: (curYear) => ({
      lastTwo: curYear % 100,
      firstTwo: curYear / 100
    })
  },
}


const zellerWeekDay = (date, month, year) => {
  const D = zellerMonths[monthsAbbr[month].toLowerCase()].getYear(year).lastTwo;
  const C = Math.floor(zellerMonths[monthsAbbr[month].toLowerCase()].getYear(year).firstTwo);

  // console.log('[zeller.js || Line no. 83 ....]', C, D);

  if(month === 1 || month === 2) {
    // Month count in zeller's theory is December is 12, Jan is 13, Feb is 14 and Mar is 3 and so on.
    month += 12;
  }

  const h = (date + Math.floor((13 * (month + 1)) / 5) + D + Math.floor(D / 4) + Math.floor(C / 4) + 5 * C) % 7;

  return { dayAbbr: daysAbbr[h], day: h };
};

export default zellerWeekDay;
