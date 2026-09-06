import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useSlidingIndicator } from '../../hooks/use-sliding-indicator'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { SegmentProvider } from './segment.context'
import { segmentRecipe } from './segment.recipe'
import type { SegmentProps, SegmentRect } from './segment.type'

/**
 * A filter: one of a few options, chosen in place.
 *
 * ```tsx
 * <Segment value={view} onValueChange={setView}>
 *   <Segment.Item value="dashboard">Dashboard</Segment.Item>
 *   <Segment.Item value="analytics">Analytics</Segment.Item>
 * </Segment>
 * ```
 *
 * **It is not `Tabs`.** They wear the same clothes — a pill sliding under the chosen option
 * inside a filled track, on the theme's own `segment` tokens — and they do different jobs.
 * A tab bar **wraps content**: its triggers name panels that live under it, and it says
 * `tablist` / `tab` out loud. A segment names nothing; it holds a value, the way a radio
 * group does, and it says `radiogroup` / `radio`. Reach for tabs when the options are
 * places to go and for a segment when they are a value something else reads.
 *
 * **The pill is not a slot.** `Tabs` makes you write its indicator because a tab bar can be
 * `light` and have none; a segment without its pill is not a segment, so the root draws it.
 * A `color` is how you move it.
 */
export const SegmentRoot = forwardRef<View, SegmentProps>(function Segment(
  {
    children,
    size,
    radius,
    color,
    value: controlledValue,
    defaultValue,
    onValueChange,
    hasSeparator = false,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const [rects, setRects] = useState<Readonly<Record<string, SegmentRect>>>({})

  const [value, setValue] = useControllableState<string | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  const selection = { size, radius }
  const styles = segmentRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? segmentRecipe.tint({ theme, color, selection }) : undefined

  const select = useCallback((next: string) => setValue(next), [setValue])

  const setRect = useCallback((option: string, rect: SegmentRect) => {
    setRects(current => {
      const previous = current[option]
      if (previous && previous.x === rect.x && previous.width === rect.width)
        return current
      return { ...current, [option]: rect }
    })
  }, [])

  const context = useMemo(() => {
    // The chosen option's colour rides on the `labelSelected` slot, which is where `paint`
    // puts `fgSelected` so the tint reaches the word on the pill as well as the pill.
    const selected = StyleSheet.flatten<TextStyle>([
      styles.labelSelected,
      tint?.labelSelected,
    ])

    return {
      itemStyle: styles.item,
      separatorStyle: styles.separator,
      labelStyle: styles.label,
      labelSelectedStyle: { color: selected.color },
      value,
      hasSeparator,
      isDisabled,
      select,
      rects,
      setRect,
    }
  }, [styles, tint, value, hasSeparator, isDisabled, select, rects, setRect])

  const travel = useSlidingIndicator(value === undefined ? undefined : rects[value])
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  const Node = asChild ? Slot : View

  return (
    <SegmentProvider value={context}>
      <Node
        ref={ref}
        // A value held among a few, which is what a radio group is. `Tabs` says `tablist`
        // here, and the difference is the whole reason these are two components.
        accessibilityRole="radiogroup"
        {...rest}
        style={rootStyle}
      >
        <Animated.View
          style={[styles.indicator, tint?.indicator, travel]}
          pointerEvents="none"
        />
        {children}
      </Node>
    </SegmentProvider>
  )
})

SegmentRoot.displayName = 'XAUI.Segment.Root'
