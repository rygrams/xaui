import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useReducedMotion, useSharedValue } from 'react-native-reanimated'
import { useControllableState, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { scale } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTramHaptic } from '../../theme/tram-haptics'
import { touchReach } from '../../system/touch-reach'
import { tramAccents } from '../../theme/tram-tokens'
import { SwitchLabel } from './switch-label'
import { SwitchThumb } from './switch-thumb'
import { SwitchTrack } from './switch-track'
import { SwitchProvider } from './switch.context'
import { DEFAULT_SIZE, SWITCH_GEOMETRY, switchRecipe } from './switch.recipe'
import type { SwitchProps } from './switch.type'

/**
 * A setting that is on or off — the Native `Switch`'s API, drawn in Metro: a rectangular
 * track with a line around it, filled with the accent up to the middle of a block thumb
 * that stands above and below it.
 *
 * ```tsx
 * <Switch isSelected={isOn} onSelectedChange={setIsOn}>
 *   mode sombre
 * </Switch>
 *
 * <Switch size="lg" accent="lime" defaultSelected>
 *   <Switch.Label>wi-fi</Switch.Label>
 *   <Switch.Track>
 *     <Switch.Thumb />
 *   </Switch.Track>
 * </Switch>
 * ```
 *
 * The root is the row, so a tap on the label flips it too. The thumb can also be dragged:
 * let go past the half, it turns on. A flip is felt through `TramProvider`'s `onHaptic`,
 * as a `selection`.
 *
 * A text child is the label, written **before** the track: the Metro row reads from its
 * start and ends on the switch.
 */
export const SwitchRoot = forwardRef<View, SwitchProps>(function Switch(
  {
    children,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    isSelected,
    defaultSelected = false,
    onSelectedChange,
    isDisabled = false,
    asChild = false,
    animation,
    accessibilityRole = 'switch',
    accessibilityState,
    hitSlop,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const animate = useTramMotion()

  const [selected, setSelected] = useControllableState({
    value: isSelected,
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  const [isDragging, setIsDragging] = useState(false)
  // Counts the drags let go. A controlled switch may refuse the change, and the thumb
  // then has to come back from where it was dropped although `selected` never moved.
  const [releases, setReleases] = useState(0)
  // Whether this touch became a drag: its release is then the drag's, not a tap.
  const wasDragged = useRef(false)

  const [isPressed, press] = usePressState({
    onPressIn: event => {
      wasDragged.current = false
      onPressIn?.(event)
    },
    onPressOut,
  })

  const change = useCallback(
    (next: boolean) => {
      if (next === selected) return
      haptic('selection')
      setSelected(next)
    },
    [selected, haptic, setSelected]
  )

  const handlePress = (event: GestureResponderEvent) => {
    if (wasDragged.current) return
    change(!selected)
    // Composed, never replaced: a caller's `onPress` runs, and the flip still happens.
    onPress?.(event)
  }

  const handleDragStart = useCallback(() => {
    wasDragged.current = true
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(
    (next: boolean) => {
      setIsDragging(false)
      setReleases(count => count + 1)
      change(next)
    },
    [change]
  )

  // Native's scale, highlight and ripple stay off: what moves under the finger is the
  // thumb. An ancestor's `disable-all` stops that and the slide, and is handed down.
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const isStill = motion.disableAll

  const progress = useSharedValue(selected ? 1 : 0)
  const squash = useSharedValue(1)

  // The thumb follows the state — after a flip, a controlled change, or a drag let go.
  // A spring to a target, so a second flip turns the first one around mid-way.
  useEffect(() => {
    const target = selected ? 1 : 0
    progress.value = isStill ? target : animate(target, 'thumb')
  }, [selected, releases, isStill, animate, progress])

  // The squash is motion for its own sake, so reduced motion drops it rather than fading it.
  const isReduced = useReducedMotion()
  const isHeld = (isPressed || isDragging) && motion.scale && !isReduced
  useEffect(() => {
    squash.value = animate(isHeld ? scale.thumb : 1)
  }, [isHeld, animate, squash])

  const selection = { size, radius }
  const states = { disabled: isDisabled }

  const styles = switchRecipe.resolve({ theme, selection, states })
  // The fill is flat, so a named accent is the true colour — there is no line or text in
  // the accent here to draw as ink. Uncached: a raw tint must stay out of the cache key.
  const paint = color ?? (accent ? tramAccents[accent] : undefined)
  const tint = paint
    ? switchRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const geometry = SWITCH_GEOMETRY[size]
  // `sm` and `md` are drawn under the 48 touch target; the slop makes it up.
  const reach = touchReach(geometry.thumbHeight)

  const context = useMemo(
    () => ({
      trackStyle: styles.track,
      fillStyle: [styles.fill, tint?.fill],
      thumbStyle: styles.thumb,
      blockStyle: styles.block,
      labelStyle: styles.label,
      geometry,
      progress,
      squash,
      // The track is shorter than the row by the thumb's overshoot, above and below.
      dragReach: reach + (geometry.thumbHeight - geometry.height) / 2,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      isSelected: selected,
      isDisabled,
    }),
    [
      styles,
      tint,
      geometry,
      progress,
      squash,
      reach,
      handleDragStart,
      handleDragEnd,
      selected,
      isDisabled,
    ]
  )

  // Most general to most specific: the cached recipe, the style props, `style`. The tint
  // is the fill's alone — nothing on the row changes colour.
  const rootStyle = [
    styles.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const track = (
    <SwitchTrack>
      <SwitchThumb />
    </SwitchTrack>
  )
  const text = childrenToString(children)

  return (
    <SwitchProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        // Merged, not spread over: a caller naming another state must not drop these two.
        accessibilityState={{
          checked: selected,
          disabled: isDisabled,
          ...accessibilityState,
        }}
        // The web reads the ARIA attribute and not the state object above.
        aria-checked={selected}
        hitSlop={hitSlop ?? reach}
        {...rest}
        style={rootStyle}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {/* Under `asChild` the caller's element is the row: one child, theirs. */}
        {asChild ? (
          children
        ) : text !== null ? (
          <>
            <SwitchLabel>{text}</SwitchLabel>
            {track}
          </>
        ) : (
          (children ?? track)
        )}
      </PressableFeedback>
    </SwitchProvider>
  )
})

SwitchRoot.displayName = 'XAUI.Tram.Switch.Root'
