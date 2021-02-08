import React from "react";
import HamBurgerIcon from "../../../icons/HamBurgerIcon";
import HomeIcon from "../../../icons/HomeIcon";
import SearchIcon from "../../../icons/SearchIcon";
import DoubleAddIcon from "../../../icons/DoubleAddIcon";
import TickBgIcon from "../../../icons/TickBgIcon";
import GearIcon from "../../../icons/GearIcon";

import "./NavBar.css";
import NavBarItem from "./NavBarItem";
import LogOutIcon from "../../../icons/LogOutIcon";
import { useDispatch } from "react-redux";
import { AUTH_STATE } from "../../../features/authSlice";
import NavBarNotification from "./NavBarNotification";

// Components Imports

// Images Imports

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    window.localStorage.removeItem("bearer");
    dispatch(
      AUTH_STATE({
        isLoggedIn: false,
        token: null,
      })
    );
  };

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
          <NavBarNotification />
          <NavBarItem Icon={<GearIcon />} />
          <NavBarItem Icon={<LogOutIcon />} onClick={handleLogOut} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
