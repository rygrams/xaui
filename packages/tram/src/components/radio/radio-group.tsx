import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { RadioGroupProvider } from './radio-group.context'
import { radioGroupRecipe } from './radio-group.recipe'
import type { RadioGroupProps } from './radio-group.type'

/**
 * A set of options, and the one that is chosen — the Native `Radio.Group`'s API.
 *
 * ```tsx
 * <Radio.Group value={plan} onValueChange={setPlan}>
 *   <Radio value="monthly">tous les mois</Radio>
 *   <Radio value="yearly">tous les ans</Radio>
 * </Radio.Group>
 * ```
 *
 * Exclusivity comes from comparing one value, not from talking to siblings: the group
 * holds the chosen `value`, each option compares the `value` it stands for, and nothing
 * walks the children — an option nested in a row is in the set as much as a direct child.
 *
 * `size`, `accent` and `color` are defaults handed down, and an option that names its own
 * wins. `isDisabled` and `isInvalid` are not: a disabled set has no enabled option in it,
 * and a set that is wrong is wrong on every row.
 */
export const RadioGroupRoot = forwardRef<View, RadioGroupProps>(function RadioGroup(
  {
    children,
    value: controlledValue,
    defaultValue,
    onValueChange,
    orientation,
    size,
    accent,
    color,
    isDisabled = false,
    isInvalid = false,
    asChild = false,
    accessibilityRole = 'radiogroup',
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
    // It is only ever set to an option's value, so the caller never hears `undefined`.
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  const styles = radioGroupRecipe.resolve({
    theme,
    selection: { size, orientation },
  })

  // `useControllableState` drops a set to the value it already holds, so choosing the
  // chosen option fires nothing.
  const select = useCallback((next: string) => setValue(next), [setValue])

  const context = useMemo(
    () => ({ value, select, size, accent, color, isDisabled, isInvalid }),
    [value, select, size, accent, color, isDisabled, isInvalid]
  )

  const Root = asChild ? Slot : View

  return (
    <RadioGroupProvider value={context}>
      <Root
        ref={ref}
        // Announced once, by the thing that holds the choice.
        accessibilityRole={accessibilityRole}
        aria-invalid={isInvalid}
        {...rest}
        style={[styles.root, styleProps, style]}
      >
        {children}
      </Root>
    </RadioGroupProvider>
  )
})

RadioGroupRoot.displayName = 'XAUI.Tram.Radio.Group'
