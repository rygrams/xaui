import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { IconContext, childrenToString, useStyleProps } from '@xaui/native/system'
import { useListBoxRow } from './list-box.context'
import type { ListBoxItemSuffixProps } from './list-box.type'

/**
 * What ends the row: a value, a glyph, a `Switch`. A text child is written in the muted
 * grey; a glyph takes that grey too. A control keeps its own drawing.
 */
export const ListBoxItemSuffix = forwardRef<View, ListBoxItemSuffixProps>(
  function ListBoxItemSuffix({ children, style, ...props }, ref) {
    const { suffixStyle, suffixTextStyle, suffixGlyph } = useListBoxRow()
    const [styleProps, rest] = useStyleProps(props)
    const text = childrenToString(children)

    return (
      <IconContext.Provider value={suffixGlyph}>
        <View ref={ref} {...rest} style={[suffixStyle, styleProps, style]}>
          {text !== null ? <Text style={suffixTextStyle}>{text}</Text> : children}
        </View>
      </IconContext.Provider>
    )
  }
)

ListBoxItemSuffix.displayName = 'XAUI.Tram.ListBox.ItemSuffix'
