import { Children, forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint } from '../../system/flat-paint'
import { TimelinePositionProvider, TimelineProvider } from './timeline.context'
import { DEFAULT_SIZE, TIMELINE_SIZES, timelineRecipe } from './timeline.recipe'
import type { TimelineProps } from './timeline.type'
import { tilePaints } from './timeline.utils'

/**
 * What happened, in order — the Native `Timeline`'s API, drawn as the Windows Phone
 * timeline: a tile of the date opening each entry and a line from one tile to the next.
 *
 * ```tsx
 * <Timeline>
 *   <Timeline.Item status="success">
 *     <Timeline.Leading caption="nov">16</Timeline.Leading>
 *     <Timeline.Rail />
 *     <Timeline.Content>
 *       <Timeline.Title>demande reçue</Timeline.Title>
 *       <Timeline.Description>chambre verte, quatre nuits</Timeline.Description>
 *     </Timeline.Content>
 *   </Timeline.Item>
 * </Timeline>
 * ```
 *
 * The six tile paints are decided once here; an entry picks one by its `status`. The root
 * counts its children so the line stops at the last tile.
 */
export const TimelineRoot = forwardRef<View, TimelineProps>(function Timeline(
  {
    children,
    size = DEFAULT_SIZE,
    density = 'comfortable',
    accent,
    color,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const styles = timelineRecipe.resolve({ theme, selection: { size, density } })
  // A tile is a fill, so a named accent is its true colour.
  const fill = flatPaint({ accent, color })

  const context = useMemo(
    () => ({
      itemStyle: styles.item,
      leadingStyle: styles.leading,
      leadingLabelStyle: styles.leadingLabel,
      leadingCaptionStyle: styles.leadingCaption,
      railStyle: styles.rail,
      markerStyle: styles.marker,
      connectorStyle: styles.connector,
      contentStyle: styles.content,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      paints: tilePaints({ ...theme.colors, accent: fill ?? theme.colors.accent }),
      tile: TIMELINE_SIZES[size].tile,
    }),
    [styles, theme, fill, size]
  )

  const count = Children.count(children)

  return (
    <TimelineProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {Children.map(children, (child, index) => (
          <TimelinePositionProvider
            value={{ isFirst: index === 0, isLast: index === count - 1 }}
          >
            {child}
          </TimelinePositionProvider>
        ))}
      </View>
    </TimelineProvider>
  )
})

TimelineRoot.displayName = 'XAUI.Tram.Timeline.Root'
