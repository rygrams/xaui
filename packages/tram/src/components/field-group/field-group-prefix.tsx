import { forwardRef } from 'react'
import type { View } from 'react-native'
import { FieldGroupDecorator } from './field-group-decorator'
import type { FieldGroupPrefixProps } from './field-group.type'

/**
 * What stands before the text — a search glyph, a currency, a country.
 *
 * ```tsx
 * <FieldGroup>
 *   <FieldGroup.Prefix isDecorative>
 *     <FieldGroup.Icon as={SearchIcon} />
 *   </FieldGroup.Prefix>
 *   <FieldGroup.Field placeholder="rechercher" />
 * </FieldGroup>
 * ```
 *
 * At the **leading** end of the box. Add `isDecorative` whenever it holds nothing to press:
 * the mark then leans on the text. Leave it off for a control, which is ruled off as a key.
 */
export const FieldGroupPrefix = forwardRef<View, FieldGroupPrefixProps>(
  function FieldGroupPrefix(props, ref) {
    return <FieldGroupDecorator ref={ref} side="prefix" {...props} />
  }
)

FieldGroupPrefix.displayName = 'XAUI.Tram.FieldGroup.Prefix'
