import React, { useRef, useState } from "react";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createSingleLinePlugin from "draft-js-single-line-plugin";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import LabelItemComponent from "./LabelItemComponent";
import classes from "./TagInput.module.css";
import "./TagInput.css";
import EntryComponent from "./EntryComponent";
import { colors } from "../../ColorPicker/helpers/colors";
import {
  getRandomInt,
  removeItemByIdInArray,
  spliceText,
  wait,
} from "../../../helpers/utils";
import { v4 as uuidV4 } from "uuid";
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
}) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [labelSuggestions, setLabelSuggestions] = useState(labelsData);
  const [projectSuggestions, setProjectSuggestions] = useState(projectsData);
  const [prioritySuggestions, setPrioritySuggestions] = useState(priorityData);

  const [focused, setFocused] = useState(false);
  // const plugins = [mentionPlugin, projectsPlugin, priorityPlugin, singleLinePlugin];
  const plugins = [mentionPlugin, singleLinePlugin];

  function focusEditor() {
    editorRef.current.focus();
    setFocused(true);
  }

  function blurEditor() {
    if (editorRef.current.getEditorRef().editor.innerText.trim().length === 0) {
      setFocused(false);
    }
  }

  async function onChange(editorState) {
    setEditorState(editorState);
  }

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

  function onProjectSearchChange({ value }) {
    setProjectSuggestions(defaultSuggestionsFilter(value, projectsData));
  }

  function onPrioritySearchChange({ value }) {
    setPrioritySuggestions(defaultSuggestionsFilter(value, priorityData));
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

  function handleReturn() {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    onReturn(raw, () => {
      editorRef.current.blur();
      setEditorState(EditorState.createWithText(""));
      editorRef.current.focus();
    });
  }

  return (
    <div
      className={classes["dnd_tag-input-editor"]}
      onFocus={focusEditor}
      onBlur={blurEditor}
    >
      {!focused && (
        <div className={classes["dnd_tag-input-editor-placeholder"]}>
          <p>{placeholder}</p>
        </div>
      )}
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        blockRenderMap={singleLinePlugin.blockRenderMap}
        ref={editorRef}
        handleReturn={handleReturn}
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
