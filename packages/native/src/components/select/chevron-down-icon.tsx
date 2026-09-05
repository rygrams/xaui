import { Path, Svg } from 'react-native-svg'
import type { IconComponentProps } from '../../system/icon'

/**
 * The default chevron. Shipped rather than required from the caller, because a select
 * with no affordance is a field that looks broken — and requiring an icon package for the
 * one glyph the component cannot do without is a peer dependency for a chevron.
 */
export function ChevronDownIcon({
  size = 20,
  color = 'currentColor',
}: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m6 9 6 6 6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

ChevronDownIcon.displayName = 'XAUI.Select.ChevronDownIcon'
