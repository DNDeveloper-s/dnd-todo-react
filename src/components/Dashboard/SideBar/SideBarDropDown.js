import React, { useState } from "react";
import SideBarDropDownItem from "./SideBarDropDownItem";

// Components Imports

// Images Imports

const SIDEBAR_DROPDOWN_ITEM_HEIGHT = 45;

const SideBarDropDown = ({ toggle_menu, items = { entities: [] } }) => {
  const [visible, setVisible] = useState(false);

  function toggleMenu() {
    setVisible(!visible);
  }

  const dropdownItems = items.entities.map((item) => (
    <SideBarDropDownItem item={items.data[item]} key={item} />
  ));

  return (
    <div className="dashboard-sidebar-dropdown">
      <div
        className="dashboard-sidebar-dropdown-toggle_menu"
        onClick={toggleMenu}
      >
        {toggle_menu(visible)}
      </div>
      <div
        className="dashboard-sidebar-dropdown-items"
        style={{
          height: visible
            ? items.entities.length * SIDEBAR_DROPDOWN_ITEM_HEIGHT
            : "0px",
        }}
      >
        {visible && dropdownItems}
      </div>
    </div>
  );
};

export default SideBarDropDown;
