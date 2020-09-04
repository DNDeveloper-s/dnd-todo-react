import React from 'react';
import classes from './TagInput.module.scss'

const LabelItemComponent = ({entityKey, mention, decoratedText, ...props}) => {
    const spanStyles = {
        backgroundColor: mention.color || undefined
    };
    return (
        <span data-offset-key={entityKey} className={[classes["dnd_tag-input-tag_item"]]} style={spanStyles} contentEditable={false}>
            {decoratedText}
        </span>
    );
};

export default LabelItemComponent;
