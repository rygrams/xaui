import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListGroup } from './list-group.context'
import type { ListGroupSectionProps } from './list-group.type'

/**
 * One section: a heading, the list it heads, and whatever the list needs saying after it.
 *
 * ```tsx
 * <ListGroup.Section>
 *   <ListGroup.Header>Réseau</ListGroup.Header>
 *   <List>…</List>
 *   <ListGroup.Footer>Le Wi-Fi se coupe en veille.</ListGroup.Footer>
 * </ListGroup.Section>
 * ```
 *
 * It exists because **proximity is the only thing grouping a header with its list** —
 * nothing draws a box around a section — and a single gap on the group would put a heading
 * exactly as far from its own rows as from the section above it. R4: the two gaps belong to
 * the two roots that own them.
 */
export const ListGroupSection = forwardRef<View, ListGroupSectionProps>(
  function ListGroupSection({ children, style, ...props }, ref) {
    const { sectionStyle } = useListGroup()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[sectionStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListGroupSection.displayName = 'XAUI.ListGroup.Section'
