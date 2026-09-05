import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChip } from './chip.context'
import type { ChipLabelProps } from './chip.type'

/**
 * The text of a chip. Three lines, because the root already resolved everything (R5):
 * this reads the style it published and merges the caller's over it (R2).
 *
 * Single-line by default, like `Button.Label` and for the same reason: a chip has a fixed
 * height, so a label longer than the chip truncates rather than wrapping and deforming
 * the capsule. `numberOfLines` is still a prop for the rare case that wants otherwise.
 *
 * It carries no margin of its own (R4): what separates it from a dot or a cross is the
 * root's `gap`, so JSX order is screen order and nothing has to be undone to reverse them.
 */
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
      style={[labelStyle, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

ChipLabel.displayName = 'XAUI.Chip.Label'
