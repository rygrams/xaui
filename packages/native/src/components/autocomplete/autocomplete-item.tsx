import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { AutocompleteItemLabel } from './autocomplete-item-label'
import { AutocompleteItemProvider, useAutocomplete } from './autocomplete.context'
import type { AutocompleteItemProps } from './autocomplete.type'

/**
 * One result.
 *
 * A row rather than a menu entry: no description, no check. A select's list is a menu you
 * read, where an autocomplete's is a set of answers to what you typed — and a check beside
 * the one already chosen is of no use in a list you reached by searching for something else.
 */
export const AutocompleteItem = forwardRef<View, AutocompleteItemProps>(
  function AutocompleteItem(
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
      isDisabled: isRootDisabled,
      select,
    } = useAutocomplete()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const isSelected = selected === value
    const disabled = isRootDisabled || isDisabled

    const handlePress = useCallback(
      (event: Parameters<NonNullable<AutocompleteItemProps['onPress']>>[0]) => {
        onPress?.(event)
        select(value, label ?? childrenToString(children) ?? undefined)
      },
      [children, label, onPress, select, value]
    )

    const context = useMemo(
      () => ({ isSelected, isPressed, isDisabled: disabled }),
      [isSelected, isPressed, disabled]
    )

    const text = childrenToString(children)

    return (
      <AutocompleteItemProvider value={context}>
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={disabled}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          accessibilityState={{
            disabled,
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
          {/* R3 — a stringifiable row becomes its label, which is what makes the common
            case `<Autocomplete.Item value="ca">Californie</Autocomplete.Item>`. */}
          {text !== null ? (
            <AutocompleteItemLabel>{text}</AutocompleteItemLabel>
          ) : (
            children
          )}
        </PressableFeedback>
      </AutocompleteItemProvider>
    )
  }
)

AutocompleteItem.displayName = 'XAUI.Autocomplete.Item'
