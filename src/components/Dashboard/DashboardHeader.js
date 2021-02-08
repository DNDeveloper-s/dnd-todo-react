import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CommentsFillIcon from "../../icons/CommentsFillIcon";
import DotsMenuHorizontal from "../../icons/DotsMenuHorizontal";
import useSortTasks from "../../hooks/useSortTasks";
import {getDataViaParams, sortOnlineUsers} from "../../helpers/utils";
import {getSocketState, LOAD_SUBSCRIBERS} from "../../features/socketSlice";
import {constants} from "../../helpers/constants";

// Components Imports

// Images Imports

const DashboardHeader = (props) => {
  const { getAlLTasksUnderId } = useSortTasks();
  const dispatch = useDispatch();
  const socketState = useSelector(getSocketState);
  const [headerUsers, setHeaderUsers] = useState([]);
  const {
    match: { params },
  } = props;

  useEffect(() => {
    // console.log('[DashboardHeader.js || Line no. 24 ....]', props.match.params);
    const users = getDataViaParams(params, getAlLTasksUnderId).data.users;
    if(users) {
      // console.log('[DashboardHeader.js || Line no. 26 ....]', 'Loading subscribers');
      dispatch(LOAD_SUBSCRIBERS({users}));
    }
    // console.log('[DashboardHeader.js || Line no. 26 ....]', getDataViaParams(params, getAlLTasksUnderId).data.users);
    // TODO: Increase performance by encapsulating hooks
  }, [props.match.params.typeId, props.match.params.scopeId]);

  useEffect(() => {
    console.log('socketState changed!');
    const users = getDataViaParams(params, getAlLTasksUnderId).data.users;
    if(users) {
      const sortedUsers = sortOnlineUsers(users, socketState.users);
      // console.log('[DashboardHeader.js || Line no. 36 ....]', sortedUsers);
      setHeaderUsers(sortedUsers);
    }
  }, [socketState]);

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-group">
        <div className="dashboard-header-title">
          <p>{getDataViaParams(params, getAlLTasksUnderId).data.content}</p>
        </div>
      </div>
      <div className="dashboard-header-group">
        <div className="dashboard-header-group mr-20">
          {headerUsers.map(userData => (
            <div key={userData._id} className="dashboard-header-image ml-10 ariaLabel" aria-label={userData.user.fullName} data-name={userData.user.fullName}>
              <img src={constants.BASE_URL + "/assets/images/def_user.png"} alt=""/>
              <span className="dashboard-header-image-status" data-status={socketState.users[userData.user._id]?.status} />
            </div>
          ))}
          {/*This is for overflow of users*/}
          {/*<div className="dashboard-header-image dashboard-header-image-more ml-10">*/}
          {/*  <p>3+</p>*/}
          {/*</div>*/}
        </div>
        <div className="dashboard-header-icon">
          <CommentsFillIcon />
        </div>
        <div className="dashboard-header-icon">
          <DotsMenuHorizontal />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
