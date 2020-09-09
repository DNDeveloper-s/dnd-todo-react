import React, { useEffect, useState } from "react";
import TimeEditor from "./TimeEditor";
import CalendarPickerDropdown from "./CalendarPickerDropdown";
import { repeat, timeList } from "./helpers/data";
import AppButton from "../UI/AppButton";
import TickIcon from "../../icons/TickIcon";
import { timeFilter } from "../../helpers/utils";
import { classNames } from "../../helpers/utils";

// Components Imports

// Images Imports

const CalendarPickerFooter = ({
  onTimeChange,
  handleClear,
  handleOk,
  reminders,
  repeatValue,
  onReminderChange,
  onRepeatChange,
  reminderList,
  time,
}) => {
  const [localReminders, setLocalReminders] = useState(reminders);

  function timeItemClicked(e, setVisible) {
    setVisible(false);
    onTimeChange(e);
  }

  // useEffect(() => {
  //   onReminderChange(reminderValue);
  // }, [reminderValue]);
  //
  // useEffect(() => {
  //   onRepeatChange(repeatValue);
  // }, [repeatValue]);

  function onLocalReminderChange(reminderLabel) {
    const reminderIndex = reminderList.findIndex(
      (c) => c.label === reminderLabel
    );
    // Checking it the next selected remainder is "None"
    // By checking the index as "None" holds the zero index
    if (reminderIndex === 0) return setLocalReminders([reminderList[0]]);
    setLocalReminders((prevReminder) => {
      let updatedReminder = [...prevReminder];
      if (updatedReminder[0].label === "None") {
        updatedReminder.splice(0, 1);
      }
      // Checking if the reminder already exists
      // Deleting it then
      const prevIndex = prevReminder.findIndex(
        (c) => c.label === reminderLabel
      );

      // If index found
      // then removing it
      if (prevIndex >= 0) {
        updatedReminder.splice(prevIndex, 1);
        if (updatedReminder.length === 0) updatedReminder.push(reminderList[0]);
      }
      // Else
      // Adding it
      else {
        console.log(updatedReminder);
        updatedReminder.push(reminderList[reminderIndex]);
      }
      updatedReminder.sort((a, b) => {
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
        return 0;
      });
      return updatedReminder;
    });
  }

  function onReminderOpen() {
    setLocalReminders(reminders);
  }

  return (
    <div className="dnd_calendar-footer">
      <div
        className={classNames("dnd_calendar-button", {
          active: Boolean(time),
        })}
      >
        <CalendarPickerDropdown
          itemsContainerClasses={["overflowAuto"]}
          items={timeList}
          onItemClick={timeItemClicked}
          scrollTo={
            timeList.find((c) => c.label === timeFilter(timeList, time)?.label)
              ?.value
          }
          itemHeight={40}
          itemStyle={{
            padding: 0,
          }}
        >
          <TimeEditor timeValue={time} onTimeChange={onTimeChange} />
        </CalendarPickerDropdown>
        <div className="reset-time-editor" onClick={() => onTimeChange("")}>
          <span>x</span>
        </div>
      </div>
      <div
        className={classNames("dnd_calendar-button", {
          active: reminders[0].value !== 0,
        })}
      >
        <CalendarPickerDropdown
          containerClasses={["minify"]}
          items={reminderList}
          onItemClick={onLocalReminderChange}
          onActiveElements={<TickIcon style={{ width: "1.4rem" }} />}
          onOpen={onReminderOpen}
          activeLogic={(item) =>
            localReminders.filter((c) => c.value === item.value).length > 0
          }
          dropDownItemsFooter={(setVisible) => (
            <>
              <div className="dnd_calendar-separator" />
              <div className={"dnd_calendar-flex_buttons"}>
                <AppButton label={"Cancel"} onClick={() => setVisible(false)} />
                <AppButton
                  label={"Ok"}
                  primary={true}
                  onClick={() => {
                    onReminderChange(localReminders);
                    setVisible(false);
                  }}
                />
              </div>
            </>
          )}
        >
          <div className="dnd_calendar-button-label">
            <p>
              {reminders[0].value === 0
                ? "Set Reminder"
                : reminders.map((c) => c.label).join(", ")}
            </p>
          </div>
        </CalendarPickerDropdown>
      </div>
      <div className="dnd_calendar-button">
        <CalendarPickerDropdown
          containerClasses={["minify"]}
          items={repeat}
          onItemClick={onRepeatChange}
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
        <AppButton label={"Clear"} onClick={handleClear} />
        <AppButton label={"Ok"} primary={true} onClick={handleOk} />
      </div>
    </div>
  );
};

export default CalendarPickerFooter;
