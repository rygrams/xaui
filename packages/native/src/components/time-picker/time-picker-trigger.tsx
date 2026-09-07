import { forwardRef } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useTimePicker } from './time-picker.context'
import type { TimePickerTriggerProps } from './time-picker.type'

/**
 * The field: what a reader sees, and the only node of this component a caller can hold a ref
 * to — the root renders none.
 *
 * It **is** a `Select`'s trigger: the same resolved styles, the same four field levels, the
 * same focus and invalid treatment. It publishes the indicator's size and colour through
 * `IconContext`, so a glyph inside takes them without being told.
 *
 * Unlike the `DatePicker`'s, it measures nothing: the panel is a sheet and a sheet is not
 * anchored to anything.
 */
export const TimePickerTrigger = forwardRef<View, TimePickerTriggerProps>(
  function TimePickerTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
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
      triggerPressedStyle,
      glyph,
      isOpen,
      isDisabled,
      isInvalid,
      toggle,
    } = useTimePicker()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    return (
      <IconContext.Provider value={glyph}>
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          accessibilityState={{
            expanded: isOpen,
            disabled: isDisabled,
            ...accessibilityState,
          }}
          aria-invalid={isInvalid || undefined}
          isDisabled={isDisabled}
          {...rest}
          // R9 — the caller's `style` may be `Pressable`'s function form. This trigger owns
          // its own press state, so it resolves the function here rather than forwarding it.
          style={[
            isPressed ? triggerPressedStyle : triggerStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={event => {
            onPress?.(event)
            toggle()
          }}
          // After `rest`, and composed rather than replacing.
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children}
        </PressableFeedback>
      </IconContext.Provider>
    )
  }
)

TimePickerTrigger.displayName = 'XAUI.TimePicker.Trigger'
