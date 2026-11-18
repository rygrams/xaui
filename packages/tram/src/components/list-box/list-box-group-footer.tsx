import { forwardRef } from 'react'
import type { Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useListBoxGroup } from './list-box-group.context'
import { useArrival, useGroupEntrance } from './list-box.entrance'
import type { ListBoxGroupTextSlotProps } from './list-box-group.type'

/** What the list needs saying after it, in the caption role and the muted grey. */
export const ListBoxGroupFooter = forwardRef<Text, ListBoxGroupTextSlotProps>(
  function ListBoxGroupFooter({ children, style, ...props }, ref) {
    const { footerStyle } = useListBoxGroup()
    const [styleProps, rest] = useStyleProps(props)
    const { style: arriving } = useArrival(useGroupEntrance())

    return (
      <Animated.Text
        // The animated wrapper types its ref as itself; at runtime it is the host text.
        ref={ref as never}
        {...rest}
        style={[footerStyle, styleProps, style, arriving]}
      >
        {children}
      </Animated.Text>
    )
  }
)

ListBoxGroupFooter.displayName = 'XAUI.Tram.ListBoxGroup.Footer'
