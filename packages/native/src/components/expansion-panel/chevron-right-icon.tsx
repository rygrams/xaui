import React from 'react'
import Svg, { Path } from 'react-native-svg'

type ChevronRightIconProps = {
  color?: string
  size?: number
}

export const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  color = '#000',
  size = 20,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
