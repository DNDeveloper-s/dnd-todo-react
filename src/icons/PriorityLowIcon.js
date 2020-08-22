import * as React from "react"

function PriorityLowIcon({scale, ...props}) {
  return (
    <svg width={30} height={273} viewBox="0 0 30 273" fill="none" style={{transform: `scale(${scale})`}} {...props}>
      <rect width={30} height={205} rx={15} fill="#4B6FDE" />
      <rect y={243} width={30} height={30} rx={15} fill="#4B6FDE" />
    </svg>
  )
}

export default PriorityLowIcon;
