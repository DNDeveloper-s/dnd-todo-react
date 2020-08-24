import React, { useState } from "react";
import DoubleAddIcon from "../../../../icons/DoubleAddIcon";
import { getToday } from "../../../CalendarPicker/helpers";
import TagInput from "../../../UI/TagInput/TagInput";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_TASK,
  getColumnOrder,
  REMOVE_TASK_CLASS,
} from "../../../../features/taskSlice";
import {
  getDayDifference,
  getPriorityByInd,
  wait,
} from "../../../../helpers/utils";
import {
  getAllLabels,
  ADD_LABEL_TASK,
  CREATE_LABEL,
} from "../../../../features/labelSlice";
import AddTaskOptions from "./AddTaskOptions";
import { getAllProjects } from "../../../../features/projectSlice";
import PriorityHighIcon from "../../../../icons/PriorityHighIcon";
import PriorityMediumIcon from "../../../../icons/PriorityMediumIcon";
import PriorityLowIcon from "../../../../icons/PriorityLowIcon";
import PriorityNoneIcon from "../../../../icons/PriorityNoneIcon";
import CalendarDropdown from "../../../UI/CalendarDropdown/CalendarDropdown";

// Components Imports

// Images Imports

const priorities = [
  { id: "1", ind: 3, label: "High Priority", IconComponent: PriorityHighIcon },
  {
    id: "2",
    ind: 2,
    label: "Medium Priority",
    IconComponent: PriorityMediumIcon,
  },
  { id: "3", ind: 1, label: "Low Priority", IconComponent: PriorityLowIcon },
  { id: "4", ind: 0, label: "No Priority", IconComponent: PriorityNoneIcon },
];

const AddTask = () => {
  const dispatch = useDispatch();
  const columnOrder = useSelector(getColumnOrder);
  const labels = useSelector(getAllLabels);
  const projects = useSelector(getAllProjects);
  const [selectedProject, setSelectedProject] = useState(
    projects.data[projects.entities[0]]
  );
  const [priority, setPriority] = useState(priorities[3]);
  const [date, setDate] = useState({
    rawData: {
      data: {
        monthDay: getToday().day,
        month: getToday().month,
        year: getToday().year
      },
    },
  });

  function parseTextFromRaw(entityRanges, text) {
    const parsedTextArr = [];

    for (let i = 0; i < text.length; i++) {
      if (checkIfItComesUnder(i)) continue;
      parsedTextArr.push(text[i]);
    }

    function checkIfItComesUnder(pos) {
      for (let i = 0; i < entityRanges.length; i++) {
        const range = entityRanges[i];
        if (pos >= range.offset && pos <= range.offset + range.length) {
          return true;
        }
      }
      return false;
    }

    return parsedTextArr.join("");
  }

  function parseEntities(content) {
    const entityMap = content.entityMap;
    const keys = Object.keys(entityMap);
    return keys.map((key) => {
      const { data } = entityMap[key];
      // If the label entity is not yet created
      // Create it via redux store
      if (data.mention.creating) {
        createNewAddedLabel(data.mention);
      }
      return data.mention.id;
    });
  }

  function createNewAddedLabel(label) {
    dispatch(
      CREATE_LABEL({
        id: label.id,
        color: label.color,
        content: label.name,
      })
    );
  }

  async function onReturn(content, cb) {
    console.log("[AddTask.js || Line no. 16 ....]", content);
    const text = content.blocks[0].text;
    const entityRanges = content.blocks[0].entityRanges;

    // Task Content
    const taskContent = parseTextFromRaw(entityRanges, text);
    const taskId = uuidV4();

    // Label Content
    const labelIds = parseEntities(content);
    console.log("[AddTask.js || Line no. 54 ....]", labelIds);

    // Updating Label tasks
    labelIds.forEach((labelId) => {
      dispatch(ADD_LABEL_TASK({ labelId, taskId }));
    });

    // Project Content
    const projectIds = [selectedProject.id];

    console.log('[AddTask.js || Line no. 133 ....]', date);

    dispatch(
      CREATE_TASK({
        id: taskId,
        content: taskContent,
        columnId: columnOrder[0],
        elClasses: ["disappearWithHeightTransition"],
        labelIds,
        projectIds,
        priority: priority.ind,
        createdTime: Date.now(),
        repeatFirstDate: JSON.stringify(date.date),
      })
    );

    await wait(200);

    dispatch(
      REMOVE_TASK_CLASS({
        taskId: taskId,
        removeAll: true,
      })
    );

    cb();
  }

  const labelsArr = labels.entities.map((labelId) => {
    const label = labels.data[labelId];
    return {
      id: label.id,
      name: label.content,
      avatar: "",
      color: label.color,
      icon: label.icon,
      type: "label",
    };
  });

  const projectsArr = projects.entities.map((projectId) => {
    const project = projects.data[projectId];
    return {
      id: projectId,
      name: project.content,
      avatar: "",
      color: project.color,
      icon: "ProjectsIcon",
      type: "project",
    };
  });

  const priorityArr = priorities.map((p) => {
    const priority = getPriorityByInd(p.ind);
    return {
      id: priority.ind,
      name: priority.label.split(" ")[0],
      avatar: "",
      color: priority.color,
      icon: priority.iconName,
      type: "priority",
    };
  });

  function onDateChange(data) {
    const dayDiff = getDayDifference({
      dateObj: data.date,
      day: data.rawData.data.monthDay,
      month: data.rawData.data.month,
      year: data.rawData.data.year,
    });
    setDate({
      ...data,
      diff: dayDiff.momentDate,
      dueOver: dayDiff.dueOver,
    });
  }

  return (
    <div className="add_task">
      <div className="add_task-icon fill">
        <DoubleAddIcon />
      </div>
      <div className="add_task-input">
        <TagInput
          mentionsData={labelsArr}
          projectsData={projectsArr}
          priorityData={priorityArr}
          placeholder={`Add Task to "${
            selectedProject.label || selectedProject.content
          }" ${
            date.date ? 'on "' + date.diff + '"' : 'on "Today"'
          }, Please Enter to save...`}
          onReturn={onReturn}
        />
      </div>
      <div className="add_task-icon">
        <CalendarDropdown initialDate={date} onDateChange={onDateChange} />
      </div>

      <div className="vertical_separator" />
      <div className="add_task-icon fill caret">
        <AddTaskOptions
          priority={priority}
          priorities={priorities}
          selectedProject={selectedProject}
          onPrioritySelect={setPriority}
          onProjectSelect={setSelectedProject}
        />
      </div>
    </div>
  );
};

export default AddTask;
