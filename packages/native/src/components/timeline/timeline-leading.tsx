import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { TextStyle } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineAlign, TimelineTextProps } from './timeline.type'

/** How wide a column of times is. Enough for `09:12` and for `hier`, and no wider. */
const LEADING_WIDTH = 56

/**
 * The column before the rail — a time, a date, a step number.
 *
 * **Right-aligned, a fixed width, and tabular figures**, which together are what make a
 * column of times read as a column: letting each time be as wide as its own text is what
 * makes them ragged, and proportional digits leave `11:06` narrower than `10:43` even after
 * that.
 *
 * **It also sits on the line the marker sits on**, which is the middle of the title's first
 * line rather than the top of the row. A time is set smaller than the title it labels, so a
 * cell that simply starts at the top of the row puts the time above both the dot and the
 * words — and three things at three heights is what a reader sees as "nothing lines up".
 *
 * A `Text`, because that is what it almost always is. Something taller goes in a `View` you
 * write, with `Timeline.Leading`'s width and alignment on it.
 */
export const TimelineLeading = forwardRef<Text, TimelineTextProps>(
  function TimelineLeading({ children, style, ...props }, ref) {
    const { leadingStyle, rail } = useTimeline()
    const { align } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        {...rest}
        style={[leadingStyle, onTheLine(align, rail.leadInset), styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

/**
 * Where the time sits in its row: level with the marker on a `start` entry, centred against
 * the whole entry on a `center` one — the same two answers the rail's upper half gives.
 *
 * `alignSelf` is what makes the centred case work: a cell in a row stretches by default, and
 * a stretched `Text` draws its line at the top no matter how tall the row got.
 */
function onTheLine(align: TimelineAlign, leadInset: number): TextStyle {
  return align === 'center'
    ? { width: LEADING_WIDTH, alignSelf: 'center' }
    : { width: LEADING_WIDTH, paddingTop: leadInset }
}

TimelineLeading.displayName = 'XAUI.Timeline.Leading'
