import * as React from "react"

function PriorityNoneIcon({scale, ...props}) {
  return (
    <svg width={214} height={273} viewBox="0 0 214 273" fill="none" style={{transform: `scale(${scale})`}} {...props}>
      <rect width={30} height={205} rx={15} fill="#C4C4C4" />
      <rect y={243} width={30} height={30} rx={15} fill="#C4C4C4" />
      <rect x={92} width={30} height={205} rx={15} fill="#C4C4C4" />
      <rect x={92} y={243} width={30} height={30} rx={15} fill="#C4C4C4" />
      <rect x={184} width={30} height={205} rx={15} fill="#C4C4C4" />
      <rect x={184} y={243} width={30} height={30} rx={15} fill="#C4C4C4" />
    </svg>
  )
}

export default PriorityNoneIcon
