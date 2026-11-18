import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectGroupLabelProps } from './select.type'

/** A heading over a run of choices, inside the list: `caption`, in the muted ink. */
export const SelectGroupLabel = forwardRef<Text, SelectGroupLabelProps>(
  function SelectGroupLabel({ children, style, ...props }, ref) {
    const { groupLabelStyle } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        {...rest}
        style={[groupLabelStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

SelectGroupLabel.displayName = 'XAUI.Tram.Select.GroupLabel'
