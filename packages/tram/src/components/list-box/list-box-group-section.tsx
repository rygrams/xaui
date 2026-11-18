import { forwardRef, useId } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { ListBoxSectionProvider, useListBoxGroup } from './list-box-group.context'
import type { ListBoxGroupSectionProps } from './list-box-group.type'

/**
 * One section: a header, the list it heads, and what the list needs saying after it. A
 * `group` to a screen reader, named by its header.
 */
export const ListBoxGroupSection = forwardRef<View, ListBoxGroupSectionProps>(
  function ListBoxGroupSection({ children, style, ...props }, ref) {
    const { sectionStyle } = useListBoxGroup()
    const [styleProps, rest] = useStyleProps(props)
    const headerId = `${useId()}-header`

    return (
      <ListBoxSectionProvider value={headerId}>
        <View
          ref={ref}
          role="group"
          aria-labelledby={headerId}
          {...rest}
          style={[sectionStyle, styleProps, style]}
        >
          {children}
        </View>
      </ListBoxSectionProvider>
    )
  }
)

ListBoxGroupSection.displayName = 'XAUI.Tram.ListBoxGroup.Section'
