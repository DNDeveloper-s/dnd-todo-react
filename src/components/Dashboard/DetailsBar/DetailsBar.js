import React, {useEffect, useState} from "react";
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {getAllLabels} from "../../../features/labelSlice";
import {getAllTasks, UPDATE_TASK} from "../../../features/taskSlice";
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
import {getCommonFormatDate, getDayDifference} from "../../../helpers/utils";
import {getToday} from "../../CalendarPicker/helpers";
import CheckList from "./CheckListItems/CheckList";
import ListIcon from "../../../icons/ListIcon";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {v4 as uuidV4} from "uuid";


const DetailsBar = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("Task title");
  const labels = useSelector(getAllLabels);
  const {match: {params}} = props;
  const tasks = useSelector(getAllTasks);
  const [task, setTask] = useState(null);
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(typeof params === 'object') {
      const taskId = params.taskId;
      const curTask = tasks.tasks[taskId];
      if(curTask) {
        const repeatFirstDate = JSON.parse(curTask.repeatFirstDate);
        let a = moment(repeatFirstDate);
        let b = moment([getToday().year, getToday().month - 1, getToday().day]);
        const newDate = getCommonFormatDate(repeatFirstDate, {
          nextWeek: "ddd",
          sameElse: `[${b.to(a)}], D MMM`,
          nextDay: "[Tomorrow], MMM D",
          lastWeek: "[Last] dddd, MMM D"
        });

        setTask({
          ...curTask,
          repeatFirstDate: newDate
        });
        // TODO: Refactor this ugly code here...
        setTitle(curTask.content);
        const dayDiff = getDayDifference({
          dateObj: repeatFirstDate,
          day: new Date(repeatFirstDate).getDate(),
          month: new Date(repeatFirstDate).getMonth() + 1,
          year: new Date(repeatFirstDate).getFullYear(),
        });
        setDate({
          rawData: {
            date: repeatFirstDate,
            data: {
              monthDay: new Date(repeatFirstDate).getDate(),
              month: new Date(repeatFirstDate).getMonth() + 1,
              year: new Date(repeatFirstDate).getFullYear()
            },
          },
          diff: dayDiff.momentDate,
          dueOver: dayDiff.dueOver,
        });
      }
    }
  }, [tasks.tasks, params]);

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

  function toggleItemMode() {
    const parsedContent = editorState.getCurrentContent();
    const content = convertToRaw(parsedContent);

    let itemsFromBlock = [];
    if(!task.inItemMode) {
      itemsFromBlock = content.blocks.map(block => ({
        id: uuidV4(),
        status: 0,
        content: block.text
      }));
      setEditorState(EditorState.createEmpty());
    } else {
      content.blocks = task.items.map(item => ({
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: item.id,
        text: item.content,
        type: "unstyled",
      }));
      const newContentState = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(newContentState));
    }

    dispatch(UPDATE_TASK({
      taskId: task.id,
      inItemMode: !task.inItemMode,
      items: itemsFromBlock
    }));
  }

  return (
      task ?
        <>
          <div className="dashboard-detailsBar-header">
            <CheckBox onChange={() => null} />
            <div className="vertical_separator" />
            <div className="dashboard-detailsBar-header-title">
              <div className="dashboard-detailsBar-header-title-icon">
                <CalendarDropdown initialDate={date} onDateChange={onDateChange} />
              </div>
              <div className="dashboard-detailsBar-header-title-label">
                <p>{task.repeatFirstDate}</p>
              </div>
            </div>
            <div className="dashboard-detailsBar-header-icon">
              <PriorityHighIcon />
            </div>
          </div>
          <div className="dashboard-detailsBar-parent_task">
            <div className="dashboard-detailsBar-parent_task-title">
              <p>Parent task</p>
            </div>
            <div className="dashboard-detailsBar-parent_task-icon">
              <CaretRightIcon />
            </div>
          </div>
          <div className="dashboard-detailsBar-title">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            <div className="dashboard-detailsBar-title-toggle_task_mode" onClick={toggleItemMode}>
              {task.inItemMode ? <ListIcon /> : <ParagraphIcon/>}
            </div>
          </div>
          <div className="dashboard-detailsBar-desc">
            <DescriptionEditor task={task} {...{editorState, setEditorState}} labelsData={labelsArr}/>
          </div>
          {task.inItemMode && (
            <div className="dashboard-detailsBar-innerItems">
              <CheckList task={task} />
            </div>
          )}
          <div className="dashboard-detailsBar-labelsList">
            <LabelsWrapper taskLabels={task.labelIds} taskId={task.id} labels={labelsArr}/>
          </div>
          <div className="dashboard-detailsBar-subTasks">
            <div className="dashboard-detailsBar-subTasks-header">
              <div className="dashboard-detailsBar-subTasks-header-icon">
                <SubTaskIcon />
              </div>
              <div className="dashboard-detailsBar-subTasks-header-title">
                <p>SubTask</p>
              </div>
            </div>
            <div className="dashboard-detailsBar-subTasks-items">
              <CheckListItemHandle />
            </div>
          </div>
        </> :
        <NoMatchedTask />
  );
};

export default DetailsBar;
