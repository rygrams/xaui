import { forwardRef, useCallback, useEffect, useMemo } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { SelectItemLabel } from './select-item-label'
import { SelectItemProvider, useSelect } from './select.context'
import type { SelectItemProps } from './select.type'

/**
 * One row of the list.
 *
 * It registers its label with the root as it mounts, which is what lets `Select.Value`
 * name the chosen one without the caller writing the label twice. `label` is that string
 * when the row's children are not one — an avatar and two lines of text have no single
 * label to infer.
 *
 * `children` may be a function, and that is the escape hatch for a row that paints its
 * own selected state instead of showing the check.
 */
export const SelectItem = forwardRef<View, SelectItemProps>(function SelectItem(
  {
    value,
    label,
    children,
    isDisabled = false,
    asChild = false,
    accessibilityRole = 'menuitem',
    accessibilityState,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    itemStyle,
    itemPressedStyle,
    value: selected,
    select,
    registerLabel,
  } = useSelect()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const isSelected = selected === value
  const text = typeof children === 'function' ? null : childrenToString(children)
  // The label the trigger will show: what the caller named, else the row's own text.
  const registered = label ?? text ?? undefined

  useEffect(() => {
    if (registered !== undefined) registerLabel(value, registered)
  }, [registerLabel, value, registered])

  const handlePress = useCallback(
    (event: Parameters<NonNullable<SelectItemProps['onPress']>>[0]) => {
      onPress?.(event)
      select(value, registered)
    },
    [onPress, select, value, registered]
  )

  const context = useMemo(
    () => ({ isSelected, isPressed, isDisabled }),
    [isSelected, isPressed, isDisabled]
  )

  return (
    <SelectItemProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled: isDisabled,
          selected: isSelected,
          ...accessibilityState,
        }}
        {...rest}
        style={[
          itemStyle,
          isPressed && itemPressedStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {typeof children === 'function' ? (
          children(context)
        ) : (
          <>
            {/* R3 — a stringifiable tree becomes the row's label; anything else is
                composed slots, and the caller places the check where they want it. */}
            {text !== null ? <SelectItemLabel>{text}</SelectItemLabel> : children}
          </>
        )}
      </PressableFeedback>
    </SelectItemProvider>
  )
})

SelectItem.displayName = 'XAUI.Select.Item'
