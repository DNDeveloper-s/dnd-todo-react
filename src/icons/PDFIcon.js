import * as React from "react"

function PDFIcon(props) {
	return (
		<svg
			className="prefix__icon-pdf"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			{...props}
		>
			<path
				d="M5 2h10l6 6v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"
				fillRule="evenodd"
				clipRule="evenodd"
				fill="#ff6267"
			/>
			<path
				d="M17.1 15.3c1.6-.2 1.1-.6 0-1.1-2.8-1.2-9.4.7-11 3.9-.6 1.1 1 1.5 2.4-.6 1.5-2.3 3.3-3.8 3.8-8.3.4-2.4-.7-2.2-.7-2.2-1.7.5 0 9.2 5.5 8.3z"
				fill="none"
				stroke="#fff2f3"
			/>
			<path
				d="M15 2l6 6h-4c-1.1 0-2-.9-2-2V2z"
				opacity={0.1}
				fillRule="evenodd"
				clipRule="evenodd"
			/>
		</svg>
	)
}

export default PDFIcon
