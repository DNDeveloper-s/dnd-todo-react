import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, UPDATE_TASK } from "../../../features/taskSlice";
import "./dashboardDetailsBar.scss";
import PriorityHighIcon from "../../../icons/PriorityHighIcon";
import CheckBox from "../../UI/CheckBox/CheckBox";
import CaretRightIcon from "../../../icons/CaretRightIcon";
import ParagraphIcon from "../../../icons/ParagraphIcon";
import DescriptionEditor from "./DescriptionEditor";
import CheckListItemHandle from "./CheckListItemHandle";
import LabelsWrapper from "./Labels/LabelsWrapper";
import SubTaskIcon from "../../../icons/SubTaskIcon";
import NoMatchedTask from "../Task/NoMatchedTask";
import CalendarDropdown from "../../UI/CalendarDropdown/CalendarDropdown";
import {
  convertTriggersToReminders,
  decodeTaskDateForCalender,
  fromNow,
  getCommonFormatDate,
  getDayDifference,
  isDefined,
} from "../../../helpers/utils";
import { getToday } from "../../CalendarPicker/helpers";
import CheckList from "./CheckListItems/CheckList";
import ListIcon from "../../../icons/ListIcon";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { v4 as uuidV4 } from "uuid";
import ProgressBar from "../../UI/ProgressBar";
import useLabels from "../../../hooks/useLabels";
import useTasks from "../../../hooks/useTasks";
import ListItem from "../Task/TaskList/ListItem";
import { constants } from "../../../helpers/constants";
import useTreeDataUtils from "../../../hooks/useTreeDataUtils";
import useFocus from "../../../hooks/useFocus";

