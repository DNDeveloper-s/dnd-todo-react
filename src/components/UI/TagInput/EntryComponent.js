import React from 'react';
import classes from './TagInput.module.scss';
import classNames from 'classnames';

const EntryComponent = (props) => {
  const entryClasses = classNames({
    [classes['mention-entry-item']]: true,
    [classes['focused']]: props.isFocused
  });

  return (
    <div className={entryClasses}>
      <div className={classes["mention-entry-item-icon"]}>
        {require('../../../icons/' + props.mention.icon + '.js').default({fill: props.mention.color})}
      </div>
      <div className={classes['mention-entry-item-label']}>
        <p>{props.mention.creating ? `Create Label - "${props.mention.name}"` : props.mention.name}</p>
      </div>
    </div>
  );
};

export default EntryComponent;
