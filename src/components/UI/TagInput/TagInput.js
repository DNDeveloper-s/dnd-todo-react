import React, {useRef, useState} from 'react';
import { EditorState, convertToRaw } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import createSingleLinePlugin from 'draft-js-single-line-plugin'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import mentionsData from "../../../store/mentionsData";
import TagItemComponent from './TagItemComponent';
import classes from "./TagInput.module.css"
import "./TagInput.css";

const mentionPlugin = createMentionPlugin({
  mentions: mentionsData,
  entityMutability: 'IMMUTABLE',
  mentionPrefix: '#',
  mentionTrigger: '#',
  mentionComponent: TagItemComponent,
});
const singleLinePlugin = createSingleLinePlugin({
  stripEntities: false
});

const { MentionSuggestions } = mentionPlugin;

const TagInput = (props) => {
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
    setSuggestions(defaultSuggestionsFilter(value, mentionsData))
  }

  function onAddMention(entry) {
    console.log('Mention added!', entry);
  }

  function handleReturn() {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log('[TagInput.js || Line no. 55 ....]', raw);
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
      />
    </div>
  );
};

export default TagInput;
