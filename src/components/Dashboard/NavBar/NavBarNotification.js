import React, { useState } from "react";
import parser from "html-react-parser";
import moment from "moment";
import NotificationIcon from "../../../icons/NotificationIcon";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { getGlobalState } from "../../../features/globalSlice";
import dropdownClass from "../../UI/Dropdown/Dropdown.module.css";
import DotsMenuHorizontal from "../../../icons/DotsMenuHorizontal";
import classes from "./NavBarNotification.module.scss";
import EmptyListSvg from "../../UI/EmptyListSvg";
import ProjectDetailsModal from "../../Actions/ProjectDetailsModal/ProjectDetailsModal";
import { createEntityString, sortByDate } from "../../../helpers/utils";
import {constants} from "../../../helpers/constants";

const NavBarNotificationItem = ({ notification, onClick }) => {
  return (
    <div
      className={[
        dropdownClass["Dropdown-item"],
        classes.NotificationItem,
        "flex mt-10",
      ].join(" ")}
      key={notification._id}
      onClick={onClick}
    >
      <div className={classes.NotificationImage}>
        <img src={constants.BASE_URL + "/assets/images/def_user.png"} alt=""/>
      </div>
      <div>
        <div className={classes.NotificationMessage}>
          <p>{parser(createEntityString(notification.message))}</p>
        </div>
        <div className={classes.NotificationTimeStamp}>
          <p>{moment(notification.timeStamp).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

const NavBarNotification = () => {
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
  const [projectDetailsProps, setProjectDetailsProps] = useState({
    notification: { data: {} },
  });
  const [doIt, setDoIt] = useState(false);
  const globalState = useSelector(getGlobalState);

  function onItemClick(notification, setVisible) {
    setVisible(false);
    setShowProjectDetailsModal(true);
    setProjectDetailsProps(notification);
    setDoIt(true);
  }

  function onDropdownOpen() {

  }

  return (
    <>
      <div className={"nav_item"}>
        <Dropdown
          handle={
            <div className="nav_item-icon">
              <NotificationIcon style={{ width: "2.3rem", height: "2.3rem" }} />
            </div>
          }
          holderStyle={{
            width: "100%",
            height: "100%",
          }}
          handleStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          containerStyle={{
            width: "360px",
            maxWidth: "unset",
            maxHeight: "50vh",
            overflow: "auto",
          }}
          direction="bottomLeft"
          onDropdownOpen={onDropdownOpen}
          ItemComponent={(setVisible) => (
            <>
              <div className="flexCentered spaceBetween ph-15 pt-20 pb-10">
                <div className="heading_3 bold mr-30">
                  <p>Notifications</p>
                </div>
                <div>
                  <DotsMenuHorizontal />
                </div>
              </div>
              {globalState.notifications.length > 0 ? (
                sortByDate(
                  globalState.notifications,
                  "timeStamp"
                ).map((notification) => (
                  <NavBarNotificationItem
                    key={notification._id}
                    notification={notification}
                    onClick={() => onItemClick(notification, setVisible)}
                  />
                ))
              ) : (
                <div className={classes.NotificationEmpty}>
                  <EmptyListSvg
                    style={{ width: "100%", height: "100%", opacity: 0.5 }}
                  />
                  <p className="mt-20">
                    No Notifications, Engage more to get so!
                  </p>
                </div>
              )}
            </>
          )}
        />
        <div
          className={classes.Count}
          style={{ opacity: globalState.notifications.length > 0 ? 1 : 0 }}
        >
          {globalState.notifications.length}
        </div>
      </div>
      <ProjectDetailsModal
        onSave={() => null}
        setShowModal={setShowProjectDetailsModal}
        showModal={showProjectDetailsModal}
        notification={projectDetailsProps}
        doIt={doIt}
        setDoIt={setDoIt}
      />
    </>
  );
};

export default NavBarNotification;
