import React from 'react'
import Svg, { Circle, Line, Path } from 'react-native-svg'

type AlertIconProps = {
  color: string
  size: number
}

export function InfoIcon({ color, size }: AlertIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <Line
        x1={12}
        y1={10}
        x2={12}
        y2={16}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={7} r={1} fill={color} />
    </Svg>
  )
}

export function SuccessIcon({ color, size }: AlertIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <Path
        d="M7 12.5L10.2 15.5L17 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function WarningIcon({ color, size }: AlertIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3L22 20H2L12 3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={9}
        x2={12}
        y2={14}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={17} r={1} fill={color} />
    </Svg>
  )
}

export function DangerIcon({ color, size }: AlertIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <Line
        x1={9}
        y1={9}
        x2={15}
        y2={15}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Line
        x1={15}
        y1={9}
        x2={9}
        y2={15}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
