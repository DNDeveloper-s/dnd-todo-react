import React, {useState} from 'react';
import useTasks from "../../../../hooks/useTasks";

const TaskInput = ({itemMode, task, onClick}) => {
	const {curTask, updateItem, fetchItem, fetchActiveTask, updateTask} = useTasks();

	function onChange(e) {
		if(itemMode) {
			return updateItem(fetchActiveTask(), {
				itemId: task.id,
				content: e.target.value
			})
		}
		updateTask({
			taskId: task.id,
			content: e.target.value
		});
	}

	return (
		<div className="dnd_list-item-element--input" onClick={e => onClick(task.id, e)}>
			<input
				type="text"
				value={itemMode ? fetchItem(fetchActiveTask(), task.id).content : curTask(task.id).content}
				onChange={onChange}
				spellCheck={false}
			/>
		</div>
	)
}

export default TaskInput;