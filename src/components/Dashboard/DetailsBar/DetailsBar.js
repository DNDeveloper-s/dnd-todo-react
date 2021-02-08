import React, {useCallback, useEffect, useState} from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { ObjectId } from "bson";
import fileSize from "filesize";

import "./dashboardDetailsBar.scss";
import CheckBox from "../../UI/CheckBox/CheckBox";
import CaretRightIcon from "../../../icons/CaretRightIcon";
import ParagraphIcon from "../../../icons/ParagraphIcon";
import DescriptionEditor from "./DescriptionEditor";
import LabelsWrapper from "./Labels/LabelsWrapper";
import SubTaskIcon from "../../../icons/SubTaskIcon";
import NoMatchedTask from "../Task/NoMatchedTask";
import {
  convertTriggersToReminders,
  fromNow,
  classNames,
  getPriorityByInd, isDefined,
} from "../../../helpers/utils";
import CheckList from "./CheckListItems/CheckList";
import ListIcon from "../../../icons/ListIcon";
import ProgressBar from "../../UI/ProgressBar";
import useLabels from "../../../hooks/useLabels";
import useTasks from "../../../hooks/useTasks";
import ListItem from "../Task/TaskList/ListItem";
import { constants } from "../../../helpers/constants";
import useTreeDataUtils from "../../../hooks/useTreeDataUtils";
import useFocus from "../../../hooks/useFocus";
import DetailsBarCalendar from "./DetailsBarCalendar";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { priorities } from "../../../helpers/data";
import DetailsBarFooter from "./DetailsBarFooter/DetailsBarFooter";
import PDFIcon from "../../../icons/PDFIcon";
import DownloadIcon from "../../../icons/DownloadIcon";
import DeleteIcon from "../../../icons/DeleteIcon";

const DetailsBar = (props) => {
  const [attachments, setAttachments] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { fetchLabelState } = useLabels();
  const { getExpandedTreeArr, setDragState } = useTreeDataUtils();
  const { focusId, setFocusId } = useFocus(null);
  const [commentState, setCommentState] = useState({isVisible: false, value: '', data: []});
  const {
    curTask,
    fetchActiveTask,
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
    // console.log(props);
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
        id: new ObjectId().toString(),
        status: 0,
        content: block.text,
      }));
      setEditorState(require("draftjs-utils").clearEditorContent(editorState));
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

  function onPrioritySelect(priorityObj, setVisible) {
    // console.log("Nice one");
    updateTask({ taskId: fetchActiveTask(), priority: priorityObj.ind });
    setVisible(false);
  }

  function onUpload(files) {
    const newAttachments = [...attachments];
    newAttachments.push(files[0]);
    setAttachments(newAttachments);
  }

  const handleValue = useCallback((value) => {
    setCommentState({...commentState, value: isDefined(value) ? value : ''});
  },[commentState]);

  const toggleVisible = useCallback((showComment) => {
    setCommentState({...commentState, isVisible: isDefined(showComment) ? showComment : !commentState.isVisible});
  }, [commentState]);

  const postComment = useCallback(({author, value}) => {
    const oldData = [...commentState.data];
    oldData.push({id: new ObjectId().toString(), author, value, timeStamp: new Date()});
    setCommentState({...commentState, data: oldData, value: ""});
  }, [commentState]);

  return curTask(fetchActiveTask()) ? (
    <>
      <div className="dashboard-detailsBar-scroll-container">
        <div className="dashboard-detailsBar-scroll-container-editorView">
          <div className="dashboard-detailsBar-header">
            <CheckBox
              initialValue={curTask(fetchActiveTask()).status.completed}
              onChange={onToggleCheckBox}
              priority={curTask(fetchActiveTask()).priority}
            />
            <div className="vertical_separator" />
            <div className="dashboard-detailsBar-header-title">
              <div className="dashboard-detailsBar-header-title-icon">
                <DetailsBarCalendar task={curTask(fetchActiveTask())} />
              </div>
              <div
                className={classNames("dashboard-detailsBar-header-title-label", {
                  empty: !fromNow(curTask(fetchActiveTask())),
                })}
              >
                <p>{fromNow(curTask(fetchActiveTask())) || "Due Date"}</p>
              </div>
            </div>
            <div className="dashboard-detailsBar-header-icon">
              <Dropdown
                direction="bottomLeft"
                handle={getPriorityByInd(
                  curTask(fetchActiveTask()).priority
                ).IconComponent({})}
                containerStyle={{ minWidth: "12rem" }}
                ItemComponent={(setVisible) =>
                  priorities.map((priority) => (
                    <div
                      className={
                        "flexCentered justifyStart itemHoverEffect pointer pv-10 pl-10 pr-20"
                      }
                      onClick={() => onPrioritySelect(priority, setVisible)}
                      key={priority.ind}
                    >
                      <div className="flexCentered mr-10" style={{ zoom: 0.8 }}>
                        <priority.IconComponent />
                      </div>
                      <div
                        className={classNames("black-70 heading_6 nowrap", {
                          ["primary semiBold"]:
                          priority.ind === curTask(fetchActiveTask()).priority,
                        })}
                      >
                        {priority.label.split(" ")[0]}
                      </div>
                    </div>
                  ))
                }
              />
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
                    getExpandedTreeArr(constants.DRAG_FROM.DETAIL, {
                      forTaskId: fetchActiveTask(),
                    }).treeArr.length * constants.ITEM_HEIGHT,
                  transition: "height 0.3s cubic-bezier(0, 0.86, 0.61, 1.15) 0s",
                }}
              >
                {getExpandedTreeArr(constants.DRAG_FROM.DETAIL, {
                  forTaskId: fetchActiveTask(),
                  filters: { deleted: 0 },
                }).treeArr.map((taskId, index) => {
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
                      onTitleBlur={() => console.log("Title blurred!!")}
                      focusId={focusId}
                      setFocusId={setFocusId}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {/* Dynamic Attachments will go here. */}
        <div className="dashboard-detailsBar-attachmentsList">
          {attachments.map(attachment => (
            <div className="dashboard-detailsBar-attachmentsList-item">
              <div className="dashboard-detailsBar-attachmentsList-item-main-view">
                <div className="dashboard-detailsBar-attachmentsList-item-icon">
                  <PDFIcon />
                </div>
                <div className="dashboard-detailsBar-attachmentsList-item-label">
                  <p>{attachment.name}</p>
                </div>
              </div>
              <div className="dashboard-detailsBar-attachmentsList-item-size-display">
                <p>{fileSize(attachment.size)}</p>
              </div>
              <div className="dashboard-detailsBar-attachmentsList-item-options-view">
                <div className="dashboard-detailsBar-attachmentsList-item-options-icon">
                  <DownloadIcon />
                </div>
                <div className="dashboard-detailsBar-attachmentsList-item-options-icon">
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DetailsBarFooter onUpload={onUpload} handleCommentState={{handleValue, toggleVisible, postComment}} commentState={commentState} />
    </>
  ) : (
    <NoMatchedTask />
  );
};

export default React.memo(DetailsBar);
