import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { SliderProvider } from './slider.context'
import { sliderRecipe } from './slider.recipe'
import {
  fromFraction,
  fromValues,
  nearestThumb,
  toFraction,
  toValues,
  withThumbAt,
} from './slider.utils'
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
 * **Two callbacks, and the difference matters.** `onValueChange` fires on every step a
 * thumb crosses, including mid-drag, and is what a live preview reads. `onValueCommit`
 * fires once, when the finger lifts — it is where a network call belongs, because the
 * first one can fire fifty times in a second.
 *
 * **A pair makes it a range.** `value={[20, 60]}` is two thumbs and a fill between them,
 * and it reports a pair back; the shape the caller wrote is the shape they get. Write one
 * `<Slider.Thumb index={0} />` per end.
 *
 * **`orientation="vertical"` turns the rail on its side**, counting from the bottom — a
 * rail whose fill grew downwards would report a larger value the lower the knob sat.
 */
export const SliderRoot = forwardRef<View, SliderProps>(function Slider(
  {
    children,
    size,
    orientation = 'horizontal',
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
  const [trackLength, setTrackLength] = useState(0)

  const range = { min, max, step }

  const [raw, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  })

  // Snapped on the way out as well as on the way in: a caller can pass a `value` that is
  // not on a step, and a thumb has to sit somewhere real. One entry or two, and the shape
  // the caller wrote is the shape they get back.
  const values = toValues(raw, range)

  const selection = { size, orientation, radius }
  const styles = sliderRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? sliderRecipe.tint({ theme, color, selection }) : undefined

  const slideTo = useCallback(
    (index: number, fraction: number) => {
      const at = fromFraction(fraction, { min, max, step })
      setValue(current =>
        fromValues(
          withThumbAt(toValues(current, { min, max, step }), index, at, {
            min,
            max,
            step,
          })
        )
      )
    },
    [max, min, setValue, step]
  )

  const thumbFor = useCallback(
    (fraction: number) =>
      nearestThumb(values, fromFraction(fraction, { min, max, step })),
    [max, min, step, values]
  )

  const commit = useCallback(
    () => onValueCommit?.(fromValues(values)),
    [onValueCommit, values]
  )

  const context = useMemo(() => {
    const thumb = StyleSheet.flatten<ViewStyle>([styles.thumb])

    return {
      outputStyle: styles.output,
      trackStyle: tint ? [styles.track, tint.track] : styles.track,
      fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
      thumbStyle: tint ? [styles.thumb, tint.thumb] : styles.thumb,
      orientation,
      values,
      min,
      max,
      step,
      isDisabled,
      fractions: values.map(v => toFraction(v, { min, max, step })),
      trackLength,
      setTrackLength,
      // Read off the resolved style rather than recomputed: the knob's diameter is what
      // the rail insets its travel by, and both have to be the same number or the knob
      // overhangs the end.
      thumbSize: typeof thumb.width === 'number' ? thumb.width : 0,
      slideTo,
      thumbFor,
      commit,
    }
  }, [
    styles,
    tint,
    values,
    min,
    max,
    step,
    isDisabled,
    orientation,
    trackLength,
    slideTo,
    thumbFor,
    commit,
  ])

  return (
    <SliderProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </View>
    </SliderProvider>
  )
})

SliderRoot.displayName = 'XAUI.Slider.Root'
