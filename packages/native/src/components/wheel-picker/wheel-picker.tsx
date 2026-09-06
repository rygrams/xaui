import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { WheelPickerProvider } from './wheel-picker.context'
import { wheelGeometry } from './wheel-picker.geometry'
import { wheelPickerRecipe } from './wheel-picker.recipe'
import type { WheelPickerProps } from './wheel-picker.type'

/**
 * A column of options you turn, and the one at the middle is the answer.
 *
 * ```tsx
 * <WheelPicker>
 *   <WheelPicker.Column value={hour} onValueChange={setHour}>
 *     {HOURS.map(h => (
 *       <WheelPicker.Item key={h} value={h}>{h}</WheelPicker.Item>
 *     ))}
 *   </WheelPicker.Column>
 *   <WheelPicker.Column value={minute} onValueChange={setMinute}>…</WheelPicker.Column>
 * </WheelPicker>
 * ```
 *
 * **The root is the wheel, and a column is one of its columns.** A time is two columns and
 * a date is three, so the thing that has a value is the column rather than the wheel — the
 * `WheelDatePicker`, `WheelTimePicker` and `WheelDateTimePicker` of P5.25 are all this
 * component with a different set of columns and the arithmetic to fill them.
 *
 * **The band is the root's**, one shape laid across every column rather than one per
 * column: two columns at different widths would otherwise show the seam between their two
 * bands. It is `pointerEvents: 'none'`, so it marks the middle without taking the touch
 * that turns the wheel under it.
 *
 * **A column reports at rest, never while turning.** One flick passes nine rows, and every
 * one of them is a value some caller would have written to a form.
 */
export const WheelPickerRoot = forwardRef<View, WheelPickerProps>(
  function WheelPicker(
    {
      children,
      variant,
      size = 'md',
      radius,
      color,
      visibleCount,
      isDisabled = false,
      asChild = false,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)

    const selection = { variant, size, radius }
    const styles = wheelPickerRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    const tint = color
      ? wheelPickerRecipe.tint({ theme, color, selection })
      : undefined

    const geometry = wheelGeometry(size, visibleCount)

    const context = useMemo(
      () => ({
        bandStyle: tint ? [styles.band, tint.band] : styles.band,
        columnStyle: styles.column,
        itemStyle: styles.item,
        itemSelectedStyle: tint
          ? [styles.itemSelected, tint.itemSelected]
          : styles.itemSelected,
        geometry,
        isDisabled,
      }),
      [styles, tint, geometry, isDisabled]
    )

    // The height is `visibleCount` rows and nothing else, and `visibleCount` is a raw
    // number — so it is applied here, after the cached recipe, exactly as the
    // `ProgressCircle`'s radius is.
    const rootStyle = [styles.root, { height: geometry.height }, styleProps, style]

    return (
      <WheelPickerProvider value={context}>
        {asChild ? (
          <Slot ref={ref} {...rest} style={rootStyle}>
            {children}
          </Slot>
        ) : (
          <View ref={ref} {...rest} style={rootStyle}>
            {/* Behind the columns, and written by the root rather than by the caller: it
                is not a choice, it is where the middle is. */}
            <View style={context.bandStyle} />
            {children}
          </View>
        )}
      </WheelPickerProvider>
    )
  }
)

WheelPickerRoot.displayName = 'XAUI.WheelPicker.Root'
