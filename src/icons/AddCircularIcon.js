import * as React from "react";

function AddCircularIcon(props) {
  return (
    <svg
      className="prefix__icon-add-list"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M12.8 11.2H16c.5 0 .8.4.8.8 0 .5-.4.8-.8.8h-3.1V16c0 .5-.4.8-.8.8s-.8-.4-.8-.8v-3.1H8c-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8h3.1V8.1c0-.5.4-.8.8-.8s.8.4.8.8v3.1zm-.8 8.9c4.5 0 8.1-3.6 8.1-8.1S16.5 3.9 12 3.9 3.9 7.5 3.9 12s3.6 8.1 8.1 8.1z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default AddCircularIcon;
