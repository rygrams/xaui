import React from 'react'
import Svg, { Path } from 'react-native-svg'

type ChevronDownIconProps = {
  color: string
  size: number
  isOpen?: boolean
}

export function ChevronDownIcon({ color, size, isOpen = false }: ChevronDownIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={isOpen ? { transform: [{ rotate: '180deg' }] } : undefined}
    >
      <Path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
