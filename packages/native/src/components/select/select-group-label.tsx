import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectGroupLabelProps } from './select.type'

/**
 * A heading over a run of rows, **inside the panel**. It is not a row: it takes no press,
 * and a screen reader announces it as a header so the group it opens is announced with it.
 *
 * It is not `Select.Label` either. That one names the field on the form; this one names a
 * section of the list, and the two were one name until the field grew a label of its own.
 */
export const SelectGroupLabel = forwardRef<Text, SelectGroupLabelProps>(
  function SelectGroupLabel(
    { children, accessibilityRole = 'header', style, ...props },
    ref
  ) {
    const { groupLabelStyle } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[groupLabelStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

SelectGroupLabel.displayName = 'XAUI.Select.GroupLabel'
