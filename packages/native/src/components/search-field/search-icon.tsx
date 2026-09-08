import { Circle, Path, Svg } from 'react-native-svg'
import type { IconComponentProps } from '../../system/icon'

/**
 * The magnifier the library ships, rather than requiring one from the caller: a field
 * whose whole affordance is "type what you are looking for" is not a search field without
 * it, and asking for an icon package to draw one glass is a peer dependency for a circle.
 *
 * It stays in this folder rather than moving to `system/`: one component draws it. §2 bis
 * — promotion at the second use, never by anticipation. `SearchField.Icon` takes an `as`
 * for the project that has its own set.
 */
export function SearchIcon({
  size = 20,
  color = 'currentColor',
}: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <Path
        d="m20 20-3.5-3.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

SearchIcon.displayName = 'XAUI.SearchIcon'
