import { Path, Svg } from 'react-native-svg'
import type { IconComponentProps } from './icon.type'

/**
 * The chevron the library ships, rather than requiring one from the caller: a control
 * whose whole affordance is "there is more under here" cannot be written without it, and
 * asking for an icon package to draw one arrow is a peer dependency for a chevron.
 *
 * It sits in `system/` because two components draw it — `Select` turns it half a turn
 * when its list opens, `Accordion` when its panel does. §2 bis: promotion at the second
 * use, never by anticipation.
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

ChevronDownIcon.displayName = 'XAUI.ChevronDownIcon'
