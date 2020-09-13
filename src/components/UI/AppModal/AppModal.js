import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import "./AppModal.scss";
import { wait } from "../../../helpers/utils";
import PropTypes from "prop-types";

const AppModal = ({
  children,
  noBackdrop,
  onClose,
  backdropDisabled = false,
  style,
  showIt,
  setShowIt,
}) => {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const [showEl, setShowEl] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShowIt && setShowIt(false);
      if (modalRef.current) {
        hide()
          .then()
          .catch((e) => console.error(e));
      }
    }
    // else show();
  }, [visible]);

  useEffect(() => {
    if (showIt) {
      setVisible(true);
      setShowEl(true);
    }
  }, [showIt]);

  async function hide() {
    modalRef.current.classList.add("hideIt");
    !noBackdrop && backdropRef.current.classList.add("hideIt");
    await wait(300);
    setShowEl(false);
    onClose();
  }

  // async function show() {
  //   modalRef.current.classList.remove("hideIt");
  //   !noBackdrop && backdropRef.current.classList.remove("hideIt");
  //   await wait(300);
  //   setShowEl(true);
  // }

  return (
    showEl &&
    ReactDom.createPortal(
      <>
        {!noBackdrop && (
          <div
            className="app-backdrop"
            ref={backdropRef}
            onClick={() => !backdropDisabled && setVisible(false)}
          />
        )}
        <div className="app-modal" style={style} ref={modalRef}>
          {children(setVisible)}
        </div>
      </>,
      document.getElementById("modal-root")
    )
  );
};

AppModal.propTypes = {
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AppModal;
