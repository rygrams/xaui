import { Icon } from '@xaui/native/system'
import { useNumberPad, useNumberPadCell } from './number-pad.context'
import type { NumberPadIconProps } from './number-pad.type'

/** A glyph in a cell, in the cell's ink and at the pad's size. */
export function NumberPadIcon({ size, color, ...rest }: NumberPadIconProps) {
  const { icon, ghostIcon } = useNumberPad()
  const { tone } = useNumberPadCell()
  const resolved = tone === 'key' ? icon : ghostIcon

  return (
    <Icon size={size ?? resolved.size} color={color ?? resolved.color} {...rest} />
  )
}

NumberPadIcon.displayName = 'XAUI.Tram.NumberPad.Icon'
