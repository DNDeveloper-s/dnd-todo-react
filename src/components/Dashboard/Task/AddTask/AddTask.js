import React, {useState} from "react";
import DoubleAddIcon from "../../../../icons/DoubleAddIcon";
import CaretDownFillIcon from "../../../../icons/CaretDownFillIcon";
import CalendarWithDate from "../../../UI/CalendarWithDate/CalendarWithDate";
import { getToday } from "../../../CalendarPicker/helpers";
import TagInput from "../../../UI/TagInput/TagInput";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_TASK,
  getColumnOrder,
  REMOVE_TASK_CLASS,
} from "../../../../features/taskSlice";
import { wait } from "../../../../helpers/utils";
import {
  getAllLabels,
  ADD_LABEL_TASK,
  CREATE_LABEL,
} from "../../../../features/labelSlice";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import HorizontalSelect from "../../../UI/HorizontalSelect/HorizontalSelect";
import CalendarPicker from "../../../CalendarPicker/CalendarPicker";
import ProjectsIcon from "../../../../icons/ProjectsIcon";
import AddTaskOptions from "./AddTaskOptions";
import {colors} from "../../../ColorPicker/helpers/colors";
import {getAllProjects} from "../../../../features/projectSlice";

// Components Imports

// Images Imports

const AddTask = () => {
  const dispatch = useDispatch();
  const columnOrder = useSelector(getColumnOrder);
  const labels = useSelector(getAllLabels);
  const projects = useSelector(getAllProjects);
  const [selectedProject, setSelectedProject] = useState(projects.data[projects.entities[0]]);
  const [priority, setPriority] = useState(null);

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

    dispatch(
      CREATE_TASK({
        id: taskId,
        content: taskContent,
        columnId: columnOrder[0],
        elClasses: ["disappearWithHeightTransition"],
        labelIds,
        projectIds
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
    };
  });

  return (
    <div className="add_task">
      <div className="add_task-icon fill">
        <DoubleAddIcon />
      </div>
      <div className="add_task-input">
        <TagInput
          mentionsData={labelsArr}
          placeholder={`Add Task to "${selectedProject.label || selectedProject.content}", Please Enter to save...`}
          onReturn={onReturn} />
      </div>
      <div className="add_task-icon">
        <Dropdown
          handle={<CalendarWithDate date={getToday().day} />}
          ItemComponent={() => {
            return <CalendarPicker />;
          }}
        />
      </div>
      <div className="vertical_separator" />
      <div className="add_task-icon fill caret">
        <AddTaskOptions selectedProject={selectedProject} onPrioritySelect={setPriority} onProjectSelect={setSelectedProject} />
      </div>
    </div>
  );
};

export default AddTask;
