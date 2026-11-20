import { forwardRef, useCallback } from 'react'
import type { GestureResponderEvent, Text } from 'react-native'
import { TextFieldLabel, useTextField } from '../text-field'
import type { TextFieldLabelProps } from '../text-field'
import { useDummyField } from './dummy-field.context'

/**
 * The `TextField`'s label, which presses the field rather than focusing an input: a touch
 * on it opens what the field opens. A disabled field's label is plain text again.
 */
export const DummyFieldLabel = forwardRef<Text, TextFieldLabelProps>(
  function DummyFieldLabel({ onPress, ...props }, ref) {
    const { isDisabled } = useTextField()
    const { onPress: open } = useDummyField()

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        if (!isDisabled) open?.(event)
      },
      [onPress, open, isDisabled]
    )

    return <TextFieldLabel ref={ref} {...props} onPress={handlePress} />
  }
)

DummyFieldLabel.displayName = 'XAUI.Tram.DummyField.Label'
