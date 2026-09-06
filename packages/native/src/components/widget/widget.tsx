import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { WidgetProvider } from './widget.context'
import { widgetRecipe } from './widget.recipe'
import type { WidgetProps } from './widget.type'

/**
 * A thing on a dashboard: a title, something in a well, and a line about it underneath.
 *
 * ```tsx
 * <Widget>
 *   <Widget.Header>
 *     <Widget.Heading>
 *       <Widget.Title>Tokens Over Time</Widget.Title>
 *     </Widget.Heading>
 *     <Chart.Legend labels={['Input', 'Output']} />
 *   </Widget.Header>
 *
 *   <Widget.Content>
 *     <LineChart data={rows} xKey="day" yKeys={['input', 'output']} />
 *   </Widget.Content>
 *
 *   <Widget.Footer>Mis à jour il y a 2 minutes · 30 jours</Widget.Footer>
 * </Widget>
 * ```
 *
 * **It is a `Card` with a well cut into it**, and the well is the whole difference. A card
 * puts its content flush on its own ground; a widget recesses it one level, so what is
 * inside reads as a panel the card is holding rather than as part of the card. That is what
 * a figure, a table or a list needs when the card around it also carries a title and a
 * timestamp that are *not* part of the thing being shown.
 *
 * **The well's corner is derived, not chosen.** An inner radius is the outer one less the
 * gap between them — here the card's own padding — or the two arcs run at different rates
 * and the inset reads as a sticker rather than as a well.
 *
 * **It is elevated by default**, unlike the `Surface`: a widget is one of several on a
 * dashboard, and the shadow is what separates it from the next. The `Surface`'s argument
 * against a shadow — that it reads as dirt under a ground barely different from the page —
 * applies to its `tertiary`, and that variant is the one to turn it off on.
 *
 * The content is **anything**: `Widget.Content` is a well, not a chart slot.
 */
export const WidgetRoot = forwardRef<View, WidgetProps>(function Widget(
  {
    children,
    variant,
    size,
    radius,
    isElevated = true,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const styles = widgetRecipe.resolve({
    theme,
    selection: {
      variant,
      size,
      radius,
      elevated: isElevated ? ('true' as const) : undefined,
    },
  })

  const context = useMemo(
    () => ({
      headerStyle: styles.header,
      headingStyle: styles.heading,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      contentStyle: styles.content,
      footerStyle: styles.footer,
    }),
    [styles]
  )

  const rootStyle = [styles.root, styleProps, style]

  return (
    <WidgetProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {children}
        </View>
      )}
    </WidgetProvider>
  )
})

WidgetRoot.displayName = 'XAUI.Widget.Root'
