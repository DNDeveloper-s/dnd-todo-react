import React, { useEffect, useRef, useState } from "react";
import classes from "./Dropdown.module.scss";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import DropdownItem from "./DropdownItem";
import PropTypes from "prop-types";
import { classNames, getBoundaryData } from "../../../helpers/utils";

const Dropdown = ({
  handle,
  direction,
  initialValue,
  containerStyle,
  handleStyle,
  holderStyle,
  containerClassNames = [],
  items = [],
  itemStyles,
  onItemSelect,
  ItemComponent,
  ItemHeader,
  ItemFooter,
  onDropdownOpen = () => null,
  onClose = () => null,
}) => {
  const { visible, setVisible, ref } = useOutsideAlerter(initialValue, onClose);
  const containerRef = useRef(null);
  const [isOverflown, setIsOverflown] = useState(null);

  function onHandleClick() {
    if (visible) {
      onClose();
    }
    setVisible(!visible);
  }

  function itemClickHandler(item, e) {
    onItemSelect(item, setVisible, e);
  }

  useEffect(() => {
    if (!visible) {
      setIsOverflown(null);
    } else {
      const rectData = containerRef.current.getBoundingClientRect();
      const boundaryData = getBoundaryData(
        { pageX: rectData.x, pageY: rectData.y },
        containerRef
      );
      setIsOverflown(boundaryData.isOverflown);
      onDropdownOpen();
    }
  }, [visible]);

  return (
    <div className={classes.Dropdown} style={holderStyle} ref={ref}>
      <div className={classes["Dropdown-handle"]} style={handleStyle} onClick={onHandleClick}>
        {handle}
      </div>
      <div
        className={classNames(
          classes["Dropdown-container"],
          classes[direction],
          ...containerClassNames,
          {
            [classes["visible"]]: visible && isOverflown,
            [classes["topCenter"]]: isOverflown?.y && !isOverflown?.x,
            // [classes["bottomLeft"]]: !isOverflown?.y && isOverflown?.x,
            [classes["topLeft"]]: isOverflown?.y && isOverflown?.x,
          }
        )}
        style={{
          // bottom: isOverflown.y ? "100%" : "",
          // bottom: "100%",
          ...containerStyle,
        }}
        ref={containerRef}
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
                    itemStyles={itemStyles}
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
  ItemComponent: PropTypes.func,
  ItemHeader: PropTypes.func,
  ItemFooter: PropTypes.element,
  onClose: PropTypes.func,
};

export default Dropdown;
