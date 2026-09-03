import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useButton } from './button.context'
import type { ButtonLabelProps } from './button.type'

/**
 * The text of a button. Three lines, because the root already resolved everything (R5):
 * this reads the style it published and merges the caller's over it (R2).
 *
 * Single-line by default. A control has a fixed height (§1 bis), so a label longer than
 * the button truncates rather than wrapping and pushing the button out of shape —
 * `numberOfLines` is still a prop for the rare case that wants otherwise.
 *
 * It carries no margin of its own (R4): the gap between a button's icon and its label is
 * the root's, so JSX order is screen order and nothing has to be undone to reverse them.
 */
export const ButtonLabel = forwardRef<Text, ButtonLabelProps>(function ButtonLabel(
  { children, style, numberOfLines = 1, ...rest },
  ref
) {
  const { labelStyle } = useButton()

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      style={[labelStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

ButtonLabel.displayName = 'XAUI.Button.Label'
