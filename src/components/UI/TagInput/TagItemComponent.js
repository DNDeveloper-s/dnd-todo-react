import React from 'react';
import classes from './TagInput.module.scss'

const TagItemComponent = ({mention, decoratedText}) => {

    return (
        <span className={[classes["dnd_tag-input-tag_item"]]} contentEditable={false}>
            {decoratedText}
        </span>
    );
};

export default TagItemComponent;
