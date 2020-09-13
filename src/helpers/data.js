import PriorityHighIcon from "../icons/PriorityHighIcon";
import PriorityMediumIcon from "../icons/PriorityMediumIcon";
import PriorityLowIcon from "../icons/PriorityLowIcon";
import PriorityNoneIcon from "../icons/PriorityNoneIcon";
import TodayIcon from "../icons/TodayIcon";
import TomorrowIcon from "../icons/TomorrowIcon";
import NextWeekIcon from "../icons/NextWeekIcon";
import NextMonthIcon from "../icons/NextMonthIcon";
import NextRecurrenceIcon from "../icons/NextRecurrenceIcon";

export const priorities = [
  {
    id: "priorities-1",
    ind: 3,
    label: "High",
    color: "#E13E39",
    IconComponent: PriorityHighIcon,
  },
  {
    id: "priorities-2",
    ind: 2,
    color: "#FFC817",
    label: "Medium",
    IconComponent: PriorityMediumIcon,
  },
  {
    id: "priorities-3",
    ind: 1,
    label: "Low",
    color: "#4B6FDE",
    IconComponent: PriorityLowIcon,
  },
  {
    id: "priorities-4",
    ind: 0,
    color: "#C4C4C4",
    label: "None",
    IconComponent: PriorityNoneIcon,
  },
];

export const recurrences = [
  {
    id: "recurrences-1",
    label: "Today",
    params: null,
    IconComponent: TodayIcon,
  },
  {
    id: "recurrences-2",
    label: "Tomorrow",
    params: [1, "d"],
    IconComponent: TomorrowIcon,
  },
  {
    id: "recurrences-3",
    label: "Next Week",
    params: [1, "w"],
    IconComponent: NextWeekIcon,
  },
  {
    id: "recurrences-4",
    label: "Next Month",
    params: [1, "M"],
    IconComponent: NextMonthIcon,
  },
  // {
  //   id: "recurrences-4",
  //   label: "Skip the recurrence",
  //   IconComponent: NextRecurrenceIcon,
  // },
];
