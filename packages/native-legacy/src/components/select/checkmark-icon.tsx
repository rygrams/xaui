import React from 'react'
import Svg, { Polyline } from 'react-native-svg'

type CheckmarkIconProps = {
  color: string
  size: number
}

export function CheckmarkIcon({ color, size }: CheckmarkIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 18" fill="none">
      <Polyline
        points="1 9 7 14 15 4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
