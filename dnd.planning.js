const schedule = {
  dueDate: "", // Date Object
  createdTime: "", // Date Object
  completedTime: "", // Date Object
  reminders: [],
  repeats: {},
  repeatCount: null,
  repeatFirstDate: "", // Date Object
};

const repeats = {
  type: "daily, weekly, monthly, yearly",
  untilType: "endless, endByDate, endByRepeatCount",
  endByDate: "", // Date Object,
  endByRepeatCount: 5, // Repeat count {Number}
};
