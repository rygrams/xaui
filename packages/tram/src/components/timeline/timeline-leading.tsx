import { forwardRef, useLayoutEffect } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineLeadingProps } from './timeline.type'

/**
 * The tile that opens an entry: a flat square painted by its status, the large line Light
 * and the `caption` under it, set at the foot as a tile's name is.
 *
 * Native's `Leading` is the time beside the rail; here it is the entry's mark, and its
 * text — `09:12`, `16` — is the tile's large line. `caption` is Tram's, for the month or
 * the minutes under it.
 */
export const TimelineLeading = forwardRef<View, TimelineLeadingProps>(
  function TimelineLeading({ children, caption, style, ...props }, ref) {
    const { leadingStyle, leadingLabelStyle, leadingCaptionStyle, paints } =
      useTimeline()
    const { status, registerLeading } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    useLayoutEffect(registerLeading, [registerLeading])

    const { fill, ink } = paints[status]

    return (
      <View
        ref={ref}
        {...rest}
        style={[leadingStyle, { backgroundColor: fill }, styleProps, style]}
      >
        <Text numberOfLines={1} style={[leadingLabelStyle, { color: ink }]}>
          {children}
        </Text>
        {caption === undefined ? null : (
          <Text numberOfLines={1} style={[leadingCaptionStyle, { color: ink }]}>
            {caption}
          </Text>
        )}
      </View>
    )
  }
)

TimelineLeading.displayName = 'XAUI.Tram.Timeline.Leading'
