import React from 'react'
import Svg, { Path } from 'react-native-svg'

type FileInputPlusIconProps = {
  size?: number
  color?: string
}

export const FileInputPlusIcon: React.FC<FileInputPlusIconProps> = ({
  size = 16,
  color = '#111827',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
