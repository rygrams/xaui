import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListRow } from './list.context'
import type { ListDescriptionProps } from './list.type'

/** The detail, in the page's grey on the `caption` role, two lines at most by default. */
export const ListDescription = forwardRef<Text, ListDescriptionProps>(
  function ListDescription({ children, numberOfLines = 2, style, ...props }, ref) {
    const { styles } = useListRow()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[styles.descriptionStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

ListDescription.displayName = 'XAUI.Tram.List.Description'
