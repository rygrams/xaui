import { forwardRef, useEffect } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { childrenToString, useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectLabelProps } from './select.type'

/**
 * What the field is for, in the page's ink — an invalid select leaves it alone. It
 * carries the id the trigger points at, a touch on it opens the list, and its text heads
 * the list once that takes the screen.
 */
export const SelectLabel = forwardRef<Text, SelectLabelProps>(function SelectLabel(
  { children, style, nativeID, onPress, ...props },
  ref
) {
  const { labelStyle, labelId, isDisabled, open, setTitle } = useSelect()
  const [styleProps, rest] = useStyleProps(props)

  const text = childrenToString(children) ?? undefined
  useEffect(() => {
    setTitle(text)

    return () => setTitle(undefined)
  }, [text, setTitle])

  const handlePress = (event: GestureResponderEvent) => {
    open()
    onPress?.(event)
  }

  return (
    <Text
      ref={ref}
      nativeID={nativeID ?? labelId}
      style={[labelStyle, styleProps, style]}
      // A press opens the list and changes no colour, as everywhere in Tram.
      suppressHighlighting
      {...rest}
      // A disabled select has nothing to open: the label is plain text again.
      onPress={isDisabled ? onPress : handlePress}
    >
      {children}
    </Text>
  )
})

SelectLabel.displayName = 'XAUI.Tram.Select.Label'
