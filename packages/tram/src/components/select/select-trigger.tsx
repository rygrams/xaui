import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '@xaui/native'
import { IconContext, PressableFeedback, useStyleProps } from '@xaui/native/system'
import { SelectBox } from './select-box'
import { useSelect } from './select.context'
import type { SelectTriggerProps } from './select.type'

/**
 * The field: the value and the chevron in the `TextField`'s box, and the control a
 * screen reader stops on — a combobox that says whether its list is open.
 *
 * It draws the box as well as the row (`SelectBox`), because an unfolded list belongs
 * inside the same line. `ref`, `style` and every pressable prop are the row's. A press
 * changes no colour.
 */
export const SelectTrigger = forwardRef<View, SelectTriggerProps>(
  function SelectTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'combobox',
      accessibilityState,
      hitSlop,
      style,
      onPressIn,
      onPressOut,
      onPress,
      ...props
    },
    ref
  ) {
    const {
      triggerStyle,
      glyph,
      reach,
      isOpen,
      isDisabled,
      isInvalid,
      isStill,
      toggle,
      labelId,
      descriptionId,
      errorId,
      listId,
    } = useSelect()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: Parameters<NonNullable<SelectTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        toggle()
      },
      [onPress, toggle]
    )

    return (
      <SelectBox>
        <IconContext.Provider value={glyph}>
          <PressableFeedback
            ref={ref}
            isPressed={isPressed}
            isDisabled={isDisabled}
            asChild={asChild}
            // Native's scale, highlight and ripple stay off: a field does not move.
            animation={isStill ? 'disable-all' : false}
            accessibilityRole={accessibilityRole}
            // Merged, not spread over: a caller naming another state must not drop these.
            accessibilityState={{
              disabled: isDisabled,
              expanded: isOpen,
              ...accessibilityState,
            }}
            aria-expanded={isOpen}
            aria-controls={listId}
            aria-invalid={isInvalid || undefined}
            // The label names the field; the description and the error explain it.
            aria-labelledby={labelId}
            aria-describedby={`${descriptionId} ${errorId}`}
            // `sm` is drawn under the 48 touch target; the slop makes it up.
            hitSlop={hitSlop ?? reach}
            {...rest}
            style={[
              triggerStyle,
              styleProps,
              typeof style === 'function' ? style({ pressed: isPressed }) : style,
            ]}
            // After `rest`, and composed: the caller's handlers run inside these.
            onPress={handlePress}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
          >
            {children}
          </PressableFeedback>
        </IconContext.Provider>
      </SelectBox>
    )
  }
)

SelectTrigger.displayName = 'XAUI.Tram.Select.Trigger'
