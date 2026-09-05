import { Path, Svg } from 'react-native-svg'
import type { IconComponentProps } from '../../system/icon'

/** The default mark on the chosen row, for the same reason the chevron ships. */
export function CheckIcon({
  size = 20,
  color = 'currentColor',
}: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m20 6-11 11-5-5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

CheckIcon.displayName = 'XAUI.Select.CheckIcon'
