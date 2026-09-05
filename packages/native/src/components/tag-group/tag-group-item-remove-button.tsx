import { forwardRef } from 'react'
import type { View } from 'react-native'
import { CloseButton } from '../../system/close-button'
import { useTagGroup, useTagGroupItem } from './tag-group.context'
import type { TagGroupItemRemoveButtonProps } from './tag-group.type'

/**
 * Takes this tag off.
 *
 * **It renders nothing unless the group was given an `onRemove`.** Removing a tag is the
 * caller's list changing, and a cross that appeared to work while the list stayed put
 * would be worse than one that is plainly not there.
 *
 * It is written out rather than drawn by the item, because a tag you can turn on and a tag
 * you can take off are different controls and most groups are only one of the two.
 *
 * Six lines, because the shared `CloseButton` owns the behaviour — its own press state, the
 * grown touch target, the missing-label warning and the built-in cross — and the group only
 * hands it the styles its recipe resolved (R5).
 */
export const TagGroupItemRemoveButton = forwardRef<
  View,
  TagGroupItemRemoveButtonProps
>(function TagGroupItemRemoveButton({ isDisabled, onPress, ...props }, ref) {
  const { closeStyle, closeGlyphStyle, closeGlyphSelectedStyle, remove } =
    useTagGroup()
  const { id, isSelected, isDisabled: isItemDisabled } = useTagGroupItem()

  if (remove === undefined) return null

  return (
    <CloseButton
      ref={ref}
      name="TagGroup.ItemRemoveButton"
      baseStyle={closeStyle}
      // The cross follows the label, so a selected tag's cross is the selected colour
      // and never outweighs the word beside it.
      glyphStyle={isSelected ? closeGlyphSelectedStyle : closeGlyphStyle}
      // The tag's own `isDisabled` reaches the cross, because a disabled tag that can
      // still be removed is not disabled. An explicit value on the slot still wins.
      isDisabled={isDisabled ?? isItemDisabled}
      onPress={event => {
        onPress?.(event)
        remove(id)
      }}
      {...props}
    />
  )
})

TagGroupItemRemoveButton.displayName = 'XAUI.TagGroup.ItemRemoveButton'
