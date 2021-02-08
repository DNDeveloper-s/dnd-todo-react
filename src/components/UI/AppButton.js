import React from "react";
import {classNames} from "../../helpers/utils";
import AppLoader from "./AppLoader/AppLoader";

// Components Imports

// Images Imports

const AppButton = ({ label, loading, onClick, primary, orange, green, ...props }) => {
  return (
    <div className={classNames('app_btn', {
      primary: primary,
      orange: orange,
      green: green
    })} onClick={onClick} {...props}>
      <span style={{opacity: loading ? 0 : 1, display: 'flex'}}>{label}</span>
      {loading && <AppLoader containerStyle={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'unset',
        height: 'unset',
      }} size={0.15} noBg />}
    </div>
  );
};

export default AppButton;
