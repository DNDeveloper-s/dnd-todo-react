import React, { useRef } from "react";
import LabelIcon from "../../../icons/LabelIcon";
import ProjectsIcon from "../../../icons/ProjectsIcon";
import ContextMenu from "../../UI/ContextMenu/ContextMenu";

// Components Imports

// Images Imports

const SideBarDropDownItem = ({ item, onClick, contextMenu }) => {
  const itemRef = useRef();
  return (
    <>
      <div
        className="dashboard-sidebar-dropdown-item"
        onClick={() => onClick(item)}
        ref={itemRef}
      >
        {item.type === "label" && (
          <div className="dashboard-sidebar-dropdown-item-icon">
            <LabelIcon fill={item.color} />
          </div>
        )}
        {item.type === "project" && (
          <div className="dashboard-sidebar-dropdown-item-icon">
            <ProjectsIcon scale={0.8} fill={item.color} />
          </div>
        )}
        <div className="dashboard-sidebar-dropdown-item-label">
          <p style={{width: '168px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>{item.content}</p>
        </div>
      </div>
      {contextMenu && (
        <ContextMenu
          listenerRef={itemRef}
          holderStyle={contextMenu.holderStyle}
        >
          {(setVisible) => contextMenu.children(item, setVisible)}
        </ContextMenu>
      )}
    </>
  );
};

export default SideBarDropDownItem;
