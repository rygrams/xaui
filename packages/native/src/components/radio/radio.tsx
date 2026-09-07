import { forwardRef, useCallback, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useOptionalRadioGroup } from './radio-group.context'
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
 * **A set is a `Radio.Group` around options that name a `value`:**
 *
 * ```tsx
 * <Radio.Group value={plan} onValueChange={setPlan}>
 *   <Radio value="monthly">Tous les mois</Radio>
 *   <Radio value="yearly">Tous les ans</Radio>
 * </Radio.Group>
 * ```
 *
 * The group holds the chosen value and hands down `variant`, `size`, `radius` and `color`;
 * an option that names its own still wins. Nothing walks the children, so an option nested
 * in a card or a row is in the set exactly as much as a direct child is — and an option
 * with no `value` is not in it at all, which is what keeps the standalone radio above
 * working unchanged inside one.
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
    value,
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

  // `null` outside a set, which is a valid arrangement rather than a misplaced slot — a
  // radio over its own `isSelected` is this component's original shape.
  const group = useOptionalRadioGroup()
  // An option joins the set by naming what it stands for. Membership is that and nothing
  // else: no child is inspected, so nesting one changes nothing.
  const inGroup = group !== null && value !== undefined

  const [selected, setSelected] = useControllableState({
    // The set is a controlled source like any other, and `isSelected` still outranks it:
    // one option in a group can be driven by something the group knows nothing about.
    value: isSelected ?? (inGroup ? group.value === value : undefined),
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  // The set's values are defaults, and the option's own win — a uniform set is the common
  // case, and the row that differs is a design rather than a mistake.
  const resolvedVariant = variant ?? group?.variant
  const resolvedSize = size ?? group?.size
  const resolvedRadius = radius ?? group?.radius
  const resolvedColor = color ?? group?.color
  // These two do not work that way: a disabled set has no enabled option in it, and a set
  // that is wrong is wrong on every row.
  const disabled = isDisabled || (group?.isDisabled ?? false)
  const invalid = isInvalid || (group?.isInvalid ?? false)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // `true`, never a toggle — and `useControllableState` drops a set to the value it
      // already holds, so pressing the chosen option fires nothing at all.
      setSelected(true)
      // Told to the set as well, because the set is what the other options read. Both
      // callbacks fire: this option's `onSelectedChange` and the group's `onValueChange`.
      if (inGroup) group.select(value)
      // Composed, never replaced: a caller's `onPress` is what a wrapper listens to when
      // it wants the press rather than the change.
      onPress?.(event)
    },
    [setSelected, inGroup, group, value, onPress]
  )

  const selection = {
    variant: resolvedVariant,
    size: resolvedSize,
    radius: resolvedRadius,
    isInvalid: invalid ? ('true' as const) : undefined,
  }
  const states = { pressed: isPressed, disabled }

  const styles = radioRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent. It is
  // suppressed while invalid — an error outranks a brand colour, as on the `Checkbox`.
  const tint =
    resolvedColor && !invalid
      ? radioRecipe.tint({ theme, color: resolvedColor, selection, states })
      : undefined

  const context = useMemo(
    () => ({
      // The tint never reaches the circle at rest — only the fill and the dot that say it
      // is the chosen one. The `Checkbox` says why, at the same line.
      indicatorStyle: styles.indicator,
      fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
      thumbStyle: tint ? [styles.thumb, tint.thumb] : styles.thumb,
      labelStyle: styles.label,
      isSelected: selected,
      isDisabled: disabled,
      isInvalid: invalid,
    }),
    [styles, tint, selected, disabled, invalid]
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
        isDisabled={disabled}
        asChild={asChild}
        animation={animation}
        accessibilityRole={accessibilityRole ?? 'radio'}
        // Merged, not spread over: a caller naming another state must not silently drop
        // the two a screen reader reads this control by. Their keys still win.
        accessibilityState={{
          checked: selected,
          disabled,
          ...accessibilityState,
        }}
        aria-invalid={invalid}
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
