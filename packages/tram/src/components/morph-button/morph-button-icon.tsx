import { Icon } from '@xaui/native/system'
import { useMorphButton } from './morph-button.context'
import type { MorphButtonIconProps } from './morph-button.type'

/**
 * A mark that takes the button's size and colour without being told either — beside the
 * label, or above the card's title. One size in both shapes: it is what the eye follows
 * across the morph. An explicit `size` or `color` still wins.
 */
export function MorphButtonIcon({ size, color, ...rest }: MorphButtonIconProps) {
  const { icon } = useMorphButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

MorphButtonIcon.displayName = 'XAUI.Tram.MorphButton.Icon'
