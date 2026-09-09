import { Icon } from '../../system/icon'
import { useMorphButton } from './morph-button.context'
import type { MorphButtonIconProps } from './morph-button.type'

/**
 * A mark that takes the button's size and colour without being told either — in the pill
 * beside the label, or in the card above its title.
 *
 * One glyph size for both shapes, deliberately: the mark is the thing a reader tracks
 * across the morph, and a mark that also changed size would read as a second animation
 * rather than as the same object moving.
 */
export function MorphButtonIcon({ size, color, ...rest }: MorphButtonIconProps) {
  const { icon } = useMorphButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

MorphButtonIcon.displayName = 'XAUI.MorphButton.Icon'
