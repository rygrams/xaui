import { forwardRef } from 'react'
import type { Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useListBoxGroup, useListBoxSectionLabel } from './list-box-group.context'
import { useArrival, useGroupEntrance } from './list-box.entrance'
import type { ListBoxGroupTextSlotProps } from './list-box-group.type'

/**
 * What the rows under it have in common, in the caption role and the muted grey. A
 * `header` to a screen reader, and the name of its section. It arrives first in its
 * section's turn of the cascade.
 */
export const ListBoxGroupHeader = forwardRef<Text, ListBoxGroupTextSlotProps>(
  function ListBoxGroupHeader(
    { children, accessibilityRole = 'header', style, ...props },
    ref
  ) {
    const { headerStyle } = useListBoxGroup()
    const labelId = useListBoxSectionLabel()
    const [styleProps, rest] = useStyleProps(props)
    const { style: arriving } = useArrival(useGroupEntrance())

    return (
      <Animated.Text
        // The animated wrapper types its ref as itself; at runtime it is the host text.
        ref={ref as never}
        nativeID={labelId}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[headerStyle, styleProps, style, arriving]}
      >
        {children}
      </Animated.Text>
    )
  }
)

ListBoxGroupHeader.displayName = 'XAUI.Tram.ListBoxGroup.Header'
