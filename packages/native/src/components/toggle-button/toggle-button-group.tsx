import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { ToggleButtonGroupProvider } from './toggle-button-group.context'
import { toggleButtonGroupRecipe } from './toggle-button-group.recipe'
import type { ToggleButtonGroupProps } from './toggle-button-group.type'

/** An exclusive set of ToggleButtons. A member joins it by naming a `value`. */
export const ToggleButtonGroup = forwardRef<View, ToggleButtonGroupProps>(
  function ToggleButtonGroup(
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
    const styles = toggleButtonGroupRecipe.resolve({
      theme,
      selection: { orientation },
    })
    const select = useCallback((next: string) => setValue(next), [setValue])
    const context = useMemo(
      () => ({ value, select, variant, size, radius, color, isDisabled }),
      [value, select, variant, size, radius, color, isDisabled]
    )
    const rootStyle = [styles.root, styleProps, style]

    return (
      <ToggleButtonGroupProvider value={context}>
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
            accessibilityRole={accessibilityRole ?? 'radiogroup'}
            {...rest}
            style={rootStyle}
          >
            {children}
          </View>
        )}
      </ToggleButtonGroupProvider>
    )
  }
)

ToggleButtonGroup.displayName = 'XAUI.ToggleButton.Group'
