import React, { useEffect, useState } from "react";
import Editor from "draft-js-plugins-editor";
import { EditorState, convertFromRaw, convertToRaw, SelectionState } from "draft-js";
import createMentionPlugin from "draft-js-mention-plugin";
import EntryComponent from "../../UI/TagInput/EntryComponent";
import {
  getFilteredLabels,
  pushToArray,
  spliceText,
} from "../../../helpers/utils";
import LabelItemComponent from "../../UI/TagInput/LabelItemComponent";
import useLabels from "../../../hooks/useLabels";
import useTasks from "../../../hooks/useTasks";


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
  const { createLabel } = useLabels();
  const { updateTask } = useTasks();

  // const moveSelectionToEnd = (editorState) => {
  //   const content = editorState.getCurrentContent();
  //   const blockMap = content.getBlockMap();
  //   const key = blockMap.last().getKey();
  //   const length = blockMap.last().getLength();
  //   const selection = new SelectionState({
  //     anchorKey: key,
  //     anchorOffset: length,
  //     focusKey: key,
  //     focusOffset: length,
  //   });
  //   return EditorState.acceptSelection(editorState, selection);
  // };

  function onChange(editorState) {
    // const rawContent = {
    //   "blocks": [{
    //     "text": "asdf asdf asdfa sdfw",
    //   }, {
    //     "text": "asdf asdfg",
    //   }, {
    //     "text": "fda",
    //   }],
    //   "entityMap": {}
    // };



    // const parsedEditorState = convertFromRaw(rawContent);
    // const editState = EditorState.createWithContent(editorState);
    // const selectedState = moveSelectionToEnd(editorState);
    setEditorState(editorState);
  }

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const content = convertToRaw(contentState);

    // const contentBlocks = contentState.getLastCreatedEntityKey();
    //
    // const lastEntity = contentState.getEntity(contentBlocks);
    //
    // console.log(lastEntity);

    // contentBlocks[0].findEntityRanges(false, (start, end) => {
    //   console.log(start, end);
    // });

    const contentBlock = content.blocks[0];
    if (contentBlock.entityRanges.length > 0) {
      contentBlock.text =
        spliceText(
          contentBlock.text,
          contentBlock.entityRanges[0].offset,
          contentBlock.entityRanges[0].length
        ) + " ";

      // console.log(contentBlock.text);

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
    //
    // const contentState = editorState.getCurrentContent();
    // const lastEntityKey = contentState.getLastCreatedEntityKey();
    //
    // const newContentState = contentState.replaceEntityData(lastEntityKey, null);
    // const content = convertToRaw(newContentState);
    //
    // console.log(content);

    // const lastEntity = contentState.getEntity(lastEntityKey).getData();
    //
    // console.log(lastEntity);
  }

  function onAddLabel(labelItem) {
    const taskLabels = task.labelIds;

    if (labelItem.creating) {
      createLabel(labelItem, task.id);
    }

    const newTaskLabelIds = pushToArray(taskLabels, labelItem.id, {
      allowDuplicates: false,
    });

    updateTask({
      taskId: task.id,
      labelIds: newTaskLabelIds,
    });
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        placeholder="Description"
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
