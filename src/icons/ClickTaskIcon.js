import * as React from "react"

function ClickTaskIcon(props) {
  return (
    <svg viewBox="0 0 41 41" fill="none" {...props}>
      <circle cx={20.5} cy={20.5} r={20.5} fill="#ECFAFF" />
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={41}
        height={41}
      >
        <circle cx={20.5} cy={20.5} r={20.5} fill="#ECFAFF" />
      </mask>
      <g mask="url(#prefix__a)">
        <rect x={-1} width={29} height={31} rx={1} fill="#C4C4C4" />
        <rect x={-5} y={-1} width={31} height={29} rx={1} fill="#fff" />
        <path fill="#C4C4C4" d="M-2 5h25v2H-2zM15 12h8v2h-8zM2 19h21v2H2z" />
        <path
          d="M30.8 32.1l-3.843-3.843 1.892-1.892-5.278-2.036-5.279-2.037 2.037 5.279 2.036 5.278 1.892-1.892 3.844 3.843c.42.42 1.365.157 2.11-.588.746-.747 1.01-1.691.59-2.111z"
          fill="#676af0"
        />
        <path
          d="M16.294 24.29a2.83 2.83 0 010-3.996 2.824 2.824 0 014.78 2.487l.443.172a3.293 3.293 0 00-.895-2.99 3.298 3.298 0 00-4.659 0 3.292 3.292 0 002.989 5.554l-.17-.444a2.824 2.824 0 01-2.488-.782z"
          fill="#676af0"
        />
        <path
          d="M20.626 22.608a2.355 2.355 0 00-4.001-1.984 2.354 2.354 0 001.984 4.002l-.174-.45a1.887 1.887 0 01-1.48-.547 1.893 1.893 0 010-2.674 1.888 1.888 0 013.22 1.48l.451.173z"
          fill="#676af0"
        />
      </g>
    </svg>
  )
}

export default ClickTaskIcon
