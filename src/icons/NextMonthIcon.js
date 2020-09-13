import * as React from "react";

function NextMonthIcon({ style, ...props }) {
  return (
    <svg
      width={83}
      height={92}
      viewBox="0 0 83 92"
      fill="none"
      style={{ ...style, transform: "scale(0.92)" }}
      {...props}
    >
      <path
        fill="#C4C4C4"
        d="M46 91.902c-25.364 0-46-20.64-46-46C0 21.286 19.28 1.126 43.888.006c.853-.064 1.524.4 1.884 1.1a2.012 2.012 0 01-.244 2.168 42.047 42.047 0 00-9.523 26.628c0 23.159 18.836 42 42 42 .392 0 .775-.032 1.164-.056l.76-.05c.74-.03 1.523.4 1.88 1.102.36.708.261 1.556-.244 2.163C72.783 85.763 59.821 91.9 46 91.9z"
      />
    </svg>
  );
}

export default NextMonthIcon;
