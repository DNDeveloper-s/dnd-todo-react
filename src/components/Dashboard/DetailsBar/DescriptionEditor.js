import React, {useEffect, useState} from 'react';
import Editor from "draft-js-plugins-editor";
import {EditorState, convertFromRaw, convertToRaw} from "draft-js";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import EntryComponent from "../../UI/TagInput/EntryComponent";
import {v4 as uuidV4} from "uuid";
import {colors} from "../../ColorPicker/helpers/colors";
import {getRandomInt, spliceText} from "../../../helpers/utils";
import LabelItemComponent from "../../UI/TagInput/LabelItemComponent";

// const {hasCommandModifier} = KeyBindingUtil;

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionPrefix: "#",
  mentionTrigger: "#",
  mentionComponent: LabelItemComponent,
});
const { MentionSuggestions } = mentionPlugin;


const DescriptionEditor = ({labelsData}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [labelSuggestions, setLabelSuggestions] = useState(labelsData);
  const plugins = [mentionPlugin];

  function onChange(editorState) {
    setEditorState(editorState);
  }

  useEffect(() => {
    const parsedContent = editorState.getCurrentContent();
    const content = convertToRaw(parsedContent);
    const contentBlock = content.blocks[0];
    if(contentBlock.entityRanges.length > 0) {
      contentBlock.text = spliceText(contentBlock.text, contentBlock.entityRanges[0].offset, contentBlock.entityRanges[0].length) + " ";

      // Adding label to the task
      addLabelToTask(content.entityMap[0].data);

      contentBlock.entityRanges = [];
      content.entityMap = {};
      const newContentState = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(newContentState));
    }

  }, [editorState]);

  function onLabelSearchChange({ value }) {
    let filteredSuggestions = defaultSuggestionsFilter(value, labelsData);

    if (value.trim().length > 0) {
      if (filteredSuggestions.length > 0) {
        if (
          filteredSuggestions[0].name.toLowerCase() !==
          value.trim().toLowerCase()
        ) {
          filteredSuggestions = addCreateLabel(filteredSuggestions, value);
        }
      } else {
        filteredSuggestions = addCreateLabel(filteredSuggestions, value);
      }
    }
    setLabelSuggestions(filteredSuggestions);
  }

  function addCreateLabel(suggestions, value) {
    const newSuggestionArr = Array.from(suggestions);
    const lastObj = {
      id: uuidV4(),
      name: value.trim(),
      color: colors[getRandomInt(0, 15)].value,
      icon: "LabelIcon",
      creating: true,
    };
    newSuggestionArr.push(lastObj);
    return newSuggestionArr;
  }

  function addLabelToTask(entity) {
    console.log('[DescriptionEditor.js || Line no. 83 ....]', entity);
    // TODO: Add label to task from description editor
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
      />
      <MentionSuggestions
        onSearchChange={onLabelSearchChange}
        suggestions={labelSuggestions}
        entryComponent={EntryComponent}
      />
    </div>
  );
};

export default DescriptionEditor;
