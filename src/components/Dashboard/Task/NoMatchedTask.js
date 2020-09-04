import React from 'react';
import ClickTaskIcon from "../../../icons/ClickTaskIcon";

const NoMatchedTask = (props) => {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    }}>
      <ClickTaskIcon style={{
        marginBottom: '3rem',
        width: '200px',
        height: '200px'
      }} />
      <p style={{
        fontSize: '2.4rem',
        color: '#c4c4c4'
      }}>Click a task title to view its detail</p>
    </div>
  );
};

export default NoMatchedTask;
