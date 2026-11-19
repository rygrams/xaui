import { Pressable } from 'react-native'
import { touchReach } from '../../system/touch-reach'
import { SelectIndicator } from '../select/select-indicator'
import { useSelect } from '../select/select.context'
import type { ComboboxIndicatorProps } from './combobox.type'

/**
 * The chevron at the end of the row — the `Select`'s, turning as the list opens — and the
 * way into the whole list without typing. It is pressed as 48 whatever the field's size.
 */
export function ComboboxIndicator({
  as,
  accessibilityLabel,
}: ComboboxIndicatorProps) {
  const { isOpen, isDisabled, toggle, glyph, listId } = useSelect()
  // The glyph alone is drawn, 16 to 24 across: the slop makes it a key of 48.
  const reach = touchReach(glyph.size ?? 0)

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, expanded: isOpen }}
      aria-controls={listId}
      disabled={isDisabled}
      hitSlop={reach}
      onPress={toggle}
    >
      <SelectIndicator as={as} />
    </Pressable>
  )
}

ComboboxIndicator.displayName = 'XAUI.Tram.Combobox.Indicator'
