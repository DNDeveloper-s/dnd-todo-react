import React from 'react';
import classes from './TagInput.module.scss'

const TagItemComponent = ({mention, decoratedText}) => {
    const spanStyles = {
        backgroundColor: mention.color || undefined
    };
    return (
        <span className={[classes["dnd_tag-input-tag_item"]]} style={spanStyles} contentEditable={false}>
            {decoratedText}
        </span>
    );
};

export default TagItemComponent;
