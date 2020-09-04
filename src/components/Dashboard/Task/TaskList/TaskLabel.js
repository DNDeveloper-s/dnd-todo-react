import React from 'react';
import useLabels from "../../../../hooks/useLabels";

const TaskLabel = ({labelId}) => {
	const {curLabel} = useLabels();

	return (
		<div className="dnd_list-item-element--label"
			style={{
				backgroundColor: curLabel(labelId).color
			}}
		>
			<p>{curLabel(labelId).content}</p>
		</div>
	)
}

export default TaskLabel;