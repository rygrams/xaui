import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext, useStyleProps } from '@xaui/native/system'
import { useListBoxRow } from './list-box.context'
import type { ListBoxItemPrefixProps } from './list-box.type'

/**
 * What leads the row: whatever the caller puts there — a glyph, a `Checkbox`, a picture.
 * `variant="square"` sets it on a full square of the accent, 32, 40 or 48 across, its
 * glyph in the ink that reads on that accent — black on lime, amber and yellow.
 */
export const ListBoxItemPrefix = forwardRef<View, ListBoxItemPrefixProps>(
  function ListBoxItemPrefix({ children, variant = 'bare', style, ...props }, ref) {
    const row = useListBoxRow()
    const [styleProps, rest] = useStyleProps(props)
    const isSquare = variant === 'square'

    return (
      <IconContext.Provider value={isSquare ? row.squareGlyph : row.glyph}>
        <View
          ref={ref}
          {...rest}
          style={[row.prefixStyle, isSquare && row.squareStyle, styleProps, style]}
        >
          {children}
        </View>
      </IconContext.Provider>
    )
  }
)

ListBoxItemPrefix.displayName = 'XAUI.Tram.ListBox.ItemPrefix'
