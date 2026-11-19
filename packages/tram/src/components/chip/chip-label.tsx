import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChip } from './chip.context'
import type { ChipLabelProps } from './chip.type'

/** The words, on the Tram role the size chose. One line: a chip does not wrap. */
export const ChipLabel = forwardRef<Text, ChipLabelProps>(function ChipLabel(
  { children, style, numberOfLines = 1, ...props },
  ref
) {
  const { labelStyle } = useChip()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      {...rest}
      style={[labelStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

ChipLabel.displayName = 'XAUI.Tram.Chip.Label'
