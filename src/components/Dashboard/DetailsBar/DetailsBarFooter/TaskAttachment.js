import React from 'react';

const inputStyles = {
	width: "100%",
	height: "100%",
	position: "absolute",
	top: 0,
	left: 0,
	opacity: 0,
	cursor: "pointer"
};

const TaskAttachment = ({options, onUpload}) => {

	function onFileChange(e) {
		console.log(e.target.files);
		// TODO: Work with the attachment files here
		onUpload(e.target.files);
	}

	return (
		<>
			<div className="flex pv-10 pl-20 pr-10 relative itemHoverEffect pointer">
				<div className="mr-10 flexCentered">
					<options.Icon fill={"rgba(0,0,0,0.3)"} />
				</div>
				<div className="heading_6">
					{options.name}
				</div>
				<input type="file" onChange={onFileChange} style={inputStyles}/>
			</div>
		</>
	)
}

export default TaskAttachment;
