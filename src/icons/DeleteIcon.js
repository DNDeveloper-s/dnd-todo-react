import * as React from "react";

function DeleteIcon(props) {
  return (
    <svg width={10} height={12} viewBox="0 0 10 12" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.3 1.5l.5-1h4.4l.5 1H9c.3 0 .5.2.5.5v1h-9V2c0-.3.2-.5.5-.5h1.3zM2 4h6c.6 0 1 .4 1 1v4.5c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-.6.4-1 1-1z"
      />
    </svg>
  );
}

export default DeleteIcon;
