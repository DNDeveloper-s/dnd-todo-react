import React, {useEffect, useState} from 'react';

const useFocus = (initialId) => {
	const [focusId, setFocusId] = useState(initialId);

	useEffect(() => {

	}, [focusId]);

	return {
		focusId,
		setFocusId,
	}
}

export default useFocus;