import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import "./ContextMenu.scss";
import { getBoundaryData } from "../../../helpers/utils";

const ContextMenu = ({
  children,
  holderStyle,
  listenerRef,
  onClose = () => null,
}) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false, onClose);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const contextMenuHandler = useCallback(
    (e) => {
      e.preventDefault();
      setVisible(true);
      if (ref.current) {
        const boundaryCoords = getBoundaryData(e, ref);
        setCoords(boundaryCoords);
      }
    },
    [ref, setVisible]
  );

  useEffect(() => {
    listenerRef.current &&
      listenerRef.current.addEventListener("contextmenu", contextMenuHandler);

    return () => {
      listenerRef.current &&
        listenerRef.current.removeEventListener(
          "contextmenu",
          contextMenuHandler
        );
    };
  }, [listenerRef, contextMenuHandler]);

  const coordsStyle = {
    top: coords?.y + "px",
    left: coords?.x + "px",
    ...holderStyle,
  };

  return ReactDOM.createPortal(
    visible && (
      <div className="context-menu-holder" style={coordsStyle} ref={ref}>
        {children(setVisible)}
      </div>
    ),
    document.getElementById("context-menu-root")
  );
};

ContextMenu.propTypes = {
  children: PropTypes.func.isRequired,
  listenerRef: PropTypes.any.isRequired,
  onClose: PropTypes.func,
};

export default ContextMenu;
