import { forwardRef, useCallback, useEffect, useRef } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useDatePicker } from './date-picker.context'
import type { DatePickerTriggerProps } from './date-picker.type'

/**
 * The control: the field the user sees, and the only node of this component a caller can
 * hold a ref to — the root has none.
 *
 * It measures itself in window coordinates on **every open**, for the `Autocomplete`'s
 * reason: `onLayout` fires when the trigger is laid out and never after, so one inside a
 * `ScrollView` would open its panel against a rectangle that has walked off the screen.
 */
export const DatePickerTrigger = forwardRef<View, DatePickerTriggerProps>(
  function DatePickerTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onLayout,
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
      setAnchor,
    } = useDatePicker()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const node = useRef<View | null>(null)
    const refs = useMergedRef(node, ref)

    const measure = useCallback(() => {
      node.current?.measureInWindow((x, y, width, height) => {
        setAnchor({ x, y, width, height })
      })
    }, [setAnchor])

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        measure()
      },
      [measure, onLayout]
    )

    useEffect(() => {
      if (isOpen) measure()
    }, [isOpen, measure])

    const handlePress = useCallback(
      (event: Parameters<NonNullable<DatePickerTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        // Before the toggle, so the panel's first pass already has the right rectangle
        // rather than positioning once against the stale one and jumping.
        measure()
        toggle()
      },
      [measure, onPress, toggle]
    )

    return (
      <IconContext.Provider value={glyph}>
        <PressableFeedback
          ref={refs}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          // `button` rather than `combobox`: there is nothing to type into, and a month
          // grid is not a list of options a screen reader can walk from here.
          accessibilityRole={accessibilityRole}
          accessibilityState={{
            disabled: isDisabled,
            expanded: isOpen,
            ...accessibilityState,
          }}
          aria-invalid={isInvalid || undefined}
          {...rest}
          onLayout={handleLayout}
          style={[
            triggerStyle,
            isPressed && triggerPressedStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children}
        </PressableFeedback>
      </IconContext.Provider>
    )
  }
)

DatePickerTrigger.displayName = 'XAUI.DatePicker.Trigger'
