import React from 'react';
import classes from './TagInput.module.scss'

const ProjectItemComponent = ({entityKey, decoratedText}) => {
    const spanStyles = {
        // color: mention.color || undefined
    };
    return (
        <span data-offset-key={entityKey} className={[classes["dnd_tag-input-tag_item"], classes["project"]].join(" ")} style={spanStyles} contentEditable={true}>
            {decoratedText}
        </span>
    );
};

export default ProjectItemComponent;
