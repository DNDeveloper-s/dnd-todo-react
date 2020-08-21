import React, {useRef, useState} from 'react';
import { EditorState, convertToRaw } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import createSingleLinePlugin from 'draft-js-single-line-plugin'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import TagItemComponent from './TagItemComponent';
import classes from "./TagInput.module.css"
import "./TagInput.css";
import EntryComponent from "./EntryComponent";
import {colors} from "../../ColorPicker/helpers/colors";
import {getRandomInt} from "../../../helpers/utils";
import {v4 as uuidV4} from "uuid";

const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  mentionPrefix: '#',
  mentionTrigger: '#',
  mentionComponent: TagItemComponent
});
const singleLinePlugin = createSingleLinePlugin({
  stripEntities: false
});

const { MentionSuggestions } = mentionPlugin;

const TagInput = ({mentionsData, onReturn}) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState(mentionsData);
  const [focused, setFocused] = useState(false);
  const plugins = [mentionPlugin, singleLinePlugin];

  function focusEditor() {
    editorRef.current.focus();
    setFocused(true);
  }

  function blurEditor() {
    if(editorRef.current.getEditorRef().editor.innerText.trim().length === 0) {
      setFocused(false);
    }
  }

  function onChange(editorState) {
    setEditorState(editorState);
  }

  function onSearchChange({value}) {
    let filteredSuggestions = defaultSuggestionsFilter(value, mentionsData);

    if(value.trim().length > 0) {
      if(filteredSuggestions.length > 0) {
        if(filteredSuggestions[0].name.toLowerCase() !== value.trim().toLowerCase()) {
          filteredSuggestions = addCreateLabel(filteredSuggestions, value);
        }
      } else {
          filteredSuggestions = addCreateLabel(filteredSuggestions, value);
      }
    }
    setSuggestions(filteredSuggestions);
  }

  function addCreateLabel(suggestions, value) {
    const newSuggestionArr = Array.from(suggestions);
    const lastObj = {
      id: uuidV4(),
      name: value.trim(),
      color: colors[getRandomInt(0, 15)].value  ,
      icon: 'LabelIcon',
      creating: true
    };
    newSuggestionArr.push(lastObj);
    return newSuggestionArr
  }

  function onAddMention(entry) {
    console.log('Mention added!', entry);
  }

  function handleReturn() {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    onReturn(raw, () => {
      editorRef.current.blur();
      setEditorState(EditorState.createWithText(''));
      editorRef.current.focus();
    });
  }

  return (
    <div className={classes['dnd_tag-input-editor']} onFocus={focusEditor} onBlur={blurEditor}>
      {!focused && <div className={classes['dnd_tag-input-editor-placeholder']}>
        <p>Add Task here...</p>
      </div>}
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        blockRenderMap={singleLinePlugin.blockRenderMap}
        ref={editorRef}
        handleReturn={handleReturn}
      />
      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        onAddMention={onAddMention}
        entryComponent={EntryComponent}
      />
    </div>
  );
};

export default TagInput;
