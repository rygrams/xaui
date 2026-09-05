import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTagGroup, useTagGroupItem } from './tag-group.context'
import type { TagGroupItemLabelProps } from './tag-group.type'

/** The tag's text, and the one node that changes colour when it is turned on. */
export const TagGroupItemLabel = forwardRef<Text, TagGroupItemLabelProps>(
  function TagGroupItemLabel({ children, numberOfLines = 1, style, ...props }, ref) {
    const { itemLabelStyle, itemLabelSelectedStyle } = useTagGroup()
    const { isSelected } = useTagGroupItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[
          itemLabelStyle,
          isSelected && itemLabelSelectedStyle,
          styleProps,
          style,
        ]}
      >
        {children}
      </Text>
    )
  }
)

TagGroupItemLabel.displayName = 'XAUI.TagGroup.ItemLabel'
