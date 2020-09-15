import React, { useRef } from "react";
import ContextMenu from "../../../UI/ContextMenu/ContextMenu";
import HorizontalSelect from "../../../UI/HorizontalSelect/HorizontalSelect";
import { priorities, recurrences } from "../../../../helpers/data";
import { getPriorityByInd, jumpToDate } from "../../../../helpers/utils";
import useTasks from "../../../../hooks/useTasks";
import SubTaskIcon from "../../../../icons/SubTaskIcon";
import ProjectsIcon from "../../../../icons/ProjectsIcon";
import LabelIcon from "../../../../icons/LabelIcon";
import CopyIcon from "../../../../icons/CopyIcon";
import DeleteIcon from "../../../../icons/DeleteIcon";
import DropdownNew from "../../../UI/DropDownNew/DropdownNew";

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

const ListItemContextMenu = ({ listenerRef, item }) => {
  const { updateTask, deleteTask } = useTasks();
  const menuItemRef = useRef(null);

  function onPrioritySelect(priorityObj, setVisible) {
    updateTask({ taskId: item.id, priority: priorityObj.ind });
    setVisible(false);
  }

  function onRecurrenceSelect(recurrenceObj, setVisible) {
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

  return (
    <ContextMenu listenerRef={listenerRef}>
      {(setVisible) => (
        <>
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
                  onClick={() => onRecurrenceSelect(recurrence, setVisible)}
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
            onItemSelect={(d) => onPrioritySelect(d, setVisible)}
            allowAriaLabel
          />
          {verticalSelectItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                className="context-menu-item"
                onClick={() => onVerticalItemClick(item.action)}
                {...(item.id === "contextMenuItem-2"
                  ? { ...{ ref: menuItemRef } }
                  : {})}
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
          {menuItemRef && (
            <DropdownNew
              listenerRef={menuItemRef}
              holderStyle={{ zIndex: 20000000 }}
            >
              {() => (
                <div>
                  <p>Nice one</p>
                  <p>Nice one</p>
                  <p>Nice one</p>
                  <p>Nice one</p>
                  <p>Nice one</p>
                  <p>Nice one</p>
                </div>
              )}
            </DropdownNew>
          )}
        </>
      )}
    </ContextMenu>
  );
};

export default ListItemContextMenu;
