import React from 'react';
import classes from './TagInput.module.scss';
import classNames from 'classnames';

const EntryComponent = ({mention, theme, searchValue, isFocused, ...parentProps}) => {
  const entryClasses = classNames({
    [classes['mention-entry-item']]: true,
    [classes['focused']]: isFocused
  });
  return (
    <div className={entryClasses} {...parentProps}>
      <div className={classes["mention-entry-item-icon"]}>
        {require('../../../icons/' + mention.icon + '.js').default({fill: mention.color, scale: 0.7})}
      </div>
      <div className={classes['mention-entry-item-label']}>
        <p>{mention.creating ? `Create Label - "${mention.name}"` : mention.name}</p>
      </div>
    </div>
  );
};

export default EntryComponent;
