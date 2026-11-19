import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListRow } from './list.context'
import type { ListSubtitleProps } from './list.type'

/**
 * The second level, between the title and the description: the accent read as ink, on
 * the `body` role and one line — the category of a news item, the subject of a mail. Not
 * in Native, whose rows have two levels; Metro's had three. Its ink is kept apart from
 * the title's and the description's, so the three never read as one grey block.
 */
export const ListSubtitle = forwardRef<Text, ListSubtitleProps>(
  function ListSubtitle({ children, numberOfLines = 1, style, ...props }, ref) {
    const { styles } = useListRow()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[styles.subtitleStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

ListSubtitle.displayName = 'XAUI.Tram.List.Subtitle'
