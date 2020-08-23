import React from 'react';
import CloseIcon from "../../../../icons/CloseIcon";
import LabelIcon from "../../../../icons/LabelIcon";

const LabelItem = (props) => {

  return (
    <div className="dashboard-detailsBar-labelsList-labelItem">
      <div className="dashboard-detailsBar-labelsList-labelItem-close_icon">
        <CloseIcon fill={'#fff'}/>
      </div>
      <div className="dashboard-detailsBar-labelsList-labelItem-icon">
        <LabelIcon fill={'#fff'} />
      </div>
      <div className="dashboard-detailsBar-labelsList-labelItem-title">
        <p>5 minutes</p>
      </div>
    </div>
  );
};

export default LabelItem;
