import { View } from 'react-native'
import { Icon } from '@xaui/native/system'
import { useSelect, useSelectItem } from './select.context'
import type { SelectItemIndicatorProps } from './select.type'

/**
 * A mark beside the chosen item — for the caller who wants one. **Without `as` it draws
 * nothing**: in Metro the current choice is read by its colour, not by a check.
 *
 * Given a glyph, its box is always there, so the rows line up, and the glyph is drawn in
 * it for the chosen item only, in the current choice's ink.
 */
export function SelectItemIndicator({ as, size, color }: SelectItemIndicatorProps) {
  const { itemIndicatorStyle, currentInk, glyph } = useSelect()
  const { isSelected } = useSelectItem()

  if (!as) return null

  const drawn = size ?? glyph.size

  return (
    <View style={[itemIndicatorStyle, { width: drawn, height: drawn }]}>
      {isSelected ? <Icon as={as} size={drawn} color={color ?? currentInk} /> : null}
    </View>
  )
}

SelectItemIndicator.displayName = 'XAUI.Tram.Select.ItemIndicator'
