import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'

/** Stroke icons in the shape `Button.Icon`'s `as` form expects: `size` and `color` only. */
function strokeIcon(d: string) {
  return function StrokeIcon({ size, color }: IconComponentProps) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d={d}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
}

export const LockIcon = strokeIcon(
  'M7 11V8a5 5 0 0110 0v3M6 11h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1z'
)
export const CheckIcon = strokeIcon('M5 12.5l4.5 4.5L19 7.5')
export const CartIcon = strokeIcon(
  'M3 4h2l2.4 11.2a1 1 0 001 .8h9.2a1 1 0 001-.8L20 8H6.2M10 20h.01M17 20h.01'
)
export const HeartIcon = strokeIcon(
  'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z'
)
export const ShareIcon = strokeIcon(
  'M12 4v11M8 8l4-4 4 4M5 13v6a1 1 0 001 1h12a1 1 0 001-1v-6'
)
export const TrashIcon = strokeIcon(
  'M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3'
)
export const TagIcon = strokeIcon('M3 12V4a1 1 0 011-1h8l9 9-9 9-9-9zM8 8h.01')
