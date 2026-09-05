import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTagGroup } from './tag-group.context'
import type { TagGroupListProps } from './tag-group.type'

/**
 * The wrapping row.
 *
 * Wrapping is the point. A tag group is a set of the same kind of thing, and a set that
 * scrolls sideways hides how many of it there are — which is the one fact a reader wants
 * from a row of tags.
 */
export const TagGroupList = forwardRef<View, TagGroupListProps>(
  function TagGroupList(
    { children, accessibilityRole = 'list', style, ...props },
    ref
  ) {
    const { listStyle } = useTagGroup()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[listStyle, styleProps, style]}
      >
        {children}
      </View>
    )
  }
)

TagGroupList.displayName = 'XAUI.TagGroup.List'
