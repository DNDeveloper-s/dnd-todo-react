import React from "react";

// Components Imports

// Images Imports

const AppButton = ({ label, onClick, primary, ...props }) => {
  return (
    <div className={`app_btn ${primary ? "primary" : ""}`} onClick={onClick} {...props}>
      <p>{label}</p>
    </div>
  );
};

export default AppButton;
