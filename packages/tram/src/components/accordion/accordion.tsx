import { forwardRef, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { accentInk } from '../../theme/accent-ink'
import { tramAccents } from '../../theme/tram-tokens'
import { AccordionProvider } from './accordion.context'
import { useAccordionMotion, useExpansion } from './accordion.hook'
import { DEFAULT_SIZE, DEFAULT_VARIANT, accordionRecipe } from './accordion.recipe'
import type { AccordionProps } from './accordion.type'

/**
 * Rows that open, on the page by default — a title on the Tram scale and a plus at the
 * end, drawn from two bars, that lies down into a minus as the panel unrolls. No line
 * anywhere: the rows are told apart by their space, as in a Metro list.
 *
 * ```tsx
 * <Accordion defaultValue="corbeille">
 *   <Accordion.Item value="corbeille">
 *     <Accordion.Trigger>
 *       Où vont les fichiers supprimés ?
 *       <Accordion.Indicator />
 *     </Accordion.Trigger>
 *     <Accordion.Content>
 *       <Text>Dans la corbeille, pendant 30 jours.</Text>
 *     </Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 *
 * An open row's title is written in the accent, as ink. `hasSeparator` and `tertiary`
 * are Native's, kept so the import is the whole migration, and draw nothing of their own.
 */
export const AccordionRoot = forwardRef<View, AccordionProps>(function Accordion(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    selectionMode = 'single',
    value,
    defaultValue,
    onValueChange,
    isDisabled = false,
    isCollapsible = true,
    // Native's; Tram draws no line between rows, so it is read and set aside.
    hasSeparator: _hasSeparator,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const motion = useAccordionMotion()

  const { isExpanded, toggle } = useExpansion({
    value,
    defaultValue,
    onValueChange,
    selectionMode,
    isCollapsible,
  })

  const selection = { variant, size, radius }
  const styles = accordionRecipe.resolve({ theme, selection })
  // A row owns its disabled state, which the root cannot see: both faces are resolved
  // here, and the trigger picks.
  const faded = accordionRecipe.resolve({
    theme,
    selection,
    states: { disabled: true },
  })

  const hue = color ?? (accent ? tramAccents[accent] : undefined)
  const isSlice = variant === 'secondary'
  // Only `secondary` is filled with the accent; the other grounds keep their own colours
  // and the accent is the open title alone. A named one is painted as the `Button`
  // paints its flat; a raw `color` is the caller's word, never corrected.
  const named =
    isSlice && hue && !color
      ? accentPaintFor(hue, 'flat', theme.colors.background)
      : undefined
  const sliceTint = isSlice ? (color ?? named?.tint) : undefined
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = sliceTint
    ? accordionRecipe.tint({ theme, color: sliceTint, selection })
    : undefined

  const ground =
    variant === 'primary' ? theme.colors.surface : theme.colors.background

  const context = useMemo(() => {
    const trigger = StyleSheet.flatten<TextStyle>([
      styles.trigger,
      tint?.trigger,
      named?.label ? { color: named.label } : undefined,
    ])
    const label: TextStyle = {
      color: trigger.color,
      fontFamily: trigger.fontFamily,
      fontWeight: trigger.fontWeight,
      fontSize: trigger.fontSize,
    }
    // On the accent's own slice the title is already in it; elsewhere, the accent as ink
    // on the row's ground — or the theme's `link`, which is the theme accent's.
    const openInk = isSlice
      ? label.color
      : (color ?? (hue ? accentInk(hue, ground) : theme.colors.link))
    const bar = StyleSheet.flatten([
      styles.indicatorBar,
      tint?.indicatorBar,
      named?.label ? { backgroundColor: named.label } : undefined,
    ])

    return {
      separatorStyle: styles.separator,
      itemStyle: styles.item,
      triggerStyle: [styles.trigger, tint?.trigger],
      triggerDisabledStyle: faded.trigger,
      indicatorStyle: styles.indicator,
      indicatorBarStyle: bar,
      contentStyle: styles.content,
      labelStyle: label,
      labelOpenStyle: { ...label, color: openInk },
      glyph: {
        size: typeof bar.width === 'number' ? bar.width : undefined,
        color:
          typeof bar.backgroundColor === 'string' ? bar.backgroundColor : undefined,
      },
      motion,
      isDisabled,
      isExpanded,
      toggle,
    }
  }, [
    styles,
    faded,
    tint,
    named,
    isSlice,
    color,
    hue,
    ground,
    theme,
    motion,
    isDisabled,
    isExpanded,
    toggle,
  ])

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  return (
    <AccordionProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        // The transition is on both layers as well as on every row: without it on the
        // outer one the accordion jumps to its new height while its rows still move.
        <Animated.View ref={ref} layout={motion.layout} {...rest} style={rootStyle}>
          <Animated.View layout={motion.layout} style={styles.container}>
            {children}
          </Animated.View>
        </Animated.View>
      )}
    </AccordionProvider>
  )
})

AccordionRoot.displayName = 'XAUI.Tram.Accordion.Root'
