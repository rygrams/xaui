import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListGroup } from './list-group.context'
import type { ListGroupTextSlotProps } from './list-group.type'

/**
 * What the rows above it need saying — the sentence under a settings block that explains
 * what the switch actually does.
 *
 * Inset like the header, and quiet like it. It carries no role: a footnote is prose, and
 * announcing it as a heading would put it in the list a screen reader jumps between.
 */
export const ListGroupFooter = forwardRef<Text, ListGroupTextSlotProps>(
  function ListGroupFooter({ children, style, ...props }, ref) {
    const { footerStyle } = useListGroup()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[footerStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

ListGroupFooter.displayName = 'XAUI.ListGroup.Footer'
