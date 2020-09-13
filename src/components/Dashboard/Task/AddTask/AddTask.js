import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import DoubleAddIcon from "../../../../icons/DoubleAddIcon";
import TagInput from "../../../UI/TagInput/TagInput";
import {
  convertRemindersToTriggers,
  getCommonFormatDate,
  getDayDifference,
  getMomentDateWithTime,
  isDefined,
} from "../../../../helpers/utils";
import AddTaskOptions from "./AddTaskOptions";
import { priorities } from "../../../../helpers/data";
import CalendarDropdown from "../../../UI/CalendarDropdown/CalendarDropdown";
import useLabels from "../../../../hooks/useLabels";
import useProjects from "../../../../hooks/useProjects";
import useTasks from "../../../../hooks/useTasks";
import useMoment from "../../../../hooks/useMoment";
import AddTaskCalendar from "./AddTaskCalendar";

const AddTask = () => {
  const { moment } = useMoment();
  const { fetchLabelState } = useLabels();
  const { createTask } = useTasks();
  const { curProject } = useProjects();
  const { addTaskToLabel, createLabel } = useLabels();
  const [selectedProjectId, setSelectedProjectId] = useState("inbox");
  const [priority, setPriority] = useState(priorities[3]);
  const [dateData, setDateData] = useState(null);
  const [focusInput, setFocusInput] = useState(true);
  const editorRef = useRef(null);

  // const todayDate = {
  //   date: moment().get().set({ hour: 0, minute: 0, second: 0 }).toString(),
  //   dueOver: false,
  //   diff: "Today",
  // }
  useEffect(() => {
    console.log(dateData);
  }, [dateData]);

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
    const projectId = selectedProjectId;

    // Parsing startDate
    let startDate = null;
    if (dateData) {
      startDate = getMomentDateWithTime(dateData);
    }

    // Task is full day or what
    const isFullDay = !Boolean(dateData?.time);

    createTask({
      id: taskId,
      content: taskContent,
      labelIds,
      projectId,
      priority: priority.ind,
      startDate,
      reminders: convertRemindersToTriggers(dateData?.reminders),
      isFullDay,
    });

    // Setting dateData to null for the calendar actions
    setDateData(null);
    setSelectedProjectId("inbox");
    setPriority(priorities[3]);

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
    // Here, we are just hiding the dropdown and focusing the input element no matter what
    setDropDownVisibility(false);
    editorRef.current.focus();
    // Then checking if we are resetting
    // so just returning by setting it to null
    if (!isDefined(response)) return setDateData(null);
    // If we are here,
    // it means we have got some data to work with
    const { date, time, reminders } = response;
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
          editorRef={editorRef}
          mentionsData={labelsArr}
          projectsData={[]}
          priorityData={[]}
          placeholder={`Add Task to "${
            curProject(selectedProjectId).label ||
            curProject(selectedProjectId).content
          }" ${
            dateData?.date
              ? 'on "' + getCommonFormatDate(dateData, {}, true) + '"'
              : ""
          }, Hit Enter to save...`}
          onReturn={onReturn}
          focusIt={focusInput}
          setFocusIt={setFocusInput}
        />
      </div>
      <div className="add_task-icon">
        <AddTaskCalendar
          direction="bottomLeft"
          dateData={dateData}
          onCalendarModalClose={onCalendarModalClose}
        />
      </div>

      <div className="vertical_separator" />
      <div className="add_task-icon fill caret">
        <AddTaskOptions
          priority={priority}
          priorities={priorities}
          selectedProject={selectedProjectId}
          onPrioritySelect={setPriority}
          onProjectSelect={setSelectedProjectId}
        />
      </div>
    </div>
  );
};

export default AddTask;
