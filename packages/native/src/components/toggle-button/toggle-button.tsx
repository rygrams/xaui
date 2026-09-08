import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { GestureResponderEvent, TextStyle, View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { warnDev } from '../../utils/warn-dev'
import { ToggleButtonLabel } from './toggle-button-label'
import { ToggleButtonProvider } from './toggle-button.context'
import { toggleButtonRecipe } from './toggle-button.recipe'
import type { ToggleButtonProps } from './toggle-button.type'

/**
 * A button that keeps whether it is active.
 *
 * ```tsx
 * <ToggleButton defaultSelected>Like</ToggleButton>
 *
 * <ToggleButton>
 *   {({ isSelected }) => (
 *     <>
 *       <ToggleButton.Icon as={isSelected ? HeartFilled : HeartOutline} />
 *       <ToggleButton.Label>Like</ToggleButton.Label>
 *     </>
 *   )}
 * </ToggleButton>
 * ```
 */
export const ToggleButtonRoot = forwardRef<View, ToggleButtonProps>(
  function ToggleButton(
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
      isIconOnly = false,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
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
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })
    const [selected, setSelected] = useControllableState({
      value: isSelected,
      defaultValue: defaultSelected,
      onChange: onSelectedChange,
    })

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        setSelected(current => !current)
        onPress?.(event)
      },
      [onPress, setSelected]
    )

    const selection = {
      variant,
      size,
      radius,
      isIconOnly: isIconOnly ? ('true' as const) : undefined,
    }
    const states = { disabled: isDisabled }
    const styles = toggleButtonRecipe.resolve({ theme, selection, states })
    const tint = color
      ? toggleButtonRecipe.tint({ theme, color, selection, states })
      : undefined

    const renderState = useMemo(
      () => ({ isSelected: selected, isPressed, isDisabled }),
      [selected, isPressed, isDisabled]
    )

    const context = useMemo(() => {
      const labelStyle = [
        styles.label,
        selected && styles.labelSelected,
        tint?.label,
        selected && tint?.labelSelected,
      ]
      const iconStyle = StyleSheet.flatten<TextStyle>([
        styles.icon,
        selected && styles.iconSelected,
        tint?.icon,
        selected && tint?.iconSelected,
      ])

      return {
        ...renderState,
        labelStyle,
        icon: {
          size: iconStyle.fontSize,
          color: typeof iconStyle.color === 'string' ? iconStyle.color : undefined,
        },
      }
    }, [styles, tint, selected, renderState])

    const rootStyle = [
      styles.root,
      selected && styles.rootSelected,
      !selected && isPressed && styles.rootPressed,
      tint?.root,
      selected && tint?.rootSelected,
      !selected && isPressed && tint?.rootPressed,
      styleProps,
      typeof style === 'function' ? style({ pressed: isPressed }) : style,
    ]

    const renderedChildren =
      typeof children === 'function' ? children(renderState) : children
    const text = childrenToString(renderedChildren)

    if (isIconOnly && !rest.accessibilityLabel && !rest['aria-label']) {
      warnDev(
        'ToggleButton: an icon-only toggle needs an `accessibilityLabel` — there is no ' +
          'text for a screen reader to read.'
      )
    }

    return (
      <ToggleButtonProvider value={context}>
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          accessibilityState={{
            ...accessibilityState,
            disabled: isDisabled,
            selected,
          }}
          {...rest}
          aria-pressed={selected}
          style={rootStyle}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {asChild ? (
            renderedChildren
          ) : text !== null ? (
            <ToggleButtonLabel>{text}</ToggleButtonLabel>
          ) : (
            renderedChildren
          )}
        </PressableFeedback>
      </ToggleButtonProvider>
    )
  }
)

ToggleButtonRoot.displayName = 'XAUI.ToggleButton.Root'
