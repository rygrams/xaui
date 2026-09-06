import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimeline } from './timeline.context'
import type { TimelineTextProps } from './timeline.type'

/** How wide a column of times is. Enough for `09:12` and for `hier`, and no wider. */
const LEADING_WIDTH = 56

/**
 * The column before the rail — a time, a date, a step number.
 *
 * **Right-aligned and a fixed width**, which is what makes a column of times read as a
 * column: ragged times beside a straight rail look like a mistake, and letting each one be
 * as wide as its own text is exactly what makes them ragged.
 *
 * A `Text`, because that is what it almost always is. Something taller goes in a `View` you
 * write, with `Timeline.Leading`'s width and alignment on it.
 */
export const TimelineLeading = forwardRef<Text, TimelineTextProps>(
  function TimelineLeading({ children, style, ...props }, ref) {
    const { leadingStyle } = useTimeline()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        {...rest}
        style={[leadingStyle, { width: LEADING_WIDTH }, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

TimelineLeading.displayName = 'XAUI.Timeline.Leading'
