import React from "react";
import AppModal from "../UI/AppModal/AppModal";
import CloseIcon from "../../icons/CloseIcon";
import "./ReminderModal.scss";
import Dropdown from "../UI/Dropdown/Dropdown";
import SnoozeIcon from "../../icons/SnoozeIcon";
import CheckMarkIcon from "../../icons/CheckMarkIcon";
import WatchIcon from "../../icons/WatchIcon";

const ReminderModal = ({ noBackdrop, onClose, triggeredTask, style }) => {
  return (
    <AppModal
      noBackdrop={noBackdrop}
      onClose={() => onClose(triggeredTask.id)}
      backdropDisabled
      style={style}
    >
      {(setVisible) => (
        <div className="reminder_modal">
          <div className="reminder_modal-close_btn">
            <CloseIcon onClick={() => setVisible(false)} />
          </div>
          <div className="reminder_modal-title">
            <p>{triggeredTask.content}</p>
          </div>
          <div className="reminder_modal-actions flex">
            <div className="reminder_modal-actions-btn">
              <div className="reminder_modal-actions-btn-icon">
                <WatchIcon fill="#fff" />
              </div>
              <div className="reminder_modal-actions-btn-label">
                <p>View</p>
              </div>
            </div>
            <div className="reminder_modal-actions-btn">
              <div className="reminder_modal-actions-btn-icon">
                <CheckMarkIcon fill="#fff" />
              </div>
              <div className="reminder_modal-actions-btn-label">
                <p>Mark as done</p>
              </div>
            </div>
            <Dropdown
              handle={
                <div className="reminder_modal-actions-btn">
                  <div className="reminder_modal-actions-btn-icon">
                    <SnoozeIcon fill="#fff" />
                  </div>
                  <div className="reminder_modal-actions-btn-label">
                    <p>Snooze</p>
                  </div>
                </div>
              }
              onItemSelect={() => null}
              items={[
                { id: 1, label: "first item" },
                { id: 2, label: "second item" },
                { id: 3, label: "third item" },
                { id: 4, label: "forth item" },
                { id: 5, label: "fifth item" },
              ]}
            />
          </div>
        </div>
      )}
    </AppModal>
  );
};

export default ReminderModal;
