import React, { useState } from "react";
import DoubleAddIcon from "../../../../icons/DoubleAddIcon";
import { getToday } from "../../../CalendarPicker/helpers";
import TagInput from "../../../UI/TagInput/TagInput";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_TASK,
  getColumnOrder,
  // REMOVE_TASK_CLASS,
} from "../../../../features/taskSlice";
import {
  getDayDifference,
  getPriorityByInd,
  wait,
} from "../../../../helpers/utils";
import AddTaskOptions from "./AddTaskOptions";
import { getAllProjects } from "../../../../features/projectSlice";
import PriorityHighIcon from "../../../../icons/PriorityHighIcon";
import PriorityMediumIcon from "../../../../icons/PriorityMediumIcon";
import PriorityLowIcon from "../../../../icons/PriorityLowIcon";
import PriorityNoneIcon from "../../../../icons/PriorityNoneIcon";
import CalendarDropdown from "../../../UI/CalendarDropdown/CalendarDropdown";
import useLabels from "../../../../hooks/useLabels";
import useProjects from "../../../../hooks/useProjects";
import useTasks from "../../../../hooks/useTasks";

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
  const { fetchLabelState } = useLabels();
  const { createTask } = useTasks();
  const { curProject } = useProjects();
  const { addTaskToLabel, createLabel } = useLabels();
  const [selectedProject, setSelectedProject] = useState("inbox");
  const [priority, setPriority] = useState(priorities[3]);
  const [date, setDate] = useState({
    rawData: {
      data: {
        monthDay: getToday().day,
        month: getToday().month,
        year: getToday().year,
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

  function parseEntities(content, taskId) {
    const entityMap = content.entityMap;
    const keys = Object.keys(entityMap);
    return keys.map((key) => {
      const { data } = entityMap[key];
      // If the label entity is not yet created
      // Create it via redux store
      if (data.mention.creating) {
        createLabel(data.mention, taskId);
      }
      return data.mention.id;
    });
  }

  async function onReturn(content, cb) {
    console.log("[AddTask.js || Line no. 16 ....]", content);
    const text = content.blocks[0].text;
    const entityRanges = content.blocks[0].entityRanges;

    // Task Content
    const taskContent = parseTextFromRaw(entityRanges, text);
    const taskId = uuidV4();

    // Label Content
    const labelIds = parseEntities(content, taskId);

    // Updating Label tasks
    labelIds.forEach((labelId) => {
      addTaskToLabel(labelId, taskId);
    });

    // Project Content
    const projectId = selectedProject.id;

    createTask({
      id: taskId,
      content: taskContent,
      labelIds,
      projectId,
      priority: priority.ind,
    });

    cb();
  }

  const labelsArr = fetchLabelState().labels.entities.map((labelId) => {
    const label = fetchLabelState().labels.data[labelId];
    return {
      id: label.id,
      name: label.content,
      avatar: "",
      color: label.color,
      icon: label.icon,
      type: "label",
    };
  });

  // const projectsArr = projects.entities.map((projectId) => {
  //   const project = projects.data[projectId];
  //   return {
  //     id: projectId,
  //     name: project.content,
  //     avatar: "",
  //     color: project.color,
  //     icon: "ProjectsIcon",
  //     type: "project",
  //   };
  // });
  //
  // const priorityArr = priorities.map((p) => {
  //   const priority = getPriorityByInd(p.ind);
  //   return {
  //     id: priority.ind,
  //     name: priority.label.split(" ")[0],
  //     avatar: "",
  //     color: priority.color,
  //     icon: priority.iconName,
  //     type: "priority",
  //   };
  // });

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
          projectsData={[]}
          priorityData={[]}
          placeholder={`Add Task to "${
            curProject(selectedProject).label ||
            curProject(selectedProject).content
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
