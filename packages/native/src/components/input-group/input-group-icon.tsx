import { Icon } from '../../system/icon'
import { useInput } from '../input'
import type { InputGroupIconProps } from './input-group.type'

/**
 * A glyph that takes the field's scale and the placeholder's colour without being told
 * either:
 *
 * ```tsx
 * <InputGroup.Prefix isDecorative>
 *   <InputGroup.Icon as={MailIcon} />
 * </InputGroup.Prefix>
 * ```
 *
 * The size comes from the `Input`'s own `size` — one step above the field's type, as on
 * the `Button` and the `Chip`, because a 16pt glyph beside 16pt of text reads as the
 * smaller of the two. The colour is the theme's `fieldPlaceholder`: a mark in a field is
 * decoration for the text, not text. An explicit `size` or `color` still wins, which is
 * what `Icon` promises everywhere else in the library — and it is the answer for a tinted
 * `primary` field, where the fill is the caller's colour and the placeholder grey is no
 * longer readable over it.
 *
 * It is not one of HeroUI's three parts: theirs colour the glyph at the call site. This is
 * the same slot `Button`, `Chip` and `Alert` all have, and it exists so that a form does
 * not carry a hard-coded `#888` on every field.
 */
export function InputGroupIcon({ size, color, ...rest }: InputGroupIconProps) {
  const { icon } = useInput()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

InputGroupIcon.displayName = 'XAUI.InputGroup.Icon'
