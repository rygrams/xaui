import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import type { XAUITheme } from '@xaui/native/theme'
import { colorOf } from '../../system/style-values'
import { WheelPickerProvider } from './wheel-picker.context'
import { useWheelRest } from './wheel-picker.hook'
import { wheelTintFor } from './wheel-picker.paint'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  wheelGeometry,
  wheelPickerRecipe,
} from './wheel-picker.recipe'
import type { WheelPaint, WheelPickerProps } from './wheel-picker.type'

type Styles = ReturnType<typeof wheelPickerRecipe.resolve>

/**
 * A column of squares you turn, and the one at the middle is the answer — the Native
 * `WheelPicker`'s API, drawn as the Metro date picker's wheels.
 *
 * ```tsx
 * <WheelPicker>
 *   <WheelPicker.Column value={hour} onValueChange={setHour} isLooping>
 *     {HOURS.map(h => (
 *       <WheelPicker.Item key={h} value={h}>{h}</WheelPicker.Item>
 *     ))}
 *   </WheelPicker.Column>
 *   <WheelPicker.Column value={minute} onValueChange={setMinute}>…</WheelPicker.Column>
 * </WheelPicker>
 * ```
 *
 * **The root is the wheel, and a column is one of its columns.** A time is two columns
 * and a date is three, so the thing that has a value is the column.
 *
 * **There is no band.** The current square is a flat fill of the accent, its text in the
 * colour that reads on it; the others are the ground inside a grey line. A square takes
 * the fill as it nears the middle, with no threshold.
 *
 * **`variant="light"` draws no square at all.** No fill and no line, on the current one
 * or on its neighbours: a wheel of text, the current one in the accent read as ink.
 *
 * **At rest only the current squares are left.** The neighbours come back at the first
 * touch, on any column, and fade again once the wheel has been left alone. `isAwake`
 * keeps them.
 */
export const WheelPickerRoot = forwardRef<View, WheelPickerProps>(
  function WheelPicker(
    {
      children,
      variant = DEFAULT_VARIANT,
      size = DEFAULT_SIZE,
      accent,
      color,
      visibleCount,
      isDisabled = false,
      isAwake = false,
      asChild = false,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const isStill = useAnimationDisabled()
    const { stirredBy, setBusy } = useWheelRest()

    const selection = { variant, size }
    const styles = wheelPickerRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    // Cached like the other: it is what a column disabled on its own is painted in.
    const greyed = wheelPickerRecipe.resolve({
      theme,
      selection,
      states: { disabled: true },
    })
    // Uncached: a raw tint must stay out of the cache key. Dropped when disabled — the
    // tint would repaint the grey.
    const tinted = isDisabled
      ? undefined
      : wheelTintFor({ accent, color }, variant, theme.colors.background)
    const tint = tinted
      ? wheelPickerRecipe.tint({ theme, color: tinted, selection })
      : undefined

    const geometry = useMemo(
      () => wheelGeometry(size, visibleCount),
      [size, visibleCount]
    )

    const context = useMemo(
      () => ({
        columnStyle: [styles.column, { height: geometry.height }],
        // Centred by hand: the column is a fixed height, and a square's own place in it
        // is a transform.
        cellStyle: [styles.cell, { top: (geometry.height - geometry.side) / 2 }],
        itemStyle: styles.item,
        fillStyle: styles.fill,
        labelStyle: styles.label,
        paint: paintOf(tint ? { ...styles, ...tint } : styles, theme),
        disabledPaint: paintOf(greyed, theme),
        geometry,
        isDisabled,
        isAwake,
        isStill,
        stirredBy,
        setBusy,
      }),
      [
        styles,
        greyed,
        tint,
        theme,
        geometry,
        isDisabled,
        isAwake,
        isStill,
        stirredBy,
        setBusy,
      ]
    )

    // Under `asChild` the caller's element is the wheel: `Slot` merges these into it.
    const Root = asChild ? Slot : View

    return (
      <WheelPickerProvider value={context}>
        {/* Most general to most specific: the cached recipe, the style props, `style`. */}
        <Root ref={ref} {...rest} style={[styles.root, styleProps, style]}>
          {children}
        </Root>
      </WheelPickerProvider>
    )
  }
)

WheelPickerRoot.displayName = 'XAUI.Tram.WheelPicker.Root'

/** The five colours a square is mixed between, read off the resolved slots. */
function paintOf(styles: Styles, theme: XAUITheme): WheelPaint {
  const current = StyleSheet.flatten<TextStyle>(styles.current)
  const currentLabel = StyleSheet.flatten<TextStyle>(styles.currentLabel)
  const neighbour = StyleSheet.flatten<TextStyle>(styles.fill)
  const label = StyleSheet.flatten<TextStyle>(styles.label)

  return {
    fill: colorOf(current, 'borderColor') ?? theme.colors.accent,
    ink: colorOf(currentLabel, 'color') ?? theme.colors.accentForeground,
    ground: colorOf(neighbour, 'backgroundColor') ?? theme.colors.background,
    line: colorOf(neighbour, 'borderColor') ?? theme.colors.muted,
    text: colorOf(label, 'color') ?? theme.colors.muted,
  }
}
