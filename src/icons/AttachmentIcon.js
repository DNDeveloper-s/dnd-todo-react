import * as React from "react"

function AttachmentIcon(props) {
	return (
		<svg
			className="prefix__icon-item-attachment prefix__i-s-16 prefix__i-o-12 prefix__i-black"
			viewBox="0 0 16 16"
			width="1em"
			height="1em"
			transform="scale(1.4)"
			{...props}
		>
			<path d="M5.3 10.9L10 6.2c.1-.1.3-.1.5 0 .1.1.1.3 0 .5l-4.7 4.7c-.5.5-1.3.5-1.8 0s-.5-1.3 0-1.8l4.7-4.7c.9-.9 2.3-.9 3.2 0 .9.9.9 2.3 0 3.2l-3.4 3.4c-.2.2-.2.6 0 .9s.6.2.9 0L12.8 9c1.4-1.4 1.4-3.6 0-4.9-1.4-1.4-3.6-1.4-4.9 0L3 8.7c-1 1-1 2.6 0 3.6s2.6 1 3.6 0l4.7-4.7c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-4.7 4.7c-.2.2-.2.6 0 .9s.6.2.9-.1z" />
		</svg>
	)
}

export default AttachmentIcon
