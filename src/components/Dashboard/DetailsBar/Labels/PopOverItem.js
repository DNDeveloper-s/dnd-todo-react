import React, {useEffect, useRef} from 'react';
import LabelIcon from "../../../../icons/LabelIcon";

const PopOverItem = ({focusIt, item: mention, ...props}) => {
  const ref = useRef(null);

  useEffect(() => {
    if(focusIt) {
      ref.current.classList.add('isFocused');
    } else {
      ref.current.classList.remove('isFocused');
    }
  }, [focusIt]);

  return (
    <div className="add_label-popover-item" ref={ref} {...props}>
      <div className="add_label-popover-item-icon">
        {require('../../../../icons/' + mention.icon + '.js').default({fill: mention.color, scale: 0.7})}
      </div>
      <div className="add_label-popover-item-title">
        <p>{mention.creating ? `Create Label - "${mention.name}"` : mention.name}</p>
      </div>
    </div>
  );
};
export default PopOverItem;
