import { forwardRef, useCallback, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { CheckboxIndicator } from './checkbox-indicator'
import { CheckboxLabel } from './checkbox-label'
import { CheckboxProvider } from './checkbox.context'
import { checkboxRecipe } from './checkbox.recipe'
import type { CheckboxProps } from './checkbox.type'

/**
 * A box that is either ticked or not, with the label that says what it means.
 *
 * ```tsx
 * <Checkbox isSelected={accepted} onSelectedChange={setAccepted}>
 *   J'accepte les conditions
 * </Checkbox>
 *
 * <Checkbox defaultSelected isInvalid={!accepted} size="lg">
 *   <Checkbox.Indicator />
 *   <Checkbox.Label>Recevoir la lettre d'information</Checkbox.Label>
 * </Checkbox>
 * ```
 *
 * **The root is the row, not the box.** It is the pressable, so the label toggles the
 * checkbox as surely as the box does — which is the whole reason the label is a slot here
 * rather than a `Text` the caller puts beside it and wires up by hand.
 *
 * R3 — a stringifiable tree becomes the label **and the root supplies the box**, because
 * a checkbox without one is not a checkbox; written with no children at all, it is the box
 * alone. Anything else is yours to arrange.
 *
 * Controlled by `isSelected`, uncontrolled by `defaultSelected`, and `onSelectedChange`
 * fires either way.
 */
export const CheckboxRoot = forwardRef<View, CheckboxProps>(function Checkbox(
  {
    children,
    variant,
    size,
    radius,
    color,
    isSelected,
    defaultSelected = false,
    onSelectedChange,
    isIndeterminate = false,
    isInvalid = false,
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
  // wrote. The vocabulary above is destructured first, which is what keeps `size` the
  // box's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const [selected, setSelected] = useControllableState({
    value: isSelected,
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // A press on the third state resolves it to selected rather than toggling into it,
      // which is what a browser's own indeterminate checkbox does — "some of these" is a
      // state a control reports, never one a person picks.
      setSelected(current => (isIndeterminate ? true : !current))
      // Composed, never replaced: `onPress` is `Pressable`'s and a caller who wrote one
      // wants it, and the tick, not one instead of the other.
      onPress?.(event)
    },
    [setSelected, isIndeterminate, onPress]
  )

  const selection = {
    variant,
    size,
    radius,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }
  const states = { pressed: isPressed, disabled: isDisabled }

  const styles = checkboxRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  //
  // Suppressed while invalid, the way focus is on the `Input`: the tint pass re-runs
  // `paint`, so a tinted invalid box would take the brand colour back over the danger
  // one — and a checkbox that is wrong has to read as wrong rather than as branded.
  const tint =
    color && !isInvalid
      ? checkboxRecipe.tint({ theme, color, selection, states })
      : undefined

  const context = useMemo(
    () => ({
      // The tint never reaches the box **at rest**, only the two nodes that say the box
      // is ticked. `paint` writes the resting fill from `bg` and the tint pass re-runs
      // `paint`, so applying `tint.indicator` here would paint an unticked box in the
      // caller's brand colour — which reads as ticked, which is the one thing it is not.
      indicatorStyle: styles.indicator,
      fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
      checkStyle: tint ? [styles.check, tint.check] : styles.check,
      dashStyle: tint ? [styles.dash, tint.dash] : styles.dash,
      labelStyle: styles.label,
      isSelected: selected,
      isIndeterminate,
      isDisabled,
      isInvalid,
    }),
    [styles, tint, selected, isIndeterminate, isDisabled, isInvalid]
  )

  // The resolution order of §2 ter, most general to most specific: the cached recipe, the
  // uncached tint, the style props, then `style` — the last word.
  //
  // R9 — `style` may be `Pressable`'s function form. The root owns the press state, so it
  // resolves the function here instead of forwarding it and losing the styles inside.
  const rootStyle = [
    styles.root,
    tint?.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  // R3 — and the box comes with it. `<Checkbox>J'accepte</Checkbox>` is the whole
  // component most of the time, and writing `<Checkbox.Indicator />` in front of every
  // label would be ceremony rather than composition.
  const text = childrenToString(children)
  const content =
    text !== null ? (
      <>
        <CheckboxIndicator />
        <CheckboxLabel>{text}</CheckboxLabel>
      </>
    ) : (
      (children ?? <CheckboxIndicator />)
    )

  return (
    <CheckboxProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        animation={animation}
        accessibilityRole={accessibilityRole ?? 'checkbox'}
        // Merged, not spread over: a caller naming another state must not silently drop
        // the two a screen reader reads this control by. Their keys still win.
        accessibilityState={{
          // `'mixed'` is the platform's own word for the third state, and it is the only
          // thing that tells a screen reader this box speaks for rows it cannot see.
          checked: isIndeterminate ? 'mixed' : selected,
          disabled: isDisabled,
          ...accessibilityState,
        }}
        aria-invalid={isInvalid}
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
    </CheckboxProvider>
  )
})

CheckboxRoot.displayName = 'XAUI.Checkbox.Root'
