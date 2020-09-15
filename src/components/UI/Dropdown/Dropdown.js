import React from "react";
import classes from "./Dropdown.module.scss";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import DropdownItem from "./DropdownItem";
import PropTypes from "prop-types";

/**
 * @deprecated
 * @param handle
 * @param direction
 * @param initialValue
 * @param containerStyle
 * @param items
 * @param onItemSelect
 * @param ItemComponent
 * @param ItemHeader
 * @param ItemFooter
 * @param onClose
 * @returns {JSX.Element}
 * @constructor
 */

const Dropdown = ({
  handle,
  direction,
  initialValue,
  containerStyle,
  items = [],
  onItemSelect,
  ItemComponent,
  ItemHeader,
  ItemFooter,
  onClose = () => null,
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
        style={containerStyle}
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
  onItemSelect: PropTypes.func,
  ItemComponent: PropTypes.element,
  ItemHeader: PropTypes.element,
  ItemFooter: PropTypes.element,
  onClose: PropTypes.func,
};

export default Dropdown;
