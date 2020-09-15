import React, { useState } from "react";
import SideBarDropDownItem from "./SideBarDropDownItem";
import AddCircularIcon from "../../../icons/AddCircularIcon";

// Components Imports

// Images Imports

const SIDEBAR_DROPDOWN_ITEM_HEIGHT = 45;

const SideBarDropDown = ({
  contextMenu,
  toggle_menu,
  items = { entities: [] },
  onItemClick,
  footer,
}) => {
  const [visible, setVisible] = useState(false);

  function toggleMenu() {
    setVisible(!visible);
  }

  const dropdownItems = items.entities.map((item) => (
    <SideBarDropDownItem
      contextMenu={contextMenu}
      item={items.data[item]}
      key={item}
      onClick={onItemClick}
    />
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
            ? items.entities.length * SIDEBAR_DROPDOWN_ITEM_HEIGHT +
              SIDEBAR_DROPDOWN_ITEM_HEIGHT * (footer ? 1 : 0)
            : "0px",
        }}
      >
        {visible && dropdownItems}
        {visible && footer && (
          <div
            className="dashboard-sidebar-dropdown-item footer"
            onClick={footer.onClick}
          >
            <div className="dashboard-sidebar-dropdown-item-icon">
              <AddCircularIcon
                fill={"#ffd966"}
                style={{ transform: "scale(1.15)", marginBottom: "1px" }}
              />
            </div>
            <div className="dashboard-sidebar-dropdown-item-label">
              <p>{footer.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarDropDown;
