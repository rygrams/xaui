import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { SliderProvider } from './slider.context'
import { sliderRecipe } from './slider.recipe'
import { fromFraction, snap, toFraction } from './slider.utils'
import type { SliderProps } from './slider.type'

/**
 * A value chosen along a line.
 *
 * ```tsx
 * <Slider defaultValue={40} onValueCommit={save}>
 *   <Slider.Output />
 *   <Slider.Track>
 *     <Slider.Fill />
 *     <Slider.Thumb />
 *   </Slider.Track>
 * </Slider>
 * ```
 *
 * **Two callbacks, and the difference matters.** `onValueChange` fires on every step the
 * thumb crosses, including mid-drag, and is what a live preview reads. `onValueCommit`
 * fires once, when the finger lifts — it is where a network call belongs, because the
 * first one can fire fifty times in a second.
 *
 * Horizontal only. A vertical slider is the same arithmetic on the other axis, but it is
 * also a different gesture and a different layout, and shipping it half-done is worse than
 * not shipping it.
 */
export const SliderRoot = forwardRef<View, SliderProps>(function Slider(
  {
    children,
    size,
    radius,
    color,
    value: controlledValue,
    defaultValue = 0,
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    isDisabled = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const [trackWidth, setTrackWidth] = useState(0)

  const range = { min, max, step }

  const [raw, setValue] = useControllableState<number>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  })

  // Snapped on the way out as well as on the way in: a caller can pass a `value` that is
  // not on a step, and the thumb has to sit somewhere real.
  const value = snap(raw, range)

  const selection = { size, radius }
  const styles = sliderRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? sliderRecipe.tint({ theme, color, selection }) : undefined

  const slideTo = useCallback(
    (fraction: number) => setValue(fromFraction(fraction, { min, max, step })),
    [max, min, setValue, step]
  )

  const commit = useCallback(() => onValueCommit?.(value), [onValueCommit, value])

  const context = useMemo(() => {
    const thumb = StyleSheet.flatten<ViewStyle>([styles.thumb])

    return {
      outputStyle: styles.output,
      trackStyle: tint ? [styles.track, tint.track] : styles.track,
      fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
      thumbStyle: tint ? [styles.thumb, tint.thumb] : styles.thumb,
      knobStyle: tint ? [styles.knob, tint.knob] : styles.knob,
      value,
      min,
      max,
      step,
      isDisabled,
      fraction: toFraction(value, { min, max, step }),
      trackWidth,
      setTrackWidth,
      // Read off the resolved style rather than recomputed: the thumb's width is what the
      // track insets its travel by, and both have to be the same number or the thumb
      // overhangs the end.
      thumbWidth: typeof thumb.width === 'number' ? thumb.width : 0,
      slideTo,
      commit,
    }
  }, [styles, tint, value, min, max, step, isDisabled, trackWidth, slideTo, commit])

  return (
    <SliderProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </View>
    </SliderProvider>
  )
})

SliderRoot.displayName = 'XAUI.Slider.Root'
