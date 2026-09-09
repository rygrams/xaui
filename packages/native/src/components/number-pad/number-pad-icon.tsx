import { Icon } from '../../system/icon'
import { useNumberPad, useNumberPadCell } from './number-pad.context'
import type { NumberPadIconProps } from './number-pad.type'

/**
 * A glyph on a cell, taking the pad's size and the cell's colour without being told either
 * — the fingerprint in the free corner, or a drawn backspace in place of the character one.
 *
 * The colour follows the cell it is in for the reason the label's does: a filled key reads
 * the variant's foreground and a bare corner the page's. An explicit `color` still wins,
 * which is what makes the accent-coloured biometric key one prop.
 */
export function NumberPadIcon({ size, color, ...rest }: NumberPadIconProps) {
  const { icon, ghostIcon } = useNumberPad()
  const { tone } = useNumberPadCell()
  const resolved = tone === 'key' ? icon : ghostIcon

  return (
    <Icon size={size ?? resolved.size} color={color ?? resolved.color} {...rest} />
  )
}

NumberPadIcon.displayName = 'XAUI.NumberPad.Icon'
