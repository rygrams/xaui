import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import { Slot, useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramMotion } from '../../motion/use-tram-motion'
import { flatPaint } from '../../system/flat-paint'
import { touchReach } from '../../system/touch-reach'
import {
  fromStops,
  placeOf,
  sameStops,
  toStops,
  withStopAt,
} from '../../system/value-scale'
import { useTramHaptic } from '../../theme/tram-haptics'
import { SliderProvider } from './slider.context'
import { DEFAULT_SIZE, SLIDER_GEOMETRY, sliderRecipe } from './slider.recipe'
import type { SliderProps, SliderValue } from './slider.type'

/** No thumb is under the finger. */
const NONE = -1

/**
 * A value chosen along a line — the Native `Slider`'s API, drawn in Metro: a line of
 * the page's ink, filled with the accent up to a block thumb, the `Switch`'s.
 *
 * ```tsx
 * <Slider defaultValue={40} onValueCommit={save}>
 *   <Slider.Output />
 *   <Slider.Track>
 *     <Slider.Fill />
 *     <Slider.Thumb />
 *   </Slider.Track>
 * </Slider>
 *
 * <Slider defaultValue={[20, 60]} step={10} accent="lime">
 *   <Slider.Track>
 *     <Slider.Fill />
 *     <Slider.Thumb index={0} />
 *     <Slider.Thumb index={1} />
 *   </Slider.Track>
 * </Slider>
 * ```
 *
 * A touch on the track brings the nearest thumb there, a drag carries it. `onValueChange`
 * fires on every step crossed and `onValueCommit` once, when the finger lifts. Each step
 * is felt through `TramProvider`'s `onHaptic`, as a `selection`; a continuous slider has
 * no step to feel.
 *
 * A pair makes it a range: two thumbs that do not cross, and the fill between them.
 */
export const SliderRoot = forwardRef<View, SliderProps>(function Slider(
  {
    children,
    size = DEFAULT_SIZE,
    orientation = 'horizontal',
    radius,
    accent,
    color,
    value,
    defaultValue = 0,
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const animate = useTramMotion()
  const isStill = useAnimationDisabled()

  const [trackLength, setTrackLength] = useState(0)
  // Counts the fingers lifted. A controlled slider may refuse the change, or change while
  // a thumb is held, and the thumb then has to rejoin a value that did not move since.
  const [releases, setReleases] = useState(0)

  const scale = useMemo(() => ({ min, max, step }), [min, max, step])

  const [raw, setValue] = useControllableState<SliderValue>({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  // On a step on the way out as on the way in: a caller's `value` may be off one, and a
  // thumb has to sit somewhere real. Rebuilt only when a number moves, not on every pair
  // the caller writes inline.
  const [lowerStop, upperStop] = toStops(raw, scale)
  const values = useMemo(
    () => (upperStop === undefined ? [lowerStop!] : [lowerStop!, upperStop]),
    [lowerStop, upperStop]
  )

  // What the finger has asked for, ahead of the render that will show it: two steps
  // crossed in one frame are both counted, and the commit reads the last.
  const asked = useRef(values)
  useEffect(() => {
    asked.current = values
  })

  const lowerPlace = placeOf(values[0]!, scale)
  const upperPlace = placeOf(values[values.length - 1]!, scale)

  const lower = useSharedValue(lowerPlace)
  const lowerSquash = useSharedValue(1)
  const upper = useSharedValue(upperPlace)
  const upperSquash = useSharedValue(1)
  const held = useSharedValue(NONE)

  // The thumbs follow the state — after a touch, a controlled change, or a drag let go.
  // A spring to a target, so a second change turns the first one around mid-way. The
  // thumb under the finger is left alone: it is already where the finger is.
  useEffect(() => {
    const settle = (index: number, place: typeof lower, target: number) => {
      if (held.value === index) return
      place.value = isStill ? target : animate(target, 'thumb')
    }

    settle(0, lower, lowerPlace)
    settle(1, upper, upperPlace)
  }, [lowerPlace, upperPlace, releases, isStill, animate, lower, upper, held])

  const moveThumb = useCallback(
    (index: number, to: number) => {
      const next = withStopAt(asked.current, index, to, scale)
      if (sameStops(next, asked.current)) return

      asked.current = next
      if (scale.step > 0) haptic('selection')
      setValue(fromStops(next))
    },
    [scale, haptic, setValue]
  )

  const commit = useCallback(() => {
    onValueCommit?.(fromStops(asked.current))
  }, [onValueCommit])

  const settle = useCallback(() => setReleases(count => count + 1), [])

  const selection = { size, orientation, radius }
  const states = { disabled: isDisabled }

  const styles = sliderRecipe.resolve({ theme, selection, states })
  // The fill is flat, so a named accent is the true colour — there is no line or text in
  // the accent here to draw as ink. Uncached: a raw tint must stay out of the cache key.
  const paint = flatPaint({ accent, color })
  const tint = paint
    ? sliderRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const geometry = SLIDER_GEOMETRY[size]

  const context = useMemo(
    () => ({
      outputStyle: styles.output,
      trackStyle: styles.track,
      railStyle: styles.rail,
      fillStyle: [styles.fill, tint?.fill],
      thumbStyle: styles.thumb,
      blockStyle: styles.block,
      orientation,
      values,
      scale,
      isDisabled,
      isStill,
      trackLength,
      setTrackLength,
      thumbLength: geometry.thumbLength,
      thumbs: [
        { place: lower, squash: lowerSquash },
        { place: upper, squash: upperSquash },
      ] as const,
      held,
      // `sm` and `md` are drawn under the 48 touch target; the gesture's slop makes it up.
      reach: touchReach(geometry.thumbBreadth),
      moveThumb,
      commit,
      settle,
    }),
    [
      styles,
      tint,
      orientation,
      values,
      scale,
      isDisabled,
      isStill,
      trackLength,
      geometry,
      lower,
      lowerSquash,
      upper,
      upperSquash,
      held,
      moveThumb,
      commit,
      settle,
    ]
  )

  // Under `asChild` the caller's element is the root: `Slot` merges these into it.
  const Root = asChild ? Slot : View

  return (
    <SliderProvider value={context}>
      {/* Most general to most specific: the cached recipe, the style props, `style`. */}
      <Root ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </Root>
    </SliderProvider>
  )
})

SliderRoot.displayName = 'XAUI.Tram.Slider.Root'
