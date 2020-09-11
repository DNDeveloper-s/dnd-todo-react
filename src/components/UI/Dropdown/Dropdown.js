import React from "react";
import classes from "./Dropdown.module.scss";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import DropdownItem from "./DropdownItem";
import PropTypes from "prop-types";

const Dropdown = ({
  handle,
  direction,
  initialValue,
  items = [],
  onItemSelect,
  ItemComponent,
  ItemHeader,
  ItemFooter,
  onClose,
}) => {
  const { visible, setVisible, ref } = useOutsideAlerter(initialValue, onClose);

  function onHandleClick() {
    if (visible) {
      onClose();
    }
    setVisible(!visible);
  }

  function itemClickHandler(item, e) {
    onItemSelect(item, setVisible, e);
  }

  return (
    <div className={classes.Dropdown} ref={ref}>
      <div className={classes["Dropdown-handle"]} onClick={onHandleClick}>
        {handle}
      </div>
      <div
        className={[
          classes["Dropdown-container"],
          classes[direction],
          visible ? classes["visible"] : "",
        ].join(" ")}
      >
        {visible && (
          <>
            {ItemHeader && ItemHeader(setVisible)}
            {ItemComponent ? (
              ItemComponent(setVisible)
            ) : (
              <>
                {items.map((item) => (
                  <DropdownItem
                    key={item.id}
                    item={item}
                    onClick={itemClickHandler}
                  />
                ))}
              </>
            )}
            {ItemFooter && <ItemFooter />}
          </>
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  handle: PropTypes.element.isRequired,
  direction: PropTypes.oneOf([
    "topLeft",
    "topCenter",
    "topRight",
    "rightCenter",
    "bottomRight",
    "bottomCenter",
    "bottomLeft",
    "leftCenter",
  ]),
  initialValue: PropTypes.bool,
  items: PropTypes.array,
  onItemSelect: PropTypes.func.isRequired,
  ItemComponent: PropTypes.element,
  ItemHeader: PropTypes.element,
  ItemFooter: PropTypes.element,
  onClose: PropTypes.func,
};

export default Dropdown;
