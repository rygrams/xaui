import { Children, forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TimelineProvider } from './timeline.context'
import { TimelinePositionProvider } from './timeline-position'
import { timelineRail, timelineRecipe } from './timeline.recipe'
import type { TimelineProps, TimelineStatus } from './timeline.type'

const STATUSES: TimelineStatus[] = [
  'default',
  'muted',
  'current',
  'success',
  'warning',
  'danger',
]

/**
 * What happened, in order, with a line through it.
 *
 * ```tsx
 * <Timeline>
 *   <Timeline.Item status="success">
 *     <Timeline.Leading>09:12</Timeline.Leading>
 *     <Timeline.Rail />
 *     <Timeline.Content>
 *       <Timeline.Title>Commande passée</Timeline.Title>
 *       <Timeline.Description>Paiement accepté.</Timeline.Description>
 *     </Timeline.Content>
 *   </Timeline.Item>
 * </Timeline>
 * ```
 *
 * **The air between two entries is inside the one above them.** There is no `gap` on the
 * root, and there cannot be: the rail runs the full height of its entry, so a gap would be a
 * break in the line. `density` is the entry's own bottom padding, and the connector fills it.
 *
 * **Six markers, resolved once here.** An entry picks one by its `status` rather than
 * resolving its own recipe (R5) — six resolutions on the root are six cache hits, and one per
 * entry on a fifty-entry list is not.
 *
 * **`status` is not `variant`.** A variant says how loud something is; these say what
 * happened, which is why a timeline is the one place in the library where a per-item prop
 * names an intent. `current` is the odd one: it is drawn as a **ring** rather than a disc, so
 * "being done" tells itself apart from "done" without relying on a hue.
 *
 * The root counts its children so the two end segments of the rail can be left off — a line
 * running off the top of a list is a list that has been cut.
 */
export const TimelineRoot = forwardRef<View, TimelineProps>(function Timeline(
  {
    children,
    size = 'md',
    density = 'comfortable',
    itemAlign = 'start',
    color,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const shared = { size, density }
  const styles = timelineRecipe.resolve({ theme, selection: shared })

  // Six resolutions rather than one per entry: the marker's colour is the only thing a
  // status changes, and resolving them here is what keeps a fifty-entry list at six cache
  // hits.
  //
  // The tint is applied to **two of the six by name**, and that has to be explicit: a token
  // named `success` is a bare name, so `resolveTint` maps it to the tint like any other and
  // a blue app would turn its green "succeeded" marker blue. Naming the two the tint may
  // reach is the only way to say that a timeline's greens and reds mean what happened.
  const markerStyles = useMemo(() => {
    const entries = STATUSES.map(status => {
      const selection = { ...shared, variant: status }
      const resolved = timelineRecipe.resolve({ theme, selection })
      const isTintable = status === 'default' || status === 'current'
      const tinted =
        color && isTintable
          ? timelineRecipe.tint({ theme, color, selection })
          : undefined

      const slot = status === 'current' ? 'markerRing' : 'marker'

      const style: StyleProp<ViewStyle> = [resolved[slot], tinted?.[slot]]

      return [status, style] as const
    })

    return Object.fromEntries(entries) as Record<
      TimelineStatus,
      StyleProp<ViewStyle>
    >
    // The recipe is cached on its tokens, so this list is rebuilt only when one of them moves.
  }, [theme, size, density, color])

  const context = useMemo(() => {
    const rail = timelineRail(size)
    const ink = StyleSheet.flatten<TextStyle>([styles.description])

    return {
      itemStyle: styles.item,
      leadingStyle: styles.leading,
      railStyle: styles.rail,
      connectorStyle: styles.connector,
      contentStyle: styles.content,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      markerStyles,
      rail: { width: rail.width, marker: rail.marker, inset: rail.inset },
      align: itemAlign,
      icon: {
        size: rail.glyph,
        color: typeof ink.color === 'string' ? ink.color : undefined,
      },
    }
  }, [styles, markerStyles, size, itemAlign])

  const count = Children.count(children)
  const rootStyle = [styles.root, styleProps, style]

  // A provider around each entry rather than a clone of it: the position is state the entry
  // needs and not a prop it declares, and cloning would put this component's hand inside a
  // child it does not own (R1).
  const positioned = Children.map(children, (child, index) => (
    <TimelinePositionProvider
      value={{ isFirst: index === 0, isLast: index === count - 1 }}
    >
      {child}
    </TimelinePositionProvider>
  ))

  return (
    <TimelineProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {positioned}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {positioned}
        </View>
      )}
    </TimelineProvider>
  )
})

TimelineRoot.displayName = 'XAUI.Timeline.Root'
