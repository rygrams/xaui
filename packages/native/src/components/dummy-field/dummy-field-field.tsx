import { forwardRef, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { IconContext } from '../../system/icon'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { decoratorPadding, useOptionalFieldGroup } from '../field-group'
import { useDummyField } from './dummy-field.context'
import { DummyFieldValue } from './dummy-field-value'
import type { DummyFieldFieldProps } from './dummy-field.type'

/**
 * The pressable box itself — styled identically to a `TextInput`, but non-editable and
 * interactive through `PressableFeedback`.
 *
 * It composes press events, renders touch feedback, and associates accessibility labels
 * from `DummyField.Label` and hints from `DummyField.Description`.
 *
 * Text children are auto-wrapped in a `DummyField.Value` (R3). Composed slots or custom
 * children can also be passed directly.
 */
export const DummyFieldField = forwardRef<View, DummyFieldFieldProps>(
  function DummyFieldField(
    {
      children,
      value,
      placeholder,
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
      fieldStyle,
      fieldPressedStyle,
      glyph,
      isDisabled,
      isInvalid,
      labelId,
      descriptionId,
      onPress: rootOnPress,
    } = useDummyField()

    const group = useOptionalFieldGroup()
    const padding = useMemo(
      () => decoratorPadding(group?.prefixWidth ?? 0, group?.suffixWidth ?? 0),
      [group?.prefixWidth, group?.suffixWidth]
    )

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        rootOnPress?.(event)
      },
      [onPress, rootOnPress]
    )

    const stringChild = childrenToString(children)

    let content: ReactNode
    if (asChild) {
      content = children
    } else if (children !== undefined && stringChild === null) {
      content = children
    } else if (stringChild !== null) {
      content = (
        <DummyFieldValue placeholder={placeholder}>{stringChild}</DummyFieldValue>
      )
    } else {
      content = <DummyFieldValue placeholder={placeholder}>{value}</DummyFieldValue>
    }

    return (
      <IconContext.Provider value={glyph}>
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          accessibilityState={{
            disabled: isDisabled,
            ...accessibilityState,
          }}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          aria-invalid={isInvalid || undefined}
          {...rest}
          style={[
            fieldStyle,
            isPressed && fieldPressedStyle,
            padding,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {content}
        </PressableFeedback>
      </IconContext.Provider>
    )
  }
)

DummyFieldField.displayName = 'XAUI.DummyField.Field'
