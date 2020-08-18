import React from "react";

// Components Imports

// Images Imports

const NavBarItem = ({ Icon, adjacentEl, itemClasses = [], onClick }) => {
  return (
    <div className={["nav_item", ...itemClasses].join(" ")} {...{ onClick }}>
      <div className="nav_item-icon">{Icon}</div>
      {adjacentEl}
    </div>
  );
};

export default NavBarItem;
