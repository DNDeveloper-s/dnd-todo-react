import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import "./ContextMenu.scss";
import HorizontalSelect from "../HorizontalSelect/HorizontalSelect";
import { priorities, recurrences } from "../../../helpers/data";
import SubTaskIcon from "../../../icons/SubTaskIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";
import LabelIcon from "../../../icons/LabelIcon";
import CopyIcon from "../../../icons/CopyIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import {
  getBoundaryCoords,
  getPriorityByInd,
  jumpToDate,
} from "../../../helpers/utils";
import useTasks from "../../../hooks/useTasks";
import useMoment from "../../../hooks/useMoment";

const verticalSelectItems = [
  { id: "contextMenuItem-1", label: "Add Subtask", IconComponent: SubTaskIcon },
  { id: "contextMenuItem-2", label: "Move to", IconComponent: ProjectsIcon },
  { id: "contextMenuItem-3", label: "Tags", IconComponent: LabelIcon },
  { id: "contextMenuItem-4", label: "Copy Task Link", IconComponent: CopyIcon },
  {
    id: "contextMenuItem-5",
    label: "Delete",
    IconComponent: DeleteIcon,
    action: "delete",
  },
];

const ContextMenu = ({ item, listenerRef, onClose = () => null }) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false, onClose);
  const [coords, setCoords] = useState(null);
  const { updateTask, deleteTask } = useTasks();

  useEffect(() => {
    listenerRef.current &&
      listenerRef.current.addEventListener("contextmenu", contextMenuHandler);

    return () => {
      listenerRef.current &&
        listenerRef.current.removeEventListener(
          "contextmenu",
          contextMenuHandler
        );
    };
  }, []);

  function contextMenuHandler(e) {
    e.preventDefault();
    setVisible(true);
    if (ref.current) {
      const boundaryCoords = getBoundaryCoords(e, ref);
      setCoords(boundaryCoords);
    }
  }

  const coordsStyle = {
    top: coords?.y + "px",
    left: coords?.x + "px",
  };

  function onPrioritySelect(priorityObj) {
    updateTask({ taskId: item.id, priority: priorityObj.ind });
    setVisible(false);
  }

  function onRecurrenceSelect(recurrenceObj) {
    updateTask({
      taskId: item.id,
      startDate: jumpToDate(item, recurrenceObj.params).toISOString(),
    });
    setVisible(false);
  }

  function onVerticalItemClick(action) {
    if (action === "delete") {
      deleteTask(item.id);
    }
  }

  return ReactDOM.createPortal(
    visible && (
      <div className="context-menu-holder" style={coordsStyle} ref={ref}>
        <HorizontalSelect
          headerText="Date"
          activeItem={recurrences[2]}
          noActive={true}
          ItemComponent={() => {
            return recurrences.map((recurrence, index) => (
              <div
                key={recurrence.id}
                className="recurrence-item ariaLabel"
                aria-label={recurrence.label}
                onClick={() => onRecurrenceSelect(recurrence)}
              >
                <recurrence.IconComponent />
              </div>
            ));
          }}
        />
        <HorizontalSelect
          items={priorities}
          headerText="Priority"
          activeItem={getPriorityByInd(item.priority)}
          onItemSelect={onPrioritySelect}
          allowAriaLabel
        />
        {verticalSelectItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <div
              className="context-menu-item"
              onClick={() => onVerticalItemClick(item.action)}
            >
              <div className="context-menu-item-icon">
                <item.IconComponent />
              </div>
              <div className="context-menu-item-label">
                <p>{item.label}</p>
              </div>
            </div>
            {index === 2 && <div className="generic_separator" />}
          </React.Fragment>
        ))}
      </div>
    ),
    document.getElementById("context-menu-root")
  );
};

export default ContextMenu;
