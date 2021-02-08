import React from 'react';
import AppLoader from "../UI/AppLoader/AppLoader";

const AuthButton = ({loading, handleClick, label}) => {

  return (
    <div className="generic_btn relative pink" onClick={handleClick}>
      <div className="generic_btn-label">
        <p>{label || 'Label'}</p>
      </div>
      <AppLoader size={0.2} containerStyle={{position: 'absolute', left: 0, opacity: loading ? 1 : 0}} />
    </div>
  );
};

export default AuthButton;
