import * as React from "react";

function NextWeekIcon(props) {
  return (
    <svg width={72} height={73} viewBox="0 0 72 73" fill="none" {...props}>
      <rect y={14} width={72} height={59} rx={8} fill="#C4C4C4" />
      <rect x={11} width={9} height={22} rx={4.5} fill="#C4C4C4" />
      <rect x={52} width={9} height={22} rx={4.5} fill="#C4C4C4" />
      <path
        className="noHover"
        d="M29.2 41.674h6.345v4.588h-6.346v7.172h-4.834v-7.172h-6.363v-4.588h6.363V34.8H29.2v6.873zm26.595-8.42L45.898 56h-5.36l9.913-21.48H37.725v-4.114h18.07v2.848z"
        fill="#fff"
      />
    </svg>
  );
}

export default NextWeekIcon;
