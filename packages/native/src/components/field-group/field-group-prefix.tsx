import { forwardRef } from 'react'
import { View } from 'react-native'
import { FieldGroupDecorator } from './field-group-decorator'
import type { FieldGroupPrefixProps } from './field-group.type'

/**
 * What sits before the text — a search glyph, a currency, a country code.
 *
 * ```tsx
 * <FieldGroup>
 *   <FieldGroup.Prefix isDecorative>
 *     <FieldGroup.Icon as={SearchIcon} />
 *   </FieldGroup.Prefix>
 *   <FieldGroup.Field placeholder="Rechercher…" />
 * </FieldGroup>
 * ```
 *
 * It is pinned to the **leading** edge and inset by the field's own padding, so the glyph
 * starts where the text would have. The field then clears it by the width it measured —
 * which is what lets a `+33` prefix and a 16pt mark both sit right, without either one
 * being told a number.
 *
 * Add `isDecorative` whenever it holds nothing to press. Leave it off for a control.
 */
export const FieldGroupPrefix = forwardRef<View, FieldGroupPrefixProps>(
  function FieldGroupPrefix(props, ref) {
    return <FieldGroupDecorator ref={ref} side="prefix" {...props} />
  }
)

FieldGroupPrefix.displayName = 'XAUI.FieldGroup.Prefix'
