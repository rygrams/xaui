import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTimeline } from './timeline.context'
import type { TimelineTextProps } from './timeline.type'

/** The two text slots, which differ only in the style they read. */
function textSlot(key: 'titleStyle' | 'descriptionStyle', name: string) {
  const Component = forwardRef<Text, TimelineTextProps>(function TimelineText(
    { children, style, ...props },
    ref
  ) {
    const context = useTimeline()
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

/** What happened, in `subtitle`. */
export const TimelineTitle = textSlot('titleStyle', 'XAUI.Tram.Timeline.Title')

/** The detail under it, in `caption`, grey. */
export const TimelineDescription = textSlot(
  'descriptionStyle',
  'XAUI.Tram.Timeline.Description'
)
