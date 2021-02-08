import * as React from "react"

function DownloadIcon(props) {
	return (
		<svg
			className="prefix__icon-download prefix__i-2"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			transform="scale(1.5)"
			{...props}
		>
			<path
				d="M12.8 13.3l2.7-2.7 1.1 1.1-4 4c-.3.3-.8.3-1.1 0l-4-4 1.1-1.1 2.7 2.7V5.1h1.5v8.2zm4.2.8h1.5v2c0 1.5-1.1 2.8-2.4 2.8H7.9c-1.4 0-2.4-1.3-2.4-2.8v-2H7v2c0 .7.4 1.2.9 1.2H16c.5 0 .9-.5.9-1.2v-2z"
				fill="rgba(0, 0, 0, 0.54)"
			/>
		</svg>
	)
}

export default DownloadIcon
