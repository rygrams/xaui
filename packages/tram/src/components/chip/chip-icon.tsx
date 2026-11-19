import { Icon } from '@xaui/native/system'
import { useChip } from './chip.context'
import type { ChipIconProps } from './chip.type'

/** A glyph as tall as the label, in its ink, unless told otherwise. */
export function ChipIcon({ size, color, ...rest }: ChipIconProps) {
  const { icon } = useChip()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

ChipIcon.displayName = 'XAUI.Tram.Chip.Icon'
