import * as React from "react";

function LabelIcon({ fill, ...props }) {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill={fill || "black"}
      {...props}
    >
      <path d="M0 4.4L.1.9C.1.5.4.2.9.1L4.4 0c.3 0 .6.1.8.3l4.5 4.5c.4.4.4 1.1 0 1.5L6.3 9.7c-.4.4-1.1.4-1.5 0L.3 5.2C.1 5 0 4.7 0 4.4zm3.9-.5c.4-.4.4-1.1 0-1.5-.4-.4-1.1-.4-1.5 0-.4.4-.4 1.1 0 1.5.4.4 1.1.4 1.5 0z" />
    </svg>
  );
}

export default LabelIcon;
