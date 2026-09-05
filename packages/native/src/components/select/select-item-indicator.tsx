import { View } from 'react-native'
import { Icon } from '../../system/icon'
import { CheckIcon } from './check-icon'
import { useSelect, useSelectItem } from './select.context'
import type { SelectItemIndicatorProps } from './select.type'

/**
 * The mark on the chosen row.
 *
 * Its box is rendered whether or not the row is selected, and only the glyph inside it
 * comes and goes. A box that appeared with the check would shift the label of every row
 * the moment a selection changed.
 */
export function SelectItemIndicator({
  as = CheckIcon,
  color,
  ...props
}: SelectItemIndicatorProps) {
  const { itemIndicatorStyle, checkColor } = useSelect()
  const { isSelected } = useSelectItem()

  return (
    <View style={itemIndicatorStyle}>
      {isSelected ? <Icon as={as} color={color ?? checkColor} {...props} /> : null}
    </View>
  )
}

SelectItemIndicator.displayName = 'XAUI.Select.ItemIndicator'
