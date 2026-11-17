import { forwardRef, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useControllableState, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { PressRow } from '../../system/press-row'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useOptionalRadioGroup } from './radio-group.context'
import { RadioIndicator } from './radio-indicator'
import { RadioLabel } from './radio-label'
import { RadioProvider } from './radio.context'
import { dotTint } from './radio.paint'
import { DEFAULT_SIZE, RADIO_GEOMETRY, radioRecipe } from './radio.recipe'
import type { RadioProps } from './radio.type'

/**
 * One option out of a set — the Native `Radio`'s API, drawn in Metro: a circle with a
 * line around it, and a dot of the accent inside once it is the chosen one.
 *
 * ```tsx
 * <Radio.Group value={plan} onValueChange={setPlan}>
 *   <Radio value="monthly">tous les mois</Radio>
 *   <Radio value="yearly" accent="lime">
 *     <Radio.Indicator />
 *     <Radio.Label>tous les ans</Radio.Label>
 *   </Radio>
 * </Radio.Group>
 *
 * <Radio isSelected={isMuted} onSelectedChange={() => setIsMuted(true)}>
 *   silencieux
 * </Radio>
 * ```
 *
 * A press selects, it never clears. An option joins a `Radio.Group` by naming a `value`;
 * without one it is a radio over its own `isSelected`, in a group or out of one. The
 * group hands down `size`, `accent` and `color`, and an option's own still win.
 *
 * The root is the row, so a tap on the label chooses the option too. A text child is the
 * label, and the root supplies the circle; with no children it is the circle alone. A
 * choice is felt through `TramProvider`'s `onHaptic`, as a `selection`.
 */
export const RadioRoot = forwardRef<View, RadioProps>(function Radio(
  {
    children,
    size,
    accent,
    color,
    value,
    isSelected,
    defaultSelected = false,
    onSelectedChange,
    isInvalid = false,
    isDisabled = false,
    asChild = false,
    animation,
    accessibilityRole = 'radio',
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
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  // `null` outside a set, which is a valid arrangement rather than a misplaced slot.
  const group = useOptionalRadioGroup()
  // Membership is naming what the option stands for, and nothing else.
  const inGroup = group !== null && value !== undefined

  const [selected, setSelected] = useControllableState({
    // The set is a controlled source like any other, and `isSelected` still outranks it.
    value: isSelected ?? (inGroup ? group.value === value : undefined),
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  const resolvedSize = size ?? group?.size ?? DEFAULT_SIZE
  const disabled = isDisabled || (group?.isDisabled ?? false)
  const invalid = isInvalid || (group?.isInvalid ?? false)

  const handlePress = (event: GestureResponderEvent) => {
    // Felt when the choice moves, not on a press of the option already chosen.
    if (!selected) haptic('selection')
    // `true`, never a toggle — and a set to the value already held fires nothing.
    setSelected(true)
    // Told to the set as well: it is what the other options read.
    if (inGroup) group.select(value)
    // Composed, never replaced: a caller's `onPress` runs, and the choice still happens.
    onPress?.(event)
  }

  const selection = {
    size: resolvedSize,
    isInvalid: invalid ? ('true' as const) : undefined,
  }
  const states = { disabled }

  const styles = radioRecipe.resolve({ theme, selection, states })
  // The dot is flat, so a named accent is the true colour. Uncached: a raw tint must stay
  // out of the cache key.
  const paint = dotTint({ accent, color }, group, invalid)
  const tint = paint
    ? radioRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  // Native's scale, highlight and ripple stay off: the press is the row shrinking. An
  // ancestor's `disable-all` stops that and the dot's spring, and is handed down.
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const Root = motion.scale ? PressRow : PressableFeedback

  const context = useMemo(
    () => ({
      indicatorStyle: styles.indicator,
      markStyle: [styles.mark, tint?.mark],
      labelStyle: styles.label,
      isSelected: selected,
      isDisabled: disabled,
      isInvalid: invalid,
      isStill: motion.disableAll,
    }),
    [styles, tint, selected, disabled, invalid, motion.disableAll]
  )

  // Most general to most specific: the cached recipe, the style props, `style`. The tint
  // is the dot's alone — nothing on the row changes colour.
  const rootStyle = [
    styles.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const text = childrenToString(children)

  return (
    <RadioProvider value={context}>
      <Root
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        asChild={asChild}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        // Merged, not spread over: a caller naming another state must not drop these two.
        accessibilityState={{ checked: selected, disabled, ...accessibilityState }}
        // The web reads the ARIA attributes and not the state object above.
        aria-checked={selected}
        aria-invalid={invalid}
        // Every size is drawn under the 48 touch target; the slop makes it up.
        hitSlop={hitSlop ?? touchReach(RADIO_GEOMETRY[resolvedSize].box)}
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
            <RadioIndicator />
            <RadioLabel>{text}</RadioLabel>
          </>
        ) : (
          (children ?? <RadioIndicator />)
        )}
      </Root>
    </RadioProvider>
  )
})

RadioRoot.displayName = 'XAUI.Tram.Radio.Root'
