import React from 'react';

const ProgressBar = ({progress}) => {

  return (
    <div className="dnd-progress_bar">
      <div className="dnd-progress_bar-item" style={{width: progress + '%'}} />
    </div>
  );
};

export default ProgressBar;
