import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import AppButton from "../../UI/AppButton";
import AppModal from "../../UI/AppModal/AppModal";
import DotsMenuHorizontal from "../../../icons/DotsMenuHorizontal";
import classes from "./ProjectDetailsModal.module.scss";
import DefaultUserImage from "../../../assets/images/def_user.png";
import useApi from "../../../api/useApi";
import { constants } from "../../../helpers/constants";
import AppLoader from "../../UI/AppLoader/AppLoader";
import TickIcon from "../../../icons/TickIcon";
import CloseIcon from "../../../icons/CloseIcon";
import {LOAD_GLOBAL_DATA, LOAD_NOTIFICATIONS} from "../../../features/globalSlice";
import {useDispatch} from "react-redux";
import {LOAD_TASKS} from "../../../features/taskSlice";
import {LOAD_PROJECTS} from "../../../features/projectSlice";
import {LOAD_LABELS} from "../../../features/labelSlice";

const svgIconStyles = { fill: "#fff", width: "1rem", height: "1rem" };

const ProjectCollaboratorListItem = ({ item }) => {
  return (
    <div className="flex spaceBetween alignCenter mt-20">
      <div className="flex">
        <div
          className="mr-10"
          style={{ width: "40px", height: "40px", borderRadius: "200px" }}
        >
          <img src={DefaultUserImage} alt="" />
        </div>
        <div className="flexColumn">
          <div className="bold">
            <p>{item.user.fullName}</p>
          </div>
          <div style={{ color: "grey" }}>
            <p>{item.user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="mr-10">
          <p style={{ fontWeight: 400, color: "rgba(0,0,0,0.54)" }}>Role: </p>
        </div>
        <div className="flex">
          <div className="flexCentered">
            <p style={{ color: "#686bf0" }}>{item.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailsModal = (props) => {
  const {
    notification,
    doIt,
    setDoIt,
    onCancel,
    onSave,
    showModal,
    setShowModal,
  } = props;
  const [isReady, setIsReady] = useState(false);
  const [project, setProject] = useState(null);
  const { getWithAuthToken, postWithAuthToken } = useApi();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (doIt) {
      setIsReady(false);
      getProject();

      function getProject() {
        getWithAuthToken(
          constants.ENDPOINTS.GET_PROJECT +
            "?projectId=" +
            notification.data.projectId
        )
          .then((res) => {
            console.log(res);
            if (res.data.type !== "error") {
              setProject({
                ...res.data.project,
                tasksLength: res.data.tasksLength,
              });
            }
            setIsReady(true);
            setDoIt(false);
          })
          .catch((e) =>
            console.log("[ProjectDetailsModal.js || Line no. 59 ....]", e)
          );
      }
    }
  }, [doIt]);

  function respondInvite(isAccept) {
    setLoading({isAccept});
    postWithAuthToken(constants.ENDPOINTS.RESPOND_INVITE_PROJECT, {
      ticketId: notification.ticket,
      isAccept
    })
      .then((res) => {
        console.log("[ProjectDetailsModal.js || Line no. 81 ....]", res);
        if(isAccept) {
          loadAppData();

          function loadAppData() {
            getWithAuthToken(constants.ENDPOINTS.GET_APP_DATA).then((res) => {
              // console.log("[Dashboard.js || Line no. 38 ....]", res);
              if (res.data.type !== "error") {
                // Some sort of stuff
                dispatch(LOAD_TASKS(res.data.appData));
                dispatch(LOAD_PROJECTS(res.data.appData));
                dispatch(LOAD_NOTIFICATIONS(res.data.notifications));
              }
              // setIsReady(true);
            });
            // .catch(e => console.log('[Dashboard.js || Line no. 40 ....]', e));
          }
        } else {
          getWithAuthToken(constants.ENDPOINTS.GET_NOTIFICATIONS).then((res) => {
            console.log("[Dashboard.js || Line no. 38 ....]", res);
            if (res.data.type !== "error") {
              dispatch(LOAD_NOTIFICATIONS(res.data.notifications));
            }
          });
        }
        setLoading(null);
      })
      .catch((e) =>
        console.log("[ProjectDetailsModal.js || Line no. 82 ....]", e)
      );
  }

  function handleCancel() {
    onCancel ? onCancel() : setShowModal(false);
  }

  return (
    <AppModal showIt={showModal} setShowIt={setShowModal} onClose={() => null}>
      {() => (
        <div className="nothing but modal" style={{ minHeight: "20vh" }}>
          {isReady ? (
            <>
              <div className="flexCentered spaceBetween">
                <div className="heading_4">
                  <p>{project.content}</p>
                </div>
                <div>
                  <DotsMenuHorizontal />
                </div>
              </div>
              <div className="mt-20">
                <div className={classes.ActiveTaskLabel}>
                  <p>{project.tasksLength} Active Tasks</p>
                </div>
              </div>
              <div className="mt-20">
                <div className="heading_4 mb-10">
                  <p>Collaborators: </p>
                </div>
                <div
                  style={{
                    maxHeight: "20vh",
                    overflow: "auto",
                    paddingRight: "10px",
                  }}
                >
                  {project.users.map((user) => (
                    <ProjectCollaboratorListItem key={user._id} item={user} />
                  ))}
                </div>
              </div>
              {notification.ticket?.active && (
                <div className="flexCentered spaceBetween mt-20 ph-20">
                  <div style={{ color: "#f08168" }}>
                    <p>You are invited to this project.</p>
                  </div>
                  <div className="flexCentered">
                    <AppButton
                      loading={loading && loading.isAccept}
                      green
                      label={
                        <TickIcon
                          style={{
                            fill: "white",
                            width: "1.3rem",
                            height: "1.3rem",
                          }}
                        />
                      }
                      onClick={() => respondInvite(true)}
                      style={{
                        width: "40px",
                        flexShrink: 0,
                        height: "30px",
                        marginRight: "5px",
                      }}
                    />
                    <AppButton
                      loading={loading && !loading.isAccept}
                      orange
                      label={<CloseIcon style={svgIconStyles} />}
                      onClick={() => respondInvite(false)}
                      style={{ width: "40px", flexShrink: 0, height: "30px" }}
                    />
                  </div>
                </div>
              )}
              <div className="flex mt-40">
                <AppButton
                  label="Okay "
                  style={{ marginRight: "10px" }}
                  onClick={handleCancel}
                />
              </div>
            </>
          ) : (
            <AppLoader noBg />
          )}
        </div>
      )}
    </AppModal>
  );
};

ProjectDetailsModal.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ProjectDetailsModal;
