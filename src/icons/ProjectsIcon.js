import * as React from "react"

function ProjectsIcon({fill, scale, ...props}) {
  return (
    <svg width={295} height={272} viewBox="0 0 295 272" fill="none" style={{transform: `scale(${scale})`}} {...props}>
      <path
        style={{fill}}
        d="M261.737 47.794V.13h-236.6v75.906H47.73V22.724h191.416v25.07h22.591z"
        fill="#000"
      />
      <path
        style={{fill}}
        d="M166.343 76.065H.977l25.536 195.806h234.283l33.508-224.046H166.343v28.24zm43.935 143.405H76.604v-22.593h133.675v22.593h-.001zm0-33.889H76.604v-22.593h133.675v22.593h-.001zm0-33.89H76.604v-22.592h133.675v22.592h-.001z"
        fill="#000"
      />
    </svg>
  )
}

export default ProjectsIcon;

