import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { RadioGroupProvider } from './radio-group.context'
import { radioGroupRecipe } from './radio-group.recipe'
import type { RadioGroupProps } from './radio-group.type'

/**
 * A set of options, and the one that is chosen.
 *
 * ```tsx
 * <Radio.Group value={plan} onValueChange={setPlan}>
 *   <Radio value="monthly">Tous les mois</Radio>
 *   <Radio value="yearly">Tous les ans — deux mois offerts</Radio>
 *   <Radio value="lifetime">À vie</Radio>
 * </Radio.Group>
 * ```
 *
 * **It is the context the `Radio` was missing**, not a second radio. An option still owns
 * its circle, its press and its recipe; what it could not know on its own is whether it is
 * the chosen one, and that is the whole of what this publishes.
 *
 * **Exclusivity comes from comparing one value, not from talking to siblings.** The group
 * holds the chosen `value`; each option compares the `value` it stands for. Nothing walks
 * the children, so an option nested in a card, a row or a `List.Item` is in the set exactly
 * as much as a direct child is — and an option with no `value` is simply not in it.
 *
 * `variant`, `size`, `radius` and `color` are **defaults handed down**, and an option that
 * names its own still wins: a set is usually uniform, and the exception is a design rather
 * than a mistake. `isDisabled` and `isInvalid` are the two that do not work that way — a
 * disabled set has no enabled option in it, and a set that is wrong is wrong on every row.
 */
export const RadioGroupRoot = forwardRef<View, RadioGroupProps>(function RadioGroup(
  {
    children,
    value: controlledValue,
    defaultValue,
    onValueChange,
    orientation,
    variant,
    size,
    radius,
    color,
    isDisabled = false,
    isInvalid = false,
    asChild = false,
    accessibilityRole,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const [value, setValue] = useControllableState<string | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  const styles = radioGroupRecipe.resolve({
    theme,
    selection: { size, orientation },
  })

  // `useControllableState` drops a set to the value it already holds, so choosing the
  // chosen option fires nothing — the `Radio`'s rule, one level up.
  const select = useCallback((next: string) => setValue(next), [setValue])

  const context = useMemo(
    () => ({ value, select, variant, size, radius, color, isDisabled, isInvalid }),
    [value, select, variant, size, radius, color, isDisabled, isInvalid]
  )

  const rootStyle = [styles.root, styleProps, style]

  return (
    <RadioGroupProvider value={context}>
      {asChild ? (
        <Slot
          ref={ref}
          accessibilityRole={accessibilityRole ?? 'radiogroup'}
          {...rest}
          style={rootStyle}
        >
          {children}
        </Slot>
      ) : (
        <View
          ref={ref}
          // Announced once, by the thing that holds the choice. Overridable (R9).
          accessibilityRole={accessibilityRole ?? 'radiogroup'}
          {...rest}
          style={rootStyle}
        >
          {children}
        </View>
      )}
    </RadioGroupProvider>
  )
})

RadioGroupRoot.displayName = 'XAUI.Radio.Group'
