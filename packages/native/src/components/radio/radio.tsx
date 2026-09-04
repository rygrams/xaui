import { forwardRef, useCallback, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { RadioIndicator } from './radio-indicator'
import { RadioLabel } from './radio-label'
import { RadioProvider } from './radio.context'
import { radioRecipe } from './radio.recipe'
import type { RadioProps } from './radio.type'

/**
 * One option out of a set, and the label that says which.
 *
 * ```tsx
 * <Radio isSelected={plan === 'monthly'} onSelectedChange={() => setPlan('monthly')}>
 *   Tous les mois
 * </Radio>
 *
 * <Radio isSelected={plan === 'yearly'} onSelectedChange={() => setPlan('yearly')}>
 *   <Radio.Indicator />
 *   <Radio.Label>Tous les ans — deux mois offerts</Radio.Label>
 * </Radio>
 * ```
 *
 * **It is the `Checkbox` in a circle, with one rule changed: a press selects, it never
 * clears.** A set of options has no "none of these" unless one of them says so, and a
 * radio that could be untapped back to empty would be a checkbox that happens to be round.
 *
 * **There is no group.** The set lives where its state does — `value === 'monthly'` above
 * is the whole of it — and `RadioGroup` is a P5 component with a context of its own, not a
 * prop this one is missing. Wrap the rows in a `View` with `accessibilityRole="radiogroup"`
 * until it lands.
 *
 * Everything else is the `Checkbox`'s: the root is the row, so the label chooses the
 * option; R3 wraps a text child into the label and supplies the circle; the three variants
 * and the four sizes are the same; and `color` is the colour the option takes once chosen.
 */
export const RadioRoot = forwardRef<View, RadioProps>(function Radio(
  {
    children,
    variant,
    size,
    radius,
    color,
    isSelected,
    defaultSelected = false,
    onSelectedChange,
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
  // circle's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const [selected, setSelected] = useControllableState({
    value: isSelected,
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // `true`, never a toggle — and `useControllableState` drops a set to the value it
      // already holds, so pressing the chosen option fires nothing at all.
      setSelected(true)
      // Composed, never replaced: a caller's `onPress` is what a group listens to when it
      // wants the press rather than the change.
      onPress?.(event)
    },
    [setSelected, onPress]
  )

  const selection = {
    variant,
    size,
    radius,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }
  const states = { pressed: isPressed, disabled: isDisabled }

  const styles = radioRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent. It is
  // suppressed while invalid — an error outranks a brand colour, as on the `Checkbox`.
  const tint =
    color && !isInvalid
      ? radioRecipe.tint({ theme, color, selection, states })
      : undefined

  const context = useMemo(
    () => ({
      indicatorStyle: tint ? [styles.indicator, tint.indicator] : styles.indicator,
      fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
      thumbStyle: tint ? [styles.thumb, tint.thumb] : styles.thumb,
      labelStyle: styles.label,
      isSelected: selected,
      isDisabled,
      isInvalid,
    }),
    [styles, tint, selected, isDisabled, isInvalid]
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

  // R3 — and the circle comes with it, for the `Checkbox`'s reason: an option with no
  // indicator is a line of text.
  const text = childrenToString(children)
  const content =
    text !== null ? (
      <>
        <RadioIndicator />
        <RadioLabel>{text}</RadioLabel>
      </>
    ) : (
      (children ?? <RadioIndicator />)
    )

  return (
    <RadioProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        animation={animation}
        accessibilityRole={accessibilityRole ?? 'radio'}
        // Merged, not spread over: a caller naming another state must not silently drop
        // the two a screen reader reads this control by. Their keys still win.
        accessibilityState={{
          checked: selected,
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
    </RadioProvider>
  )
})

RadioRoot.displayName = 'XAUI.Radio.Root'
