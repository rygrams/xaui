import { FieldGroupIcon } from '../field-group'
import { SearchIcon } from './search-icon'
import type { SearchFieldIconProps } from './search-field.type'

/**
 * The magnifier, at the field's own scale and in the placeholder's grey:
 *
 * ```tsx
 * <FieldGroup.Prefix isDecorative>
 *   <SearchField.Icon />
 * </FieldGroup.Prefix>
 * ```
 *
 * It **is** `FieldGroup.Icon` with a mark of its own, which is what makes the size and the
 * colour follow the `TextField`'s `size` and theme without being told either — and what
 * makes `as` work, for a project whose icon set already has a glass in the right weight.
 *
 * The built-in one is drawn with `react-native-svg`, an **optional** peer of this package.
 * A project that has installed no icon set still gets a search mark; one that would rather
 * not carry the peer passes `as` — the import is at the top of this module, so the peer is
 * needed either way, exactly as it is for the `Select`'s chevron.
 */
export function SearchFieldIcon({
  as = SearchIcon,
  size,
  color,
}: SearchFieldIconProps) {
  return <FieldGroupIcon as={as} size={size} color={color} />
}

SearchFieldIcon.displayName = 'XAUI.SearchField.Icon'
