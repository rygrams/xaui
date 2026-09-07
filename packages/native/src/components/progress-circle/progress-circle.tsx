import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { progressFraction } from '../../utils/progress'
import { ProgressCircleIndicator } from './progress-circle-indicator'
import { ProgressCircleProvider } from './progress-circle.context'
import { circleGeometry } from './progress-circle.geometry'
import { progressCircleRecipe } from './progress-circle.recipe'
import type { ProgressCircleProps } from './progress-circle.type'

/**
 * How far along something is, drawn as a ring.
 *
 * ```tsx
 * <ProgressCircle value={72} />
 *
 * <ProgressCircle value={72} size="lg" variant="success">
 *   <ProgressCircle.Indicator />
 *   <ProgressCircle.Value />
 * </ProgressCircle>
 * ```
 *
 * **It is the `ProgressBar` bent into a circle** — the same five variants, the same clamped
 * fraction, the same `formatOptions` — and it is a different component rather than a
 * `shape` prop on that one because the two share no geometry at all: a bar is a `View` that
 * grows and this is an SVG path whose dash offset moves.
 *
 * **`radius` is a number here**, and it is the one place in this library where the word
 * means what it means in geometry: a circle has no corner to round. It is raw, so it lives
 * outside the style cache and wins over `size` — the ladder is the vocabulary, and a ring
 * that has to line up with something already on the screen is not a vocabulary question.
 *
 * **There is no `isIndeterminate`**, for the `ProgressBar`'s reason: an unknown duration is
 * a `Spinner`, and this one reports a quantity.
 */
export const ProgressCircleRoot = forwardRef<View, ProgressCircleProps>(
  function ProgressCircle(
    {
      children,
      variant,
      size = 'md',
      radius,
      strokeWidth,
      color,
      value = 0,
      minValue = 0,
      maxValue = 100,
      formatOptions,
      isDisabled = false,
      asChild = false,
      accessibilityRole,
      accessibilityValue,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)

    const selection = { variant, size }
    const styles = progressCircleRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    const tint = color
      ? progressCircleRecipe.tint({ theme, color, selection })
      : undefined

    const geometry = circleGeometry(size, radius, strokeWidth)
    const fraction = progressFraction(value, minValue, maxValue)

    const context = useMemo(() => {
      // The two colours ride on slots the recipe never renders: an SVG path is stroked by
      // a prop rather than by a stylesheet, so what a slot needs from here is the string.
      const track = StyleSheet.flatten<TextStyle>([styles.track, tint?.track])
      const fill = StyleSheet.flatten<TextStyle>([styles.fill, tint?.fill])

      return {
        geometry,
        trackColor: typeof track.color === 'string' ? track.color : undefined,
        fillColor: typeof fill.color === 'string' ? fill.color : undefined,
        valueStyle: styles.value,
        fraction,
        value,
        formatOptions,
        isDisabled,
      }
    }, [styles, tint, geometry, fraction, value, formatOptions, isDisabled])

    const rootStyle = [
      styles.root,
      // The raw radius, outside the cache and after it: `size` set the box from the
      // ladder, and a caller who gave a radius is saying the ladder is not the answer.
      radius !== undefined && {
        width: geometry.diameter,
        height: geometry.diameter,
      },
      styleProps,
      style,
    ]

    const rootProps = {
      // The caller's range, not the clamped fraction: "72 sur 100" is what they wrote.
      accessibilityRole: accessibilityRole ?? ('progressbar' as const),
      accessibilityValue: accessibilityValue ?? {
        min: minValue,
        max: maxValue,
        now: value,
      },
      ...rest,
    }

    return (
      <ProgressCircleProvider value={context}>
        {asChild ? (
          <Slot ref={ref} {...rootProps} style={rootStyle}>
            {children}
          </Slot>
        ) : (
          <View ref={ref} {...rootProps} style={rootStyle}>
            {/* The ring is the component. Written with no children it is the ring alone,
                which is the form a row wants; children replace that, and one of them is
                usually the ring again with a value inside it. */}
            {children ?? <ProgressCircleIndicator />}
          </View>
        )}
      </ProgressCircleProvider>
    )
  }
)

ProgressCircleRoot.displayName = 'XAUI.ProgressCircle.Root'
