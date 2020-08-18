import React, { useEffect, useState } from "react";
import TimeEditor from "./TimeEditor";
import CalendarPickerDropdown from "./CalendarPickerDropdown";
import { reminder, repeat, timeList } from "./helpers/data";
import AppButton from "../UI/AppButton";
import TickIcon from "../../icons/TickIcon";

// Components Imports

// Images Imports

const CalendarPickerFooter = ({
  onTimeChange,
  onReminderChange,
  onRepeatChange,
}) => {
  const [timeValue, setTimeValue] = useState("");
  const [reminderValue, setReminderValue] = useState("None");
  const [repeatValue, setRepeatValue] = useState("None");

  function timeItemClicked(e) {
    setTimeValue(e);
  }

  function reminderItemClicked(e) {
    setReminderValue(e);
  }

  function repeatItemClicked(e) {
    setRepeatValue(e);
  }

  useEffect(() => {
    onTimeChange(timeValue);
  }, [timeValue]);

  // useEffect(() => {
  //   onReminderChange(reminderValue);
  // }, [reminderValue]);
  //
  // useEffect(() => {
  //   onRepeatChange(repeatValue);
  // }, [repeatValue]);

  return (
    <div className="dnd_calendar-footer">
      <div className="dnd_calendar-button">
        <CalendarPickerDropdown
          itemsContainerClasses={["overflowAuto"]}
          items={timeList}
          onItemClick={timeItemClicked}
        >
          <TimeEditor timeValue={timeValue} onTimeChange={setTimeValue} />
        </CalendarPickerDropdown>
      </div>
      <div className="dnd_calendar-button">
        <CalendarPickerDropdown
          containerClasses={["minify"]}
          items={reminder}
          onItemClick={reminderItemClicked}
          onActiveElements={<TickIcon />}
          activeLogic={(item) => item.label === reminderValue}
          dropDownItemsFooter={(setVisible) => (
            <>
              <div className="dnd_calendar-separator" />
              <div className={"dnd_calendar-flex_buttons"}>
                <AppButton label={"Cancel"} onClick={() => setVisible(false)} />
                <AppButton
                  label={"Ok"}
                  primary={true}
                  onClick={() => setVisible(false)}
                />
              </div>
            </>
          )}
        >
          <div className="dnd_calendar-button-label">
            <p>
              {!reminderValue || reminderValue === "None"
                ? "Set Reminder"
                : reminderValue}
            </p>
          </div>
        </CalendarPickerDropdown>
      </div>
      <div className="dnd_calendar-button">
        <CalendarPickerDropdown
          containerClasses={["minify"]}
          items={repeat}
          onItemClick={repeatItemClicked}
          activeLogic={(item) => item.label === repeatValue}
        >
          <div className="dnd_calendar-button-label">
            <p>
              {!repeatValue || repeatValue === "None"
                ? "Set Repeat"
                : repeatValue}
            </p>
          </div>
        </CalendarPickerDropdown>
      </div>
      <div className={"dnd_calendar-flex_buttons"}>
        <AppButton label={"Clear"} />
        <AppButton label={"Ok"} primary={true} />
      </div>
    </div>
  );
};

export default CalendarPickerFooter;
