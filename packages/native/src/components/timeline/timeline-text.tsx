import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimeline } from './timeline.context'
import type { TimelineContextValue, TimelineTextProps } from './timeline.type'

/**
 * The two text slots, which differ only in which resolved style they read.
 *
 * Written once and named twice rather than copied: two copies of a four-line merge is two
 * places for the order to drift.
 */
function textSlot(key: 'titleStyle' | 'descriptionStyle', name: string) {
  const Component = forwardRef<Text, TimelineTextProps>(function TimelineText(
    { children, style, ...props },
    ref
  ) {
    const context: TimelineContextValue = useTimeline()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[context[key], styleProps, style]}>
        {children}
      </Text>
    )
  })

  Component.displayName = name
  return Component
}

/** What happened. Its first line is what a `start` marker lines up with. */
export const TimelineTitle = textSlot('titleStyle', 'XAUI.Timeline.Title')

/** The detail under it, quieter. */
export const TimelineDescription = textSlot(
  'descriptionStyle',
  'XAUI.Timeline.Description'
)
