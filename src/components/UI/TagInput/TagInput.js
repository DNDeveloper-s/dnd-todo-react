import React, { useEffect, useRef, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createSingleLinePlugin from "draft-js-single-line-plugin";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import LabelItemComponent from "./LabelItemComponent";
import classes from "./TagInput.module.css";
import "./TagInput.css";
import EntryComponent from "./EntryComponent";
import { getFilteredLabels } from "../../../helpers/utils";
import ProjectItemComponent from "./ProjectItemComponent";

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionPrefix: "#",
  mentionTrigger: "#",
  mentionComponent: LabelItemComponent,
});

const projectsPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionPrefix: "^",
  mentionTrigger: "^",
  mentionComponent: ProjectItemComponent,
});

const priorityPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionPrefix: "!",
  mentionTrigger: "!",
  mentionComponent: ProjectItemComponent,
});

const singleLinePlugin = createSingleLinePlugin({
  stripEntities: false,
});

const { MentionSuggestions } = mentionPlugin;
const { MentionSuggestions: ProjectSuggestions } = projectsPlugin;
const { MentionSuggestions: PrioritySuggestions } = priorityPlugin;

const TagInput = ({
  mentionsData: labelsData,
  projectsData,
  priorityData,
  onReturn,
  placeholder,
  editorRef,
}) => {
  // const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [labelSuggestions, setLabelSuggestions] = useState(labelsData);
  const [projectSuggestions, setProjectSuggestions] = useState(projectsData);
  const [prioritySuggestions, setPrioritySuggestions] = useState(priorityData);
  // const plugins = [mentionPlugin, projectsPlugin, priorityPlugin, singleLinePlugin];
  const plugins = [mentionPlugin, singleLinePlugin];

  function handleReturn() {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    // Calling onReturn to handle the asynchronous task and then
    // having a callback to wait for the task to finish
    onReturn(raw, () => {
      setEditorState(require("draftjs-utils").clearEditorContent(editorState));
    });
  }

  async function onChange(editorState) {
    setEditorState(editorState);
  }

  function onLabelSearchChange({ value }) {
    setLabelSuggestions(getFilteredLabels(value, labelsData));
  }

  function onProjectSearchChange({ value }) {
    setProjectSuggestions(defaultSuggestionsFilter(value, projectsData));
  }

  function onPrioritySearchChange({ value }) {
    setPrioritySuggestions(defaultSuggestionsFilter(value, priorityData));
  }

  function onAddLabel(entry) {
    console.log("Mention added!", entry);
  }

  function onAddProject(entry) {
    console.log("Mention added!", entry);
  }

  function onAddPriority(entry) {
    // const contentState = editorState.getCurrentContent();
    // const content = convertToRaw(contentState);
    // let lastMention;
    // const contentText = content.blocks[0].text;
    // content.blocks[0].entityRanges.forEach(range => {
    //   const entity = content.entityMap[range.key];
    //   if(entity.type === "!mention") {
    //     lastMention = {...range};
    //   }
    // });
    //
    // // console.log('[TagInput.js || Line no. 125 ....]', lastMention);
    // if(lastMention) {
    //   const newText = spliceText(contentText, lastMention.offset, lastMention.length);
    //   // console.log('[TagInput.js || Line no. 129 ....]', newText);
    //   content.blocks[0].text = newText;
    //   content.entityMap = {};
    //   content.blocks[0].entityRanges.shift();
    //   // console.log('[TagInput.js || Line no. 131 ....]', content);
    //   const newContentState = convertFromRaw(content);
    //   // setEditorState(EditorState.createWithContent(newContentState));
    //   setEditorState(EditorState.createWithText(''));
    //
    //   console.log('[TagInput.js || Line no. 137 ....]', convertToRaw(newContentState));
    // }
    //
    // const arr = keys.map((key) => {
    //   if(arr.)
    // });
    // console.log('Mention added!', content, entry);
  }
  return (
    <div
      className={classes["dnd_tag-input-editor"]}
      // onFocus={focusEditor}
      // onBlur={blurEditor}
    >
      {/*{editorRef.current?.getEditorRef().editor.innerText.trim().length ===*/}
      {/*  0 && (*/}
      {/*  <div className={classes["dnd_tag-input-editor-placeholder"]}>*/}
      {/*    <p>{placeholder}</p>*/}
      {/*  </div>*/}
      {/*)}*/}
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        blockRenderMap={singleLinePlugin.blockRenderMap}
        ref={editorRef}
        handleReturn={handleReturn}
        placeholder={placeholder}
      />
      <MentionSuggestions
        onSearchChange={onLabelSearchChange}
        suggestions={labelSuggestions}
        onAddMention={onAddLabel}
        entryComponent={EntryComponent}
      />
      <ProjectSuggestions
        onSearchChange={onProjectSearchChange}
        suggestions={projectSuggestions}
        onAddMention={onAddProject}
        entryComponent={EntryComponent}
      />
      <PrioritySuggestions
        onSearchChange={onPrioritySearchChange}
        suggestions={prioritySuggestions}
        onAddMention={onAddPriority}
        entryComponent={EntryComponent}
      />
    </div>
  );
};

export default TagInput;
