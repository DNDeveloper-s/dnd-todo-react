import React, {useCallback, useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";
import AppButton from "../../UI/AppButton";
import AppModal from "../../UI/AppModal/AppModal";
import DotsMenuHorizontal from "../../../icons/DotsMenuHorizontal";
import classes from '../ProjectDetailsModal/ProjectDetailsModal.module.scss';
import moment from "moment";
import EmptyListSvg from "../../UI/EmptyListSvg";

const TaskActivityContainer = (props) => {
  const {
    onCancel,
    showModal,
    setShowModal,
    task
  } = props;

  const activityScrollerRef= useRef(null);
  const [fromBottom, setFromBottom] = useState(1);

  useEffect(() => {
    // console.log('[TaskActivityModal.js || Line no. 20 ....]', activityScrollerRef.current.clientHeight, activityScrollerRef.current.scrollHeight, activityScrollerRef);
    // Removing Scroll Shadow if the container is not overflowing or if scrollbars are not present
    if(activityScrollerRef.current.clientHeight === activityScrollerRef.current.scrollHeight) {
      setFromBottom(0);
    }
  }, [activityScrollerRef.current]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleCancel() {
    onCancel ? onCancel() : setShowModal(false);
  }

  function parseActivity(activity) {
    const data = {};
    const updatedObj = parseData(activity.updatedData);
    const oldObj = parseData(activity.oldData);

    // const text = activity.message.text + Object.keys(updatedObj).join(', ') + '.';

    data.updatedObj = updatedObj;
    data.timeStamp = moment(activity.timeStamp).fromNow();
    data.dataObj = {};
    data.user = activity.user;
    for(let key in updatedObj) {
      if(updatedObj.hasOwnProperty(key) || oldObj.hasOwnProperty(key)) {
        data.dataObj.key = key;
        data.dataObj[key] = {new: updatedObj[key], old: oldObj[key]};
      }
    }

    function parseData(data) {
      const formedData = {};
      const d = data.split('&');
      for(let pair of d) {
        let keyPair = pair.split('=');
        formedData[keyPair[0]] = keyPair[1];
      }
      return formedData;
    }

    return data;
  }

  function onActivityScroll(e) {
    const target = e.nativeEvent.target;
    // console.log('[TaskActivityModal.js || Line no. 56 ....]', e.nativeEvent.target.scrollTop + e.nativeEvent.target.clientHeight, e.nativeEvent.target.scrollHeight);
    // console.log('[TaskActivityModal.js || Line no. 57 ....]', e.nativeEvent);
    // console.log('[TaskActivityModal.js || Line no. 62 ....]', (target.scrollHeight - target.scrollTop - target.clientHeight) / (target.scrollHeight - target.clientHeight));
    const fromBottomPercentage = (target.scrollHeight - target.scrollTop - target.clientHeight) / (target.scrollHeight - target.clientHeight);
    setFromBottom(fromBottomPercentage);
  }

  return (
    <div className="nothing but modal" style={{ minHeight: "20vh" }}>
      <div className="flexCentered spaceBetween">
        <div className="heading_4">
          <p>Task <span style={{
            fontSize: '10px',
            color: '#e25b5b',
            marginLeft: '14px'
          }}># {task._id}</span></p>
        </div>
        <div>
          <DotsMenuHorizontal />
        </div>
      </div>
      <div className="mt-20">
        <div className={classes.ActiveTaskLabel}>
          <p>{task.content}</p>
        </div>
      </div>
      <div className="mt-20">
        <div className="heading_4 mb-20">
          <p>Activities: </p>
        </div>
        <div>
          <div className="activityScroller" onScroll={onActivityScroll} ref={activityScrollerRef}>
            {task.activities.length > 0 ? [...task.activities].reverse().map(activity => {
              const activityData = parseActivity(activity);
              return (
                <div key={activity._id} className={classes.ActiveTaskLabel + " " + classes.leftBorder} style={{marginBottom: '10px'}}>
                  <p className={classes.ActivityMessage}><span>{activityData.dataObj.key}: </span><span className={classes.ActivityUpdatedData}>{activityData.dataObj[activityData.dataObj.key].new}</span></p>
                  <p className={classes.ActivityMessage}><span style={{opacity: 0}}>{activityData.dataObj.key}: </span><span className={classes.ActivityOldData}>{activityData.dataObj[activityData.dataObj.key].old}</span></p>
                  <div className="flexCentered spaceBetween mt-10">
                    <p style={{
                      fontSize: '12px',
                    }}>By: <span style={{color: '#be9fef'}}>{activityData.user.fullName}</span></p>
                    <p style={{
                      fontSize: '12px',
                      color: '#cecece'
                    }}>{activityData.timeStamp}</p>
                  </div>
                </div>
              );
            }) : (
              <div className="flexColumn flexCentered black-40">
                <EmptyListSvg style={{width: '250px', height: '250px', opacity: 0.6}}/>
                <p className="mt-10">Just Created, No Prior Activity</p>
              </div>
            )}
          </div>
          <div className="innerBottomShadow" style={{height: '100%', opacity: fromBottom, transition: '.05s'}} />
        </div>
      </div>
      <div className="flex mt-40">
        <AppButton
          label="Okay "
          style={{ marginRight: "10px" }}
          onClick={handleCancel}
        />
      </div>
    </div>
  )
};

const TaskActivityModal = (props) => {
  const {
    onCancel,
    showModal,
    setShowModal,
    tasku
  } = props;

  return (
    <AppModal showIt={showModal} setShowIt={setShowModal} onClose={() => null}>
      {() => <TaskActivityContainer {...props} />}
    </AppModal>
  );
};

TaskActivityModal.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default TaskActivityModal;
