import React from "react";

// Components Imports

// Images Imports

const AppButton = ({ label, onClick, primary }) => {
  return (
    <div className={`app_btn ${primary ? "primary" : ""}`} onClick={onClick}>
      <p>{label}</p>
    </div>
  );
};

export default AppButton;
