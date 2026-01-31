import React from 'react'
import Svg, { Path } from 'react-native-svg'

type ClearIconProps = {
  size?: number
  color?: string
}

export const ClearIcon: React.FC<ClearIconProps> = ({
  size = 18,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
