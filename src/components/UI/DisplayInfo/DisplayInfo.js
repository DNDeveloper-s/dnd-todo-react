import React from 'react';
import ReactDOM from 'react-dom';

const DisplayInfo = () => {

	const element = (
		<div>
			<p>Nice one</p>
		</div>
	)

	return ReactDOM.createPortal (
		element,
		document.getElementById('info-display')
	)
}

export default DisplayInfo;