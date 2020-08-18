import React from "react";
import HamBurgerIcon from "../../../icons/HamBurgerIcon";
import HomeIcon from "../../../icons/HomeIcon";
import SearchIcon from "../../../icons/SearchIcon";
import DoubleAddIcon from "../../../icons/DoubleAddIcon";
import TickBgIcon from "../../../icons/TickBgIcon";
import NotificationIcon from "../../../icons/NotificationIcon";
import GearIcon from "../../../icons/GearIcon";

import "./NavBar.css";
import NavBarItem from "./NavBarItem";

// Components Imports

// Images Imports

const NavBar = () => {
  return (
    <header>
      <nav className="nav wrapper">
        <div className="nav_item-group">
          <NavBarItem Icon={<HamBurgerIcon />} />
          <NavBarItem Icon={<HomeIcon />} />
          <NavBarItem
            itemClasses={["search"]}
            Icon={<SearchIcon />}
            adjacentEl={
              <div className="nav_item-input">
                <input type="text" placeholder="Search here..." />
              </div>
            }
          />
        </div>
        <div className="nav_item-group">
          <NavBarItem Icon={<DoubleAddIcon />} />
          <NavBarItem
            itemClasses={["milestone"]}
            Icon={<TickBgIcon />}
            adjacentEl={
              <div className="nav_item-label">
                <p>0/5</p>
              </div>
            }
          />
          <NavBarItem Icon={<NotificationIcon />} />
          <NavBarItem Icon={<GearIcon />} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
