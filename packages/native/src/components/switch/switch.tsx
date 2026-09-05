import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { GestureResponderEvent, View, ViewStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { SwitchLabel } from './switch-label'
import { SwitchThumb } from './switch-thumb'
import { SwitchTrack } from './switch-track'
import { SwitchProvider } from './switch.context'
import { switchRecipe } from './switch.recipe'
import type { SwitchProps } from './switch.type'

/**
 * A setting that is on or off, and takes effect the moment it is flipped.
 *
 * ```tsx
 * <Switch isSelected={isOn} onSelectedChange={setIsOn}>
 *   Mode sombre
 * </Switch>
 *
 * <Switch variant="secondary" size="lg" defaultSelected>
 *   <Switch.Track>
 *     <Switch.Thumb />
 *   </Switch.Track>
 *   <Switch.Label>Synchroniser en Wi-Fi seulement</Switch.Label>
 * </Switch>
 * ```
 *
 * **The root is the row, not the track** — the `Checkbox`'s shape, for its reason: tapping
 * the label flips the switch, and the label is a slot rather than a `Text` you wire up
 * beside the component.
 *
 * **A switch is not a checkbox.** It applies its change immediately, where a checkbox
 * states an intention a form submits later — which is why there is no `isInvalid` here: a
 * setting that has already taken effect has no later moment at which it can be wrong.
 *
 * The two variants are a **shape**: `primary` rides the thumb inside the track,
 * `secondary` stands it over a thinner bar. Both are the accent when they are on.
 */
export const SwitchRoot = forwardRef<View, SwitchProps>(function Switch(
  {
    children,
    variant,
    size,
    radius,
    color,
    isSelected,
    defaultSelected = false,
    onSelectedChange,
    isDisabled = false,
    asChild = false,
    accessibilityRole,
    accessibilityState,
    animation,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // R14 — what is left is `Pressable`'s own props plus whatever style keys the caller
  // wrote. The vocabulary above is destructured first, which keeps `size` the control's
  // scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const [selected, setSelected] = useControllableState({
    value: isSelected,
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      setSelected(current => !current)
      // Composed, never replaced: a caller's `onPress` runs, and the flip still happens.
      onPress?.(event)
    },
    [setSelected, onPress]
  )

  const selection = { variant, size, radius }
  const states = { pressed: isPressed, disabled: isDisabled }

  const styles = switchRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? switchRecipe.tint({ theme, color, selection, states })
    : undefined

  const context = useMemo(() => {
    const track = StyleSheet.flatten<ViewStyle>(styles.track)
    const thumb = StyleSheet.flatten<ViewStyle>(styles.thumb)

    return {
      trackStyle: styles.track,
      thumbStyle: styles.thumb,
      labelStyle: styles.label,
      // Values, not styles: the two ends of a colour that is crossed on the UI thread.
      // The tint moves the "on" end alone — the track at rest keeps its neutral, because
      // a switch that is off is off in every brand.
      track: {
        off: colorOf(track),
        on: colorOf(
          StyleSheet.flatten<ViewStyle>([styles.trackSelected, tint?.trackSelected])
        ),
      },
      thumb: {
        off: colorOf(thumb),
        on: colorOf(
          StyleSheet.flatten<ViewStyle>([styles.thumbSelected, tint?.thumbSelected])
        ),
      },
      // The distance the knob slides, and the one number the recipe cannot write: it is
      // the track's width less the thumb and the padding at both ends, and it has to be a
      // number rather than a style because the slide happens in a worklet.
      travel: travelOf(track, thumb),
      isSelected: selected,
      isDisabled,
    }
  }, [styles, tint, selected, isDisabled])

  // The resolution order of §2 ter: the cached recipe, the style props, then `style` — the
  // last word. The tint is absent here on purpose: it belongs to the two "on" colours
  // above, and nothing on the row itself changes when the switch is flipped.
  //
  // R9 — `style` may be `Pressable`'s function form, and the root owns the press state.
  const rootStyle = [
    styles.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  // R3 — and the track comes with it, the way the `Checkbox`'s box does: a switch with no
  // track is a line of text.
  const text = childrenToString(children)
  const content =
    text !== null ? (
      <>
        <SwitchTrack>
          <SwitchThumb />
        </SwitchTrack>
        <SwitchLabel>{text}</SwitchLabel>
      </>
    ) : (
      (children ?? (
        <SwitchTrack>
          <SwitchThumb />
        </SwitchTrack>
      ))
    )

  return (
    <SwitchProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        animation={animation}
        accessibilityRole={accessibilityRole ?? 'switch'}
        // Merged, not spread over: a caller naming another state must not silently drop
        // the two a screen reader reads this control by. Their keys still win.
        accessibilityState={{
          checked: selected,
          disabled: isDisabled,
          ...accessibilityState,
        }}
        {...rest}
        style={rootStyle}
        // After `rest`, and composed rather than replacing.
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {/* R12 — under `asChild` the caller's element *is* the row, so it takes the
            children it was written with and the auto-wrap does not apply. */}
        {asChild ? children : content}
      </PressableFeedback>
    </SwitchProvider>
  )
})

SwitchRoot.displayName = 'XAUI.Switch.Root'

/**
 * `ColorValue` also covers the platform's opaque colours, which `interpolateColor` cannot
 * cross. An empty string is what a worklet reads as "no colour" rather than crashing on
 * `undefined` — and it only happens if a theme leaves a role unpainted.
 */
function colorOf(style: ViewStyle): string {
  return typeof style.backgroundColor === 'string' ? style.backgroundColor : ''
}

/**
 * The knob's journey: the track's width, less the knob, less the inset it rests at — at
 * both ends, which is why that inset counts twice.
 *
 * `DimensionValue` also covers percentages and `auto`, neither of which can be subtracted
 * from a width. The recipe only ever writes points here.
 */
function travelOf(track: ViewStyle, thumb: ViewStyle): number {
  const width = pointsOf(track.width)
  const knob = pointsOf(thumb.width)
  const inset = pointsOf(thumb.start)

  return Math.max(width - knob - inset * 2, 0)
}

function pointsOf(value: ViewStyle['width'] | ViewStyle['start']): number {
  return typeof value === 'number' ? value : 0
}
