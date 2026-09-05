import { Children, forwardRef, Fragment, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { LAYOUT } from './accordion.animation'
import { AccordionProvider } from './accordion.context'
import { useExpansion } from './accordion.hook'
import { accordionRecipe } from './accordion.recipe'
import type { AccordionProps } from './accordion.type'

/**
 * A list of rows that open.
 *
 * ```tsx
 * <Accordion defaultValue="shipping">
 *   <Accordion.Item value="shipping">
 *     <Accordion.Trigger>
 *       Livraison
 *       <Accordion.Indicator />
 *     </Accordion.Trigger>
 *     <Accordion.Content>
 *       <Text>Sous trois jours ouvrés.</Text>
 *     </Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 *
 * The separators are the root's, drawn between the children rather than by them. A row
 * that drew its own would draw one under the last item too, and every accordion would
 * start by hiding it.
 */
export const AccordionRoot = forwardRef<View, AccordionProps>(function Accordion(
  {
    children,
    variant,
    size,
    radius,
    color,
    selectionMode = 'single',
    value,
    defaultValue,
    onValueChange,
    isDisabled = false,
    isCollapsible = true,
    hasSeparator = true,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const { isExpanded, toggle } = useExpansion({
    value,
    defaultValue,
    onValueChange,
    selectionMode,
    isCollapsible,
  })

  const selection = { variant, size, radius }
  const styles = accordionRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  // A row owns its own press state, which the root cannot see — so the root resolves both
  // faces and the trigger picks. R5 stays intact: no slot touches the recipe.
  const pressed = accordionRecipe.resolve({
    theme,
    selection,
    states: { pressed: true },
  })
  const tint = color ? accordionRecipe.tint({ theme, color, selection }) : undefined

  const context = useMemo(() => {
    const trigger = StyleSheet.flatten<TextStyle>([styles.trigger, tint?.trigger])
    const indicator = StyleSheet.flatten<TextStyle>([
      styles.indicator,
      tint?.indicator,
    ])

    return {
      separatorStyle: styles.separator,
      itemStyle: styles.item,
      triggerStyle: tint ? [styles.trigger, tint.trigger] : styles.trigger,
      triggerPressedStyle: pressed.trigger,
      indicatorStyle: styles.indicator,
      contentStyle: styles.content,
      // The trigger is a row of views, so a stringifiable child is wrapped in a `Text` of
      // its own — and that text takes the type the recipe put on the row.
      labelStyle: {
        color: trigger.color,
        fontFamily: trigger.fontFamily,
        fontWeight: trigger.fontWeight,
        fontSize: trigger.fontSize,
        lineHeight: trigger.lineHeight,
      },
      glyph: {
        size: indicator.fontSize,
        color: typeof indicator.color === 'string' ? indicator.color : undefined,
      },
      isDisabled,
      isExpanded,
      toggle,
    }
  }, [styles, pressed, tint, isDisabled, isExpanded, toggle])

  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // `Children.toArray` rather than `Children.map`: it drops nulls, so a conditionally
  // rendered row cannot leave a hairline hanging where nothing is.
  const items = Children.toArray(children)

  const rows = items.map((child, index) => (
    <Fragment key={index}>
      {child}
      {hasSeparator && index < items.length - 1 ? (
        <Animated.View layout={LAYOUT} style={styles.separator} />
      ) : null}
    </Fragment>
  ))

  return (
    <AccordionProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        // Two layers, and the only place in the library where a root has one inside it.
        // A single layer cannot both cast a shadow and clip its children on iOS, and this
        // component needs both: `primary` is lifted, and a pressed row has to be cut
        // against the card's rounded corner rather than painting over it.
        //
        // The layout transition is on each of them as well as on every row. Without it on
        // the outer one the accordion's own height jumps to its new total in one frame
        // while the rows inside it are still animating.
        <Animated.View ref={ref} layout={LAYOUT} {...rest} style={rootStyle}>
          <Animated.View layout={LAYOUT} style={styles.container}>
            {rows}
          </Animated.View>
        </Animated.View>
      )}
    </AccordionProvider>
  )
})

AccordionRoot.displayName = 'XAUI.Accordion.Root'
