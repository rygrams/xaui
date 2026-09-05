import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectLabelProps } from './select.type'

/**
 * A heading over a run of rows. It is not a row: it takes no press, and a screen reader
 * announces it as a header so the group it opens is announced with it.
 */
export const SelectLabel = forwardRef<Text, SelectLabelProps>(function SelectLabel(
  { children, accessibilityRole = 'header', style, ...props },
  ref
) {
  const { labelStyle } = useSelect()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[labelStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

SelectLabel.displayName = 'XAUI.Select.Label'
