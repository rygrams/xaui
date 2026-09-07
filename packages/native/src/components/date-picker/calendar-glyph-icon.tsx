import { Path, Rect, Svg } from 'react-native-svg'
import type { IconComponentProps } from '../../system/icon'

/**
 * The calendar mark on the trigger — the affordance a date field carries in every design
 * that is not a bare `<select>`: legacy drew it, Material draws it, and a user who has seen
 * one date field knows the glyph means "this opens a month".
 *
 * It lives in `date-picker/` rather than `system/` because this is the only component that
 * draws it — §2 bis, promotion at the second use and not before. It takes the icon shape
 * `ChevronDownIcon` takes, so `Icon` sizes and colours it the same way.
 */
export function CalendarGlyphIcon({
  size = 20,
  color = 'currentColor',
}: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={4}
        width={18}
        height={18}
        rx={2}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M8 2v4M16 2v4M3 10h18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

CalendarGlyphIcon.displayName = 'XAUI.DatePicker.CalendarGlyphIcon'
