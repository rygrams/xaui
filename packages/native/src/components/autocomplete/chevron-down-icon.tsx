import React from 'react'
import Svg, { Path } from 'react-native-svg'

type ChevronDownIconProps = {
  size?: number
  color?: string
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 10L12 15L17 10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
