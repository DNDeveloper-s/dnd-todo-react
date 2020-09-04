import React, {useState} from 'react';

const TaskInput = ({task, onClick}) => {
	const [value, setValue] = useState(task.content);

	return (
		<div className="dnd_list-item-element--input" onClick={e => onClick(task.id, e)}>
			<input type="text" value={" [" + task.id + "] " + value} onChange={e => setValue(e.target.value)}/>
		</div>
	)
}

export default TaskInput;