const DetailsBar = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { fetchLabelState } = useLabels();
  const { getExpandedTreeArr, setDragState } = useTreeDataUtils();
  const { focusId, setFocusId } = useFocus(null);
  const [dateData, setDateData] = useState(null);
  const {
    curTask,
    fetchActiveTask,
    fetchTaskState,
    parentTask,
    updateActiveTask,
    updateTask,
    updateStatus,
    taskProgress,
  } = useTasks();
  const {
    match: { params },
  } = props;

  useEffect(() => {
    if (typeof params === "object") {
      // Updating the task
      updateActiveTask(params.taskId);
    }
  }, [params.taskId]);

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

  // function onDateChange(data) {
  //   const dayDiff = getDayDifference({
  //     dateObj: data.date,
  //     day: data.rawData.data.monthDay,
  //     month: data.rawData.data.month,
  //     year: data.rawData.data.year,
  //   });
  //   setDate({
  //     ...data,
  //     diff: dayDiff.momentDate,
  //     dueOver: dayDiff.dueOver,
  //   });
  // }

  function toggleItemMode() {
    const parsedContent = editorState.getCurrentContent();
    const content = convertToRaw(parsedContent);

    convertTriggersToReminders(curTask(fetchActiveTask()).reminders);

    let itemsFromBlock = [];
    if (!curTask(fetchActiveTask()).inItemMode) {
      itemsFromBlock = content.blocks.map((block) => ({
        id: uuidV4(),
        status: 0,
        content: block.text,
      }));
      setEditorState(EditorState.createEmpty());
    } else {
      content.blocks.push(
        ...curTask(fetchActiveTask()).items.map((item) => ({
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: item.id,
          text: item.content,
          type: "unstyled",
        }))
      );
      const newContentState = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(newContentState));
    }
    updateTask({
      taskId: curTask(fetchActiveTask()).id,
      inItemMode: !curTask(fetchActiveTask()).inItemMode,
      items: itemsFromBlock,
    });
  }

  function handleParentTaskClick() {
    props.match.params.taskId = "task-1";
    const matchedUrl = props.match.url;
    const pathArr = matchedUrl.split("/");
    // Removing current taskId
    pathArr.pop();
    // And then adding the currentTaskId
    pathArr.push(parentTask(fetchActiveTask()).id);
    props.history.push(pathArr.join("/"));
  }

  function onTitleChange(e) {
    updateTask({
      taskId: fetchActiveTask(),
      content: e.target.value,
    });
  }

  function onToggleCheckBox(isActive) {
    updateStatus(fetchActiveTask(), isActive);
  }

  function onCalendarModalClose(response, setDropDownVisibility) {
    // Here, we are just hiding the dropdown and focusing the input element no matter what
    setDropDownVisibility(false);
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

  return curTask(fetchActiveTask()) ? (
    <>
      <div className="dashboard-detailsBar-header">
        <CheckBox
          initialValue={curTask(fetchActiveTask()).status.completed}
          onChange={onToggleCheckBox}
        />
        <div className="vertical_separator" />
        <div className="dashboard-detailsBar-header-title">
          <div className="dashboard-detailsBar-header-title-icon">
            <CalendarDropdown
              onCalendarModalClose={onCalendarModalClose}
              dateData={decodeTaskDateForCalender(curTask(fetchActiveTask()))}
            />
          </div>
          <div className="dashboard-detailsBar-header-title-label">
            <p>{fromNow(curTask(fetchActiveTask())) || "Repeat first date"}</p>
          </div>
        </div>
        <div className="dashboard-detailsBar-header-icon">
          <PriorityHighIcon />
        </div>
        <div className="dashboard-detailsBar-progress_bar">
          <ProgressBar progress={taskProgress(fetchActiveTask())} />
        </div>
      </div>
      {curTask(fetchActiveTask()).parentTask && (
        <div
          className="dashboard-detailsBar-parent_task"
          onClick={handleParentTaskClick}
        >
          <div className="dashboard-detailsBar-parent_task-title">
            <p>{parentTask(fetchActiveTask()).content}</p>
          </div>
          <div className="dashboard-detailsBar-parent_task-icon">
            <CaretRightIcon />
          </div>
        </div>
      )}
      <div className="dashboard-detailsBar-title">
        <input
          type="text"
          value={curTask(fetchActiveTask()).content}
          onChange={onTitleChange}
        />
        <div
          className="dashboard-detailsBar-title-toggle_task_mode"
          onClick={toggleItemMode}
        >
          {curTask(fetchActiveTask()).inItemMode ? (
            <ListIcon />
          ) : (
            <ParagraphIcon />
          )}
        </div>
      </div>
      <div className="dashboard-detailsBar-desc">
        <DescriptionEditor
          task={curTask(fetchActiveTask())}
          {...{ editorState, setEditorState }}
          labelsData={labelsArr}
        />
      </div>
      {curTask(fetchActiveTask()).inItemMode && (
        <div className="dashboard-detailsBar-innerItems">
          <CheckList />
        </div>
      )}
      <div className="dashboard-detailsBar-labelsList">
        <LabelsWrapper
          taskLabels={curTask(fetchActiveTask()).labelIds}
          taskId={fetchActiveTask()}
          labels={labelsArr}
        />
      </div>
      {curTask(fetchActiveTask()).childTasks.length > 0 && (
        <div className="dashboard-detailsBar-subTasks">
          <div className="dashboard-detailsBar-subTasks-header">
            <div className="dashboard-detailsBar-subTasks-header-icon">
              <SubTaskIcon />
            </div>
            <div className="dashboard-detailsBar-subTasks-header-title">
              <p>SubTask</p>
            </div>
          </div>
          <div
            className="dashboard-detailsBar-subTasks-items"
            style={{
              height:
                getExpandedTreeArr(constants.DRAG_FROM.DETAIL, "incomplete", {
                  forTaskId: fetchActiveTask(),
                }).length * constants.ITEM_HEIGHT,
              transition: "height 0.3s cubic-bezier(0, 0.86, 0.61, 1.15) 0s",
            }}
          >
            {getExpandedTreeArr(constants.DRAG_FROM.DETAIL, "all", {
              forTaskId: fetchActiveTask(),
            }).map((taskId, index) => {
              return (
                <ListItem
                  key={taskId}
                  config={{
                    itemType: constants.ITEM_TYPES.TASK,
                    dragFrom: constants.DRAG_FROM.DETAIL,
                  }}
                  elementStyle={{ paddingLeft: 12 }}
                  handleStyle={{ left: "-10px" }}
                  bgStyle={{ left: "5px" }}
                  expandBtnStyle={{ left: "10px" }}
                  originTask={fetchActiveTask()}
                  index={index}
                  filter="all"
                  active={false}
                  item={curTask(taskId)}
                  startsDragging={setDragState}
                  onTitleClick={() => console.log("Title clicked!!")}
                  focusId={focusId}
                  setFocusId={setFocusId}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  ) : (
    <NoMatchedTask />
  );
};

export default React.memo(DetailsBar);
