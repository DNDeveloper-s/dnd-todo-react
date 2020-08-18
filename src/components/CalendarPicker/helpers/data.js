const monthData = {
  jan: {
    name: "January",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "dec",
      num: 12,
    },
    nextMonth: {
      abbr: "feb",
      num: 2,
    },
  },
  feb: {
    name: "February",
    getFinalDate: (curYear) => (curYear % 4 === 0 ? 29 : 28),
    prevMonth: {
      abbr: "jan",
      num: 1,
    },
    nextMonth: {
      abbr: "mar",
      num: 3,
    },
  },
  mar: {
    name: "March",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "feb",
      num: 2,
    },
    nextMonth: {
      abbr: "apr",
      num: 4,
    },
  },
  apr: {
    name: "April",
    getFinalDate: () => 30,
    prevMonth: {
      abbr: "mar",
      num: 3,
    },
    nextMonth: {
      abbr: "may",
      num: 5,
    },
  },
  may: {
    name: "May",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "apr",
      num: 4,
    },
    nextMonth: {
      abbr: "jun",
      num: 6,
    },
  },
  jun: {
    name: "June",
    getFinalDate: () => 30,
    prevMonth: {
      abbr: "may",
      num: 5,
    },
    nextMonth: {
      abbr: "jul",
      num: 7,
    },
  },
  jul: {
    name: "July",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "jun",
      num: 6,
    },
    nextMonth: {
      abbr: "aug",
      num: 8,
    },
  },
  aug: {
    name: "August",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "jul",
      num: 7,
    },
    nextMonth: {
      abbr: "sep",
      num: 9,
    },
  },
  sep: {
    name: "September",
    getFinalDate: () => 30,
    prevMonth: {
      abbr: "aug",
      num: 8,
    },
    nextMonth: {
      abbr: "oct",
      num: 10,
    },
  },
  oct: {
    name: "October",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "sep",
      num: 9,
    },
    nextMonth: {
      abbr: "nov",
      num: 11,
    },
  },
  nov: {
    name: "November",
    getFinalDate: () => 30,
    prevMonth: {
      abbr: "oct",
      num: 10,
    },
    nextMonth: {
      abbr: "dec",
      num: 12,
    },
  },
  dec: {
    name: "December",
    getFinalDate: () => 31,
    prevMonth: {
      abbr: "nov",
      num: 11,
    },
    nextMonth: {
      abbr: "jan",
      num: 1,
    },
  },
};

const dayData = {
  Sun: {
    num: 1,
    name: "Sunday",
  },
  Mon: {
    num: 2,
    name: "Monday",
  },
  Tue: {
    num: 3,
    name: "Tuesday",
  },
  Wed: {
    num: 4,
    name: "Wednesday",
  },
  Thu: {
    num: 5,
    name: "Thursday",
  },
  Fri: {
    num: 6,
    name: "Friday",
  },
  Sat: {
    num: 7,
    name: "Saturday",
  },
};

const timeList = [
  { value: 0, label: "00:00" },
  { value: 1, label: "00:30" },
  { value: 2, label: "01:00" },
  { value: 3, label: "01:30" },
  { value: 4, label: "02:00" },
  { value: 5, label: "02:30" },
  { value: 6, label: "03:00" },
  { value: 7, label: "03:30" },
  { value: 8, label: "04:00" },
  { value: 9, label: "04:30" },
  { value: 10, label: "05:00" },
  { value: 11, label: "05:30" },
  { value: 12, label: "06:00" },
  { value: 13, label: "06:30" },
  { value: 14, label: "07:00" },
  { value: 15, label: "07:30" },
  { value: 16, label: "08:00" },
  { value: 17, label: "08:30" },
  { value: 18, label: "09:00" },
  { value: 19, label: "09:30" },
  { value: 20, label: "10:00" },
  { value: 21, label: "10:30" },
  { value: 22, label: "11:00" },
  { value: 23, label: "11:30" },
  { value: 24, label: "12:00" },
  { value: 25, label: "12:30" },
  { value: 26, label: "13:00" },
  { value: 27, label: "13:30" },
  { value: 28, label: "14:00" },
  { value: 29, label: "14:30" },
  { value: 30, label: "15:00" },
  { value: 31, label: "15:30" },
  { value: 32, label: "16:00" },
  { value: 33, label: "16:30" },
  { value: 34, label: "17:00" },
  { value: 35, label: "17:30" },
  { value: 36, label: "18:00" },
  { value: 37, label: "18:30" },
  { value: 38, label: "19:00" },
  { value: 39, label: "19:30" },
  { value: 40, label: "20:00" },
  { value: 41, label: "20:30" },
  { value: 42, label: "21:00" },
  { value: 43, label: "21:30" },
  { value: 44, label: "22:00" },
  { value: 45, label: "22:30" },
  { value: 46, label: "23:00" },
  { value: 47, label: "23:30" },
];

const reminder = [
  {
    value: 0,
    label: "None",
  },
  {
    value: 1,
    label: "On time",
  },
  {
    value: 2,
    label: "5 minutes ahead",
  },
  {
    value: 3,
    label: "30 minutes ahead",
  },
  {
    value: 4,
    label: "1 hour ahead",
  },
  {
    value: 5,
    label: "1 day ahead",
  },
  {
    value: 6,
    label: "Custom",
  },
];

const repeat = [
  {
    value: 0,
    label: "None",
  },
  {
    value: 1,
    label: "Daily",
  },
  {
    value: 2,
    label: "Weekly",
  },
  {
    value: 3,
    label: "Monthly",
  },
  {
    value: 4,
    label: "Yearly",
  },
  {
    value: 5,
    label: "Custom",
  },
];

export { dayData, monthData, reminder, repeat, timeList };
