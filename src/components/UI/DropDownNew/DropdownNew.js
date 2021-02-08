import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import "./DropdownNew.scss";
import { getBoundaryData } from "../../../helpers/utils";

const DropdownNew = ({
  children,
  holderStyle,
  listenerRef,
  onClose = () => null,
}) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false, onClose);
  const [coords, setCoords] = useState(null);

  const onClickHandler = useCallback(
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
    console.log(listenerRef.current);
    listenerRef.current &&
      listenerRef.current.addEventListener("click", onClickHandler);

    return () => {
      listenerRef.current &&
        listenerRef.current.removeEventListener("click", onClickHandler);
    };
  }, [listenerRef, onClickHandler]);

  const coordsStyle = {
    top: coords?.y + "px",
    left: coords?.x + "px",
    ...holderStyle,
  };

  return ReactDOM.createPortal(
    visible && (
      <div className="dropdown-holder" style={coordsStyle} ref={ref}>
        {children(setVisible)}
      </div>
    ),
    document.getElementById("dropdown-root")
  );
};

DropdownNew.propTypes = {
  children: PropTypes.func.isRequired,
  listenerRef: PropTypes.any.isRequired,
  onClose: PropTypes.func,
};

export default DropdownNew;
