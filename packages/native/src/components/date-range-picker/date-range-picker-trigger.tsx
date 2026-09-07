import { forwardRef } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useDateRangePicker } from './date-range-picker.context'
import type { DateRangePickerTriggerProps } from './date-range-picker.type'

/**
 * The field: what a reader sees, and the only node of this component a caller can hold a ref
 * to — the root renders none.
 *
 * It **is** a `Select`'s trigger, so the four field levels, the focus and the invalid
 * treatment are the ones already written.
 */
export const DateRangePickerTrigger = forwardRef<View, DateRangePickerTriggerProps>(
  function DateRangePickerTrigger(
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
    } = useDateRangePicker()

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

DateRangePickerTrigger.displayName = 'XAUI.DateRangePicker.Trigger'
