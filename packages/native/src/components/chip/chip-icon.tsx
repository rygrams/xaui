import { Icon } from '../../system/icon'
import { useChip } from './chip.context'
import type { ChipIconProps } from './chip.type'

/**
 * An icon that takes the chip's size and colour without being told either:
 *
 * ```tsx
 * <Chip variant="warning-soft">
 *   <Chip.Icon as={AlertIcon} />
 *   <Chip.Label>Expire demain</Chip.Label>
 * </Chip>
 * ```
 *
 * The values come from the root, which resolved them once; an explicit `size` or `color`
 * still wins, which is what `Icon` promises everywhere else in the library.
 *
 * It is not in the plan's slot list for this component, and it is here for the reason
 * `Icon` exists at all: a glyph in a chip is a third-party component, so without this
 * slot every call site computes the chip's foreground by hand — which is exactly the
 * `customAppearance` habit the v1 API removed.
 */
export function ChipIcon({ size, color, ...rest }: ChipIconProps) {
  const { icon } = useChip()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

ChipIcon.displayName = 'XAUI.Chip.Icon'
