import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import "./ContextMenu.scss";

const ContextMenu = ({ listenerRef, onClose = () => null }) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false, onClose);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    listenerRef.current.addEventListener("contextmenu", contextMenuHandler);

    return () => {
      listenerRef.current.removeEventListener(
        "contextmenu",
        contextMenuHandler
      );
    };
  }, []);

  function contextMenuHandler(e) {
    e.preventDefault();
    setCoords({ x: e.pageX, y: e.pageY });
    setVisible(true);
  }

  const coordsStyle = {
    top: coords?.y + "px",
    left: coords?.x + "px",
  };

  return ReactDOM.createPortal(
    visible && (
      <div className="context-menu-holder" style={coordsStyle} ref={ref}>
        <div className="context-menu-item">
          <p>Item 1</p>
        </div>
        <div className="context-menu-item">
          <p>Item 2</p>
        </div>
        <div className="context-menu-item">
          <p>Item 3</p>
        </div>
        <div className="context-menu-item">
          <p>Item 4</p>
        </div>
        <div className="context-menu-item">
          <p>Item 5</p>
        </div>
        <div className="context-menu-item">
          <p>Item 6</p>
        </div>
      </div>
    ),
    document.getElementById("context-menu-root")
  );
};

export default ContextMenu;
