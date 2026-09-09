import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListBoxGroup } from './list-box-group.context'
import type { ListBoxGroupSectionProps } from './list-box-group.type'

/**
 * One section: a heading, the list it heads, and whatever the list needs saying after it.
 *
 * ```tsx
 * <ListBoxGroup.Section>
 *   <ListBoxGroup.Header>Réseau</ListBoxGroup.Header>
 *   <ListBox>…</ListBox>
 *   <ListBoxGroup.Footer>Le Wi-Fi se coupe en veille.</ListBoxGroup.Footer>
 * </ListBoxGroup.Section>
 * ```
 *
 * It exists because **proximity is the only thing grouping a header with its list** —
 * nothing draws a box around a section — and a single gap on the group would put a heading
 * exactly as far from its own rows as from the section above it. R4: the two gaps belong to
 * the two roots that own them.
 */
export const ListBoxGroupSection = forwardRef<View, ListBoxGroupSectionProps>(
  function ListBoxGroupSection({ children, style, ...props }, ref) {
    const { sectionStyle } = useListBoxGroup()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[sectionStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListBoxGroupSection.displayName = 'XAUI.ListBoxGroup.Section'
