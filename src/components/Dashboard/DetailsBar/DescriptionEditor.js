import React, { useEffect, useState } from "react";
import Editor from "draft-js-plugins-editor";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import createMentionPlugin from "draft-js-mention-plugin";
import EntryComponent from "../../UI/TagInput/EntryComponent";
import {
  getFilteredLabels,
  pushToArray,
  spliceText,
} from "../../../helpers/utils";
import LabelItemComponent from "../../UI/TagInput/LabelItemComponent";
import { UPDATE_TASK } from "../../../features/taskSlice";
import { useDispatch } from "react-redux";
import useLabels from "../../../hooks/useLabels";

// const {hasCommandModifier} = KeyBindingUtil;

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionPrefix: "#",
  mentionTrigger: "#",
  mentionComponent: LabelItemComponent,
});
const { MentionSuggestions } = mentionPlugin;

const DescriptionEditor = ({
  editorState,
  setEditorState,
  labelsData,
  task,
}) => {
  const [labelSuggestions, setLabelSuggestions] = useState(labelsData);
  const plugins = [mentionPlugin];
  const dispatch = useDispatch();
  const { createLabel } = useLabels();

  function onChange(editorState) {
    setEditorState(editorState);
  }

  useEffect(() => {
    const parsedContent = editorState.getCurrentContent();
    const content = convertToRaw(parsedContent);
    const contentBlock = content.blocks[0];
    if (contentBlock.entityRanges.length > 0) {
      contentBlock.text =
        spliceText(
          contentBlock.text,
          contentBlock.entityRanges[0].offset,
          contentBlock.entityRanges[0].length
        ) + " ";

      console.log(contentBlock.text);

      // Adding label to the task
      addLabelToTask(content.entityMap[0].data);

      contentBlock.entityRanges = [];
      content.entityMap = {};
      const newContentState = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(newContentState));
    }
  }, [editorState]);

  function onLabelSearchChange({ value }) {
    setLabelSuggestions(getFilteredLabels(value, labelsData));
  }

  function addLabelToTask(entity) {
    onAddLabel(entity.mention);
  }

  function onAddLabel(labelItem) {
    const taskLabels = task.labelIds;

    if (labelItem.creating) {
      createLabel(labelItem, task.id);
    }

    const newTaskLabelIds = pushToArray(taskLabels, labelItem.id, {
      allowDuplicates: false,
    });

    dispatch(
      UPDATE_TASK({
        taskId: task.id,
        labelIds: newTaskLabelIds,
      })
    );
  }

  return (
    <div>
      <Editor editorState={editorState} onChange={onChange} plugins={plugins} />
      <MentionSuggestions
        onSearchChange={onLabelSearchChange}
        suggestions={labelSuggestions}
        entryComponent={EntryComponent}
      />
    </div>
  );
};

export default DescriptionEditor;
