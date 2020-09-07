import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import DoubleAddIcon from "../../../../icons/DoubleAddIcon";
import TagInput from "../../../UI/TagInput/TagInput";
import { getDayDifference, isDefined } from "../../../../helpers/utils";
import AddTaskOptions from "./AddTaskOptions";
import PriorityHighIcon from "../../../../icons/PriorityHighIcon";
import PriorityMediumIcon from "../../../../icons/PriorityMediumIcon";
import PriorityLowIcon from "../../../../icons/PriorityLowIcon";
import PriorityNoneIcon from "../../../../icons/PriorityNoneIcon";
import CalendarDropdown from "../../../UI/CalendarDropdown/CalendarDropdown";
import useLabels from "../../../../hooks/useLabels";
import useProjects from "../../../../hooks/useProjects";
import useTasks from "../../../../hooks/useTasks";
import useMoment from "../../../../hooks/useMoment";

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
  const { moment } = useMoment();
  const { fetchLabelState } = useLabels();
  const { createTask } = useTasks();
  const { curProject } = useProjects();
  const { addTaskToLabel, createLabel } = useLabels();
  const [selectedProject, setSelectedProject] = useState("inbox");
  const [priority, setPriority] = useState(priorities[3]);
  const [dateData, setDateData] = useState(null);

  // const todayDate = {
  //   date: moment().get().set({ hour: 0, minute: 0, second: 0 }).toString(),
  //   dueOver: false,
  //   diff: "Today",
  // }

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

    // Parsing startDate
    let startDate = null;
    if (dateData) {
      const timeArr = dateData.time ? dateData.time.split(":") : [0, 0];
      startDate = moment(dateData.date)
        .set({
          hour: timeArr[0],
          minute: timeArr[1],
        })
        .toISOString();
    }

    createTask({
      id: taskId,
      content: taskContent,
      labelIds,
      projectId,
      priority: priority.ind,
      startDate,
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

  function onCalendarModalClose(response, setDropDownVisibility) {
    // Here, we are just hiding the dropdown no matter what
    setDropDownVisibility(false);
    // Then checking if we are resetting
    // so just returning by setting it to null
    if (!isDefined(response)) return setDateData(null);
    // If we are here,
    // it means we have got some data to work with
    const { date, time, reminders } = response;
    console.log(response);
    const dayDiff = getDayDifference(date);
    setDateData({
      date: moment(date).toISOString(),
      diff: dayDiff.momentDate,
      time,
      reminders,
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
            dateData
              ? dateData.date
                ? 'on "' + dateData.diff + '"'
                : 'on "Today"'
              : ""
          }, Hit Enter to save...`}
          onReturn={onReturn}
        />
      </div>
      <div className="add_task-icon">
        <CalendarDropdown
          initialDate={dateData}
          onCalendarModalClose={onCalendarModalClose}
        />
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
