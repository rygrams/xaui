import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext, useStyleProps } from '@xaui/native/system'
import { useListRow } from './list.context'
import { wrapText } from './list.text'
import type { ListActionProps } from './list.type'

/**
 * What ends the row, level with its title: the time of a mail, a count, a control. A
 * string or a number is written in grey on the `caption` role; a glyph is drawn as that
 * text is. A control keeps its own role and its own press — in a row with no `onPress`.
 */
export const ListAction = forwardRef<View, ListActionProps>(function ListAction(
  { children, style, ...props },
  ref
) {
  const { styles } = useListRow()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <IconContext.Provider value={styles.actionGlyph}>
      <View ref={ref} {...rest} style={[styles.actionStyle, styleProps, style]}>
        {wrapText(children, styles.actionTextStyle)}
      </View>
    </IconContext.Provider>
  )
})

ListAction.displayName = 'XAUI.Tram.List.Action'
