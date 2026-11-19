import { Icon } from '@xaui/native/system'
import { useFieldGroup } from './field-group.context'
import type { FieldGroupIconProps } from './field-group.type'

/**
 * A glyph that takes the box's scale and the placeholder's grey without being told either:
 *
 * ```tsx
 * <FieldGroup.Prefix isDecorative>
 *   <FieldGroup.Icon as={MailIcon} />
 * </FieldGroup.Prefix>
 * ```
 *
 * The side is the `CloseButton`'s glyph at the box's size — 16, 20, 24 — so a mark in a
 * field and the cross of a sheet read as one set. The colour is the placeholder's: a mark
 * in a field is decoration for the text. An explicit `size` or `color` still wins.
 *
 * Read off the group rather than the `TextField` (Native's): the Tram `TextField` resolves
 * no glyph, and the box is where the size is drawn.
 */
export function FieldGroupIcon({ size, color, ...rest }: FieldGroupIconProps) {
  const { icon } = useFieldGroup()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

FieldGroupIcon.displayName = 'XAUI.Tram.FieldGroup.Icon'